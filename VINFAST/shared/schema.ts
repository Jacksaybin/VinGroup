import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at").notNull().default(sql`NOW()`),
  updatedAt: text("updated_at").notNull().default(sql`NOW()`),
});

export const investmentFunds = pgTable("investment_funds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  dailyReturn: decimal("daily_return", { precision: 5, scale: 3 }).notNull(),
  duration: integer("duration").notNull(),
  minInvestment: text("min_investment").notNull(),
  maxInvestment: text("max_investment"),
  projectScale: text("project_scale").notNull(),
  progress: integer("progress").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  features: text("features").array(),
  createdAt: text("created_at").notNull().default(sql`NOW()`),
  updatedAt: text("updated_at").notNull().default(sql`NOW()`),
});

export const investments = pgTable("investments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  fundId: varchar("fund_id").notNull().references(() => investmentFunds.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  status: text("status").notNull().default("active"), // active, completed, withdrawn
  createdAt: text("created_at").notNull().default(sql`NOW()`),
  expectedReturn: decimal("expected_return", { precision: 15, scale: 2 }),
  actualReturn: decimal("actual_return", { precision: 15, scale: 2 }),
  withdrawnAt: text("withdrawn_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertInvestmentFundSchema = createInsertSchema(investmentFunds).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InvestmentFund = typeof investmentFunds.$inferSelect;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestmentFund = z.infer<typeof insertInvestmentFundSchema>;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
