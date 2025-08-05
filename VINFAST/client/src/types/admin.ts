// Admin System Types & Interfaces

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  approved: boolean;
  balance: number;
  totalInvestment: number;
  totalProfit: number;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'suspended' | 'pending';
  phone?: string;
  address?: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
}

export interface UserRole {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface AdminTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'investment' | 'profit' | 'fee';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  fundId?: string;
  description: string;
  createdAt: string;
  processedAt?: string;
  processedBy?: string;
}

export interface AdminFund {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  expectedReturn: string;
  dailyReturn: string;
  duration: number;
  minInvestment: string;
  maxInvestment: string | null;
  projectScale: string;
  progress: number;
  totalInvestors: number;
  totalInvestment: string;
  status: 'active' | 'inactive' | 'coming_soon' | 'ended';
  riskLevel: 'low' | 'medium' | 'high';
  features: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminNews {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  imageUrl?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description: string;
  category: 'general' | 'payment' | 'security' | 'notification' | 'ui';
  updatedAt: string;
  updatedBy: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  target: 'all' | 'specific' | 'role';
  targetIds?: string[];
  status: 'draft' | 'sent' | 'scheduled';
  scheduledAt?: string;
  createdAt: string;
  sentAt?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalFunds: number;
  activeFunds: number;
  totalInvestment: number;
  totalProfit: number;
  todayRegistrations: number;
  todayTransactions: number;
  todayInvestments: number;
  conversionRate: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
}

// File structure
client/src/
├── types/admin.ts                 # Admin type definitions
├── pages/admin.tsx               # Admin entry point
├── components/admin/
│   ├── AdminLayout.tsx          # Main layout với sidebar
│   ├── AdminDashboard.tsx       # Dashboard tổng quan
│   ├── UserManagement.tsx       # Quản lý người dùng (full)
│   ├── FundManagement.tsx       # Quản lý sản phẩm (stub)
│   ├── TransactionManagement.tsx # Quản lý giao dịch (stub)
│   ├── ContentManagement.tsx    # Quản lý nội dung (stub)
│   ├── SystemManagement.tsx     # Quản lý hệ thống (stub)
│   └── ReportsAnalytics.tsx     # Báo cáo phân tích (stub)
