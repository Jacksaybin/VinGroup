import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { investmentFunds, investments, users } from "../shared/schema";
import { eq, and, desc, sql as sqlOperator } from 'drizzle-orm';
import { addAdvancedAnalytics } from './advanced-analytics';
import { addRealtimeFeatures, createInvestmentNotification, createWithdrawNotification } from './realtime-features';
import { cache, cacheMiddleware, cacheKeys } from './cache';
import { tempFundsData } from './temp-funds';

// Initialize database connection
const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require');
const db = drizzle(sql);

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware for request logging
  app.use('/api', (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
    next();
  });

  // CORS middleware for API routes
  app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  // Health check endpoint
  app.get("/api/health", async (req, res) => {
    try {
      const dbCheck = await sql`SELECT NOW() as timestamp, version() as version`;
      res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'Connected',
        dbTime: dbCheck[0].timestamp,
        dbVersion: dbCheck[0].version.split(' ')[0]
      });
    } catch (error: any) {
      res.status(500).json({ 
        status: 'ERROR', 
        error: error.message 
      });
    }
  });

  // Get platform statistics
  app.get("/api/stats", 
    cacheMiddleware(() => cacheKeys.platformStats(), 2 * 60 * 1000), // 2 minutes cache
    async (req, res) => {
    try {
      const [userCount, fundCount, investmentCount, totalInvested] = await Promise.all([
        db.select({ count: sqlOperator`count(*)` }).from(users),
        db.select({ count: sqlOperator`count(*)` }).from(investmentFunds),
        db.select({ count: sqlOperator`count(*)` }).from(investments),
        db.select({ 
          total: sqlOperator`COALESCE(SUM(CAST(amount AS NUMERIC)), 0)` 
        }).from(investments).where(eq(investments.status, 'active'))
      ]);

      res.json({
        users: userCount[0].count,
        funds: fundCount[0].count,
        investments: investmentCount[0].count,
        totalInvested: totalInvested[0].total
      });
    } catch (error: any) {
      console.error('Database error:', error);
      res.status(500).json({ error: "Failed to fetch platform statistics" });
    }
  });

  // Investment funds routes
  app.get("/api/investment-funds", 
    cacheMiddleware((req) => {
      const { category } = req.query;
      return category ? cacheKeys.fundsByCategory(category as string) : cacheKeys.allFunds();
    }, 10 * 60 * 1000), // 10 minutes cache
    async (req, res) => {
    try {
      const { category, sortBy = 'dailyReturn', order = 'desc' } = req.query;
      
      // Try database first, fallback to temp data
      let funds;
      
      try {
        if (category && typeof category === 'string') {
          funds = await db.select().from(investmentFunds)
            .where(eq(investmentFunds.category, category))
            .orderBy(order === 'asc' ? investmentFunds.dailyReturn : desc(investmentFunds.dailyReturn));
        } else {
          funds = await db.select().from(investmentFunds)
            .orderBy(order === 'asc' ? investmentFunds.dailyReturn : desc(investmentFunds.dailyReturn));
        }
      } catch (dbError) {
        console.log('Database unavailable, using temporary data:', dbError);
        // Fallback to temporary data
        funds = tempFundsData;
        console.log('Using temp funds data, count:', funds.length);
        console.log('First fund:', funds[0]?.name, funds[0]?.dailyReturn);
        
        // Apply filtering and sorting
        if (category && typeof category === 'string') {
          funds = funds.filter(fund => fund.category === category);
        }
        
        funds = funds.sort((a, b) => {
          if (order === 'asc') {
            return Number(a.dailyReturn) - Number(b.dailyReturn);
          } else {
            return Number(b.dailyReturn) - Number(a.dailyReturn);
          }
        });
      }
      
      console.log('Sending funds response, count:', funds.length);
      res.json(funds);
    } catch (error: any) {
      console.error('API error:', error);
      res.status(500).json({ error: "Failed to fetch investment funds" });
    }
  });

  app.get("/api/investment-funds/:id", async (req, res) => {
    try {
      let fund;
      
      try {
        const dbResult = await db.select().from(investmentFunds).where(eq(investmentFunds.id, req.params.id));
        fund = dbResult.length > 0 ? dbResult[0] : null;
      } catch (dbError) {
        console.log('Database unavailable, using temporary data:', dbError);
        // Fallback to temporary data
        fund = tempFundsData.find(f => f.id === req.params.id) || null;
      }
      
      if (!fund) {
        return res.status(404).json({ error: "Investment fund not found" });
      }
      res.json(fund);
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: "Failed to fetch investment fund" });
    }
  });

  // Investment operations routes
  app.post("/api/investments", async (req, res) => {
    try {
      const { userId, fundId, amount, expectedReturn } = req.body;
      
      // Validation
      if (!userId || !fundId || !amount) {
        return res.status(400).json({ error: "Missing required fields: userId, fundId, amount" });
      }
      
      // Validate fund exists
      const fund = await db.select().from(investmentFunds).where(eq(investmentFunds.id, fundId));
      if (!fund.length) {
        return res.status(404).json({ error: "Investment fund not found" });
      }
      
      // Validate user exists (if needed)
      const user = await db.select().from(users).where(eq(users.id, userId));
      if (!user.length) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Validate minimum investment amount
      const minInvestment = parseFloat(fund[0].minInvestment.replace(/[,đ]/g, ''));
      const investmentAmount = parseFloat(amount.toString().replace(/[,đ]/g, ''));
      
      if (investmentAmount < minInvestment) {
        return res.status(400).json({ 
          error: `Minimum investment is ${fund[0].minInvestment}` 
        });
      }
      
      const newInvestment = await db.insert(investments).values({
        userId,
        fundId,
        amount: amount.toString(),
        expectedReturn: expectedReturn?.toString(),
        status: 'active'
      }).returning();

      // Return investment with fund details
      const investmentWithFund = await db.select({
        investment: investments,
        fund: investmentFunds
      })
      .from(investments)
      .leftJoin(investmentFunds, eq(investments.fundId, investmentFunds.id))
      .where(eq(investments.id, newInvestment[0].id));

      res.status(201).json(investmentWithFund[0]);
      
      // Invalidate user-related caches
      cache.invalidatePattern(`investments:user:${userId}`);
      cache.invalidatePattern(`portfolio:user:${userId}`);
      cache.invalidatePattern(`performance:user:${userId}`);
      cache.delete(cacheKeys.platformStats());
      
      // Send notification
      createInvestmentNotification(userId, newInvestment[0], fund[0]);
      
    } catch (error: any) {
      console.error('Database error:', error);
      res.status(500).json({ error: "Failed to create investment" });
    }
  });

  app.get("/api/investments/:userId", cacheMiddleware(cacheKeys.userInvestments, 300), async (req, res) => {
    try {
      const { userId } = req.params;
      const { status, limit = '50', offset = '0' } = req.query;
      
      // Build where condition
      let whereCondition;
      if (status && typeof status === 'string') {
        whereCondition = and(
          eq(investments.userId, userId),
          eq(investments.status, status)
        )!;
      } else {
        whereCondition = eq(investments.userId, userId);
      }
      
      // Fetch user investments
      const userInvestments = await db.select({
        investment: investments,
        fund: investmentFunds
      })
      .from(investments)
      .leftJoin(investmentFunds, eq(investments.fundId, investmentFunds.id))
      .where(whereCondition)
      .orderBy(desc(investments.createdAt))
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string));

      // Calculate summary statistics
      const summary = await db.select({
        totalInvested: sqlOperator`COALESCE(SUM(CAST(amount AS NUMERIC)), 0)`,
        totalExpectedReturn: sqlOperator`COALESCE(SUM(CAST(expected_return AS NUMERIC)), 0)`,
        activeCount: sqlOperator`COUNT(CASE WHEN status = 'active' THEN 1 END)`,
        withdrawnCount: sqlOperator`COUNT(CASE WHEN status = 'withdrawn' THEN 1 END)`
      })
      .from(investments)
      .where(eq(investments.userId, userId));

      res.json({
        investments: userInvestments,
        summary: summary[0],
        pagination: {
          limit: parseInt(limit as string),
          offset: parseInt(offset as string),
          total: userInvestments.length
        }
      });
    } catch (error: any) {
      console.error('Database error:', error);
      res.status(500).json({ error: "Failed to fetch user investments" });
    }
  });

  // Portfolio analysis endpoint
  app.get("/api/portfolio/:userId", cacheMiddleware(cacheKeys.userPortfolio, 300), async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Get portfolio overview
      const portfolioData = await db.select({
        investment: investments,
        fund: investmentFunds
      })
      .from(investments)
      .leftJoin(investmentFunds, eq(investments.fundId, investmentFunds.id))
      .where(eq(investments.userId, userId));

      // Calculate portfolio metrics
      let totalInvested = 0;
      let totalExpectedReturn = 0;
      let totalCurrentValue = 0;
      const fundDistribution: Record<string, { amount: number; count: number; name: string }> = {};
      const categoryDistribution: Record<string, { amount: number; count: number }> = {};

      portfolioData.forEach(item => {
        const investment = item.investment;
        const fund = item.fund;
        
        if (fund && investment.status === 'active') {
          const investAmount = parseFloat(investment.amount);
          const expectedReturn = parseFloat(investment.expectedReturn || '0');
          
          totalInvested += investAmount;
          totalExpectedReturn += expectedReturn;
          
          // Calculate current value based on time elapsed
          const createdDate = new Date(investment.createdAt);
          const now = new Date();
          const daysElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
          const dailyReturn = parseFloat(fund.dailyReturn);
          const currentReturn = investAmount * dailyReturn * Math.min(daysElapsed, fund.duration);
          totalCurrentValue += investAmount + currentReturn;
          
          // Fund distribution
          if (!fundDistribution[fund.code]) {
            fundDistribution[fund.code] = { amount: 0, count: 0, name: fund.name };
          }
          fundDistribution[fund.code].amount += investAmount;
          fundDistribution[fund.code].count += 1;
          
          // Category distribution
          if (!categoryDistribution[fund.category]) {
            categoryDistribution[fund.category] = { amount: 0, count: 0 };
          }
          categoryDistribution[fund.category].amount += investAmount;
          categoryDistribution[fund.category].count += 1;
        }
      });

      const totalGain = totalCurrentValue - totalInvested;
      const totalGainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

      res.json({
        summary: {
          totalInvested,
          totalExpectedReturn,
          totalCurrentValue,
          totalGain,
          totalGainPercent: Number(totalGainPercent.toFixed(2)),
          activeInvestments: portfolioData.filter(item => item.investment.status === 'active').length,
          totalInvestments: portfolioData.length
        },
        distribution: {
          byFund: fundDistribution,
          byCategory: categoryDistribution
        },
        investments: portfolioData
      });
    } catch (error: any) {
      console.error('Database error:', error);
      res.status(500).json({ error: "Failed to fetch portfolio data" });
    }
  });

  app.put("/api/investments/:id/withdraw", async (req, res) => {
    try {
      const { actualReturn } = req.body;
      const investmentId = req.params.id;
      
      // Validate investment exists and is active
      const existingInvestment = await db.select()
        .from(investments)
        .where(eq(investments.id, investmentId));
        
      if (!existingInvestment.length) {
        return res.status(404).json({ error: "Investment not found" });
      }
      
      if (existingInvestment[0].status !== 'active') {
        return res.status(400).json({ error: "Investment is not active" });
      }
      
      const updatedInvestment = await db.update(investments)
        .set({
          status: 'withdrawn',
          actualReturn: actualReturn?.toString(),
          withdrawnAt: new Date().toISOString()
        })
        .where(eq(investments.id, investmentId))
        .returning();

      // Return updated investment with fund details
      const investmentWithFund = await db.select({
        investment: investments,
        fund: investmentFunds
      })
      .from(investments)
      .leftJoin(investmentFunds, eq(investments.fundId, investmentFunds.id))
      .where(eq(investments.id, investmentId));

      res.json(investmentWithFund[0]);
      
      // Invalidate user-related caches
      cache.invalidatePattern(`investments:user:${updatedInvestment[0].userId}`);
      cache.invalidatePattern(`portfolio:user:${updatedInvestment[0].userId}`);
      cache.invalidatePattern(`performance:user:${updatedInvestment[0].userId}`);
      cache.delete(cacheKeys.platformStats());
      
      // Send notification
      createWithdrawNotification(updatedInvestment[0].userId, updatedInvestment[0], investmentWithFund[0].fund);
      
    } catch (error: any) {
      console.error('Database error:', error);
      res.status(500).json({ error: "Failed to withdraw investment" });
    }
  });

  // Error handling middleware
  app.use('/api', (error: any, req: any, res: any, next: any) => {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  });

  // Clear cache endpoint (for development)
  app.post("/api/admin/clear-cache", (req, res) => {
    try {
      // Clear all fund-related cache
      cache.delete(cacheKeys.allFunds());
      cache.invalidatePattern('funds:');
      cache.delete(cacheKeys.platformStats());
      
      console.log('🧹 Cache cleared by admin request');
      res.json({ 
        success: true, 
        message: 'Cache cleared successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Error clearing cache:', error);
      res.status(500).json({ error: "Failed to clear cache" });
    }
  });

  // GET version for easy access
  app.get("/api/admin/clear-cache", (req, res) => {
    try {
      // Clear all fund-related cache
      cache.delete(cacheKeys.allFunds());
      cache.invalidatePattern('funds:');
      cache.delete(cacheKeys.platformStats());
      
      console.log('🧹 Cache cleared by admin request (GET)');
      res.json({ 
        success: true, 
        message: 'Cache cleared successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Failed to clear cache:', error);
      res.status(500).json({ 
        error: 'Failed to clear cache',
        message: error.message
      });
    }
  });

  // 404 handler for API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ 
      error: 'API endpoint not found',
      path: req.path,
      method: req.method
    });
  });

  // Add advanced analytics APIs
  addAdvancedAnalytics(app);
  console.log('✅ Advanced Analytics APIs integrated');

  const httpServer = createServer(app);

  return httpServer;
}
