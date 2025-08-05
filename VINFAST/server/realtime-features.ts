// Real-time Notifications & WebSocket Support
import type { Express } from "express";
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { investmentFunds, investments, users } from "../shared/schema";
import { eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require');
const db = drizzle(sql);

interface NotificationData {
  id: string;
  type: 'investment_created' | 'investment_withdrawn' | 'fund_update' | 'portfolio_milestone';
  userId: string;
  title: string;
  message: string;
  data?: any;
  timestamp: string;
  read: boolean;
}

class NotificationManager {
  private notifications: Map<string, NotificationData[]> = new Map();
  private io: SocketIOServer | null = null;

  setSocketIO(io: SocketIOServer) {
    this.io = io;
  }

  addNotification(userId: string, notification: Omit<NotificationData, 'id' | 'timestamp' | 'read'>) {
    const fullNotification: NotificationData = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false
    };

    const userNotifications = this.notifications.get(userId) || [];
    userNotifications.unshift(fullNotification);
    
    // Keep only last 50 notifications per user
    if (userNotifications.length > 50) {
      userNotifications.splice(50);
    }
    
    this.notifications.set(userId, userNotifications);

    // Send real-time notification via WebSocket
    if (this.io) {
      this.io.to(`user_${userId}`).emit('new_notification', fullNotification);
    }

    console.log(`📨 Notification sent to user ${userId}: ${notification.title}`);
    return fullNotification;
  }

  getUserNotifications(userId: string, limit: number = 20) {
    const userNotifications = this.notifications.get(userId) || [];
    return userNotifications.slice(0, limit);
  }

  markAsRead(userId: string, notificationId: string) {
    const userNotifications = this.notifications.get(userId) || [];
    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  getUnreadCount(userId: string): number {
    const userNotifications = this.notifications.get(userId) || [];
    return userNotifications.filter(n => !n.read).length;
  }
}

const notificationManager = new NotificationManager();

export function addRealtimeFeatures(app: Express, httpServer: any) {
  
  // Setup Socket.IO
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  notificationManager.setSocketIO(io);

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // User joins their personal room
    socket.on('join_user_room', (userId: string) => {
      socket.join(`user_${userId}`);
      console.log(`👤 User ${userId} joined their room`);
      
      // Send unread notification count
      const unreadCount = notificationManager.getUnreadCount(userId);
      socket.emit('unread_count', unreadCount);
    });

    // Send portfolio updates
    socket.on('request_portfolio_update', async (userId: string) => {
      try {
        // Get latest portfolio data
        const portfolioData = await db.select({
          investment: investments,
          fund: investmentFunds
        })
        .from(investments)
        .leftJoin(investmentFunds, eq(investments.fundId, investmentFunds.id))
        .where(eq(investments.userId, userId));

        let totalValue = 0;
        let totalGain = 0;

        portfolioData.forEach(item => {
          if (item.fund && item.investment.status === 'active') {
            const investAmount = parseFloat(item.investment.amount);
            const createdDate = new Date(item.investment.createdAt);
            const now = new Date();
            const daysElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
            const dailyReturn = parseFloat(item.fund.dailyReturn);
            const currentReturn = investAmount * dailyReturn * Math.min(daysElapsed, item.fund.duration);
            
            totalValue += investAmount + currentReturn;
            totalGain += currentReturn;
          }
        });

        socket.emit('portfolio_update', {
          totalValue: totalValue.toFixed(2),
          totalGain: totalGain.toFixed(2),
          gainPercent: totalValue > 0 ? ((totalGain / (totalValue - totalGain)) * 100).toFixed(2) : '0',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Portfolio update error:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  // API endpoints for notifications
  app.get("/api/notifications/:userId", (req, res) => {
    try {
      const { userId } = req.params;
      const { limit = '20' } = req.query;
      
      const notifications = notificationManager.getUserNotifications(userId, parseInt(limit as string));
      const unreadCount = notificationManager.getUnreadCount(userId);
      
      res.json({
        notifications,
        unreadCount,
        total: notifications.length
      });
    } catch (error: any) {
      console.error('Get notifications error:', error);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });

  app.put("/api/notifications/:userId/:notificationId/read", (req, res) => {
    try {
      const { userId, notificationId } = req.params;
      
      notificationManager.markAsRead(userId, notificationId);
      
      res.json({ success: true });
    } catch (error: any) {
      console.error('Mark notification read error:', error);
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  });

  // WebSocket endpoint info
  app.get("/api/websocket/info", (req, res) => {
    res.json({
      available: true,
      endpoint: "/socket.io/",
      events: [
        'join_user_room',
        'request_portfolio_update', 
        'new_notification',
        'portfolio_update',
        'unread_count'
      ]
    });
  });

  return { io, notificationManager };
}

// Investment event handlers
export function createInvestmentNotification(userId: string, investment: any, fund: any) {
  const amount = parseFloat(investment.amount).toLocaleString();
  notificationManager.addNotification(userId, {
    type: 'investment_created',
    userId,
    title: '🎉 Đầu tư thành công!',
    message: `Bạn đã đầu tư ${amount} VNĐ vào ${fund.name}`,
    data: { investmentId: investment.id, fundId: fund.id }
  });
}

export function createWithdrawNotification(userId: string, investment: any, fund: any) {
  const amount = parseFloat(investment.amount).toLocaleString();
  const actualReturn = parseFloat(investment.actualReturn || '0').toLocaleString();
  notificationManager.addNotification(userId, {
    type: 'investment_withdrawn',
    userId,
    title: '💰 Rút đầu tư thành công!',
    message: `Bạn đã rút ${amount} VNĐ từ ${fund.name} với lợi nhuận ${actualReturn} VNĐ`,
    data: { investmentId: investment.id, fundId: fund.id }
  });
}

export function createPortfolioMilestone(userId: string, milestone: string, value: number) {
  notificationManager.addNotification(userId, {
    type: 'portfolio_milestone',
    userId,
    title: '🎯 Milestone đạt được!',
    message: `Portfolio của bạn đã đạt ${milestone}: ${value.toLocaleString()} VNĐ`,
    data: { milestone, value }
  });
}

export { notificationManager };
