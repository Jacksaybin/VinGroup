// Advanced Analytics API - Thêm tính năng phân tích nâng cao
import type { Express } from "express";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { investmentFunds, investments, users } from "../shared/schema";
import { eq, and, desc, sql as sqlOperator, gte, lte } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require');
const db = drizzle(sql);

export function addAdvancedAnalytics(app: Express) {
  
  // 📊 Advanced Market Analysis
  app.get("/api/analytics/market", async (req, res) => {
    try {
      console.log('📊 Market Analysis API called');
      
      // Fund performance analysis
      const fundPerformance = await db.select({
        fundId: investmentFunds.id,
        fundCode: investmentFunds.code,
        fundName: investmentFunds.name,
        category: investmentFunds.category,
        dailyReturn: investmentFunds.dailyReturn,
        duration: investmentFunds.duration,
        progress: investmentFunds.progress,
        totalInvestments: sqlOperator`COUNT(investments.id)`,
        totalAmount: sqlOperator`COALESCE(SUM(CAST(investments.amount AS NUMERIC)), 0)`,
        avgInvestment: sqlOperator`COALESCE(AVG(CAST(investments.amount AS NUMERIC)), 0)`,
        activeInvestments: sqlOperator`COUNT(CASE WHEN investments.status = 'active' THEN 1 END)`
      })
      .from(investmentFunds)
      .leftJoin(investments, eq(investmentFunds.id, investments.fundId))
      .groupBy(investmentFunds.id, investmentFunds.code, investmentFunds.name, 
               investmentFunds.category, investmentFunds.dailyReturn, 
               investmentFunds.duration, investmentFunds.progress);

      // Market trends by category
      const categoryTrends = await db.select({
        category: investmentFunds.category,
        fundCount: sqlOperator`COUNT(DISTINCT investment_funds.id)`,
        totalInvestments: sqlOperator`COUNT(investments.id)`,
        totalAmount: sqlOperator`COALESCE(SUM(CAST(investments.amount AS NUMERIC)), 0)`,
        avgDailyReturn: sqlOperator`AVG(CAST(investment_funds.daily_return AS NUMERIC))`,
        avgDuration: sqlOperator`AVG(investment_funds.duration)`,
        avgProgress: sqlOperator`AVG(investment_funds.progress)`
      })
      .from(investmentFunds)
      .leftJoin(investments, eq(investmentFunds.id, investments.fundId))
      .groupBy(investmentFunds.category);

      // Calculate market metrics
      const totalMarketValue = fundPerformance.reduce((sum, fund) => 
        sum + parseFloat(fund.totalAmount?.toString() || '0'), 0);
      
      const avgMarketReturn = fundPerformance.reduce((sum, fund) => 
        sum + parseFloat(fund.dailyReturn), 0) / fundPerformance.length;

      res.json({
        marketOverview: {
          totalMarketValue,
          avgMarketReturn: Number((avgMarketReturn * 100).toFixed(3)),
          totalFunds: fundPerformance.length,
          totalActiveInvestments: fundPerformance.reduce((sum, fund) => 
            sum + parseInt(fund.activeInvestments?.toString() || '0'), 0)
        },
        fundPerformance: fundPerformance.map(fund => ({
          ...fund,
          totalAmount: parseFloat(fund.totalAmount?.toString() || '0'),
          avgInvestment: parseFloat(fund.avgInvestment?.toString() || '0'),
          dailyReturnPercent: parseFloat(fund.dailyReturn) * 100,
          annualizedReturn: parseFloat(fund.dailyReturn) * 365 * 100,
          marketShare: totalMarketValue > 0 ? 
            (parseFloat(fund.totalAmount?.toString() || '0') / totalMarketValue * 100) : 0
        })),
        categoryTrends: categoryTrends.map(cat => ({
          ...cat,
          totalAmount: parseFloat(cat.totalAmount?.toString() || '0'),
          avgDailyReturnPercent: parseFloat(cat.avgDailyReturn?.toString() || '0') * 100,
          avgDuration: parseFloat(cat.avgDuration?.toString() || '0'),
          avgProgress: parseFloat(cat.avgProgress?.toString() || '0')
        }))
      });
    } catch (error: any) {
      console.error('Market analysis error:', error);
      res.status(500).json({ error: "Failed to fetch market analysis" });
    }
  });

  // 📈 Investment Performance Tracker
  app.get("/api/analytics/performance/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { timeframe = '30' } = req.query; // days
      
      console.log(`📈 Performance tracking for user: ${userId}`);
      
      // Get user's investment history
      const userInvestments = await db.select({
        investment: investments,
        fund: investmentFunds
      })
      .from(investments)
      .leftJoin(investmentFunds, eq(investments.fundId, investmentFunds.id))
      .where(eq(investments.userId, userId))
      .orderBy(desc(investments.createdAt));

      // Calculate daily performance over timeframe
      const days = parseInt(timeframe as string);
      const dailyPerformance = [];
      const now = new Date();
      
      for (let i = days - 1; i >= 0; i--) {
        const targetDate = new Date(now);
        targetDate.setDate(targetDate.getDate() - i);
        
        let dayValue = 0;
        let dayInvested = 0;
        
        userInvestments.forEach(item => {
          const investment = item.investment;
          const fund = item.fund;
          
          if (fund && investment.status === 'active') {
            const investDate = new Date(investment.createdAt);
            
            // Only calculate if investment was made before or on target date
            if (investDate <= targetDate) {
              const investAmount = parseFloat(investment.amount);
              const daysFromInvest = Math.floor((targetDate.getTime() - investDate.getTime()) / (1000 * 60 * 60 * 24));
              const dailyReturn = parseFloat(fund.dailyReturn);
              const accumulatedReturn = investAmount * dailyReturn * Math.min(daysFromInvest, fund.duration);
              
              dayInvested += investAmount;
              dayValue += investAmount + accumulatedReturn;
            }
          }
        });
        
        dailyPerformance.push({
          date: targetDate.toISOString().split('T')[0],
          invested: dayInvested,
          value: dayValue,
          gain: dayValue - dayInvested,
          gainPercent: dayInvested > 0 ? ((dayValue - dayInvested) / dayInvested * 100) : 0
        });
      }

      // Calculate performance metrics
      const currentValue = dailyPerformance[dailyPerformance.length - 1]?.value || 0;
      const currentInvested = dailyPerformance[dailyPerformance.length - 1]?.invested || 0;
      const currentGain = currentValue - currentInvested;
      
      // Best and worst performing investments
      const performanceRanking = userInvestments
        .filter(item => item.fund && item.investment.status === 'active')
        .map(item => {
          const investment = item.investment;
          const fund = item.fund!;
          const investAmount = parseFloat(investment.amount);
          const createdDate = new Date(investment.createdAt);
          const daysElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
          const dailyReturn = parseFloat(fund.dailyReturn);
          const currentReturn = investAmount * dailyReturn * Math.min(daysElapsed, fund.duration);
          const currentValue = investAmount + currentReturn;
          const gainPercent = (currentReturn / investAmount) * 100;
          
          return {
            investmentId: investment.id,
            fundCode: fund.code,
            fundName: fund.name,
            amount: investAmount,
            currentValue,
            gain: currentReturn,
            gainPercent,
            daysHeld: daysElapsed,
            dailyReturnPercent: parseFloat(fund.dailyReturn) * 100
          };
        })
        .sort((a, b) => b.gainPercent - a.gainPercent);

      res.json({
        summary: {
          timeframeDays: days,
          currentInvested,
          currentValue,
          currentGain,
          currentGainPercent: currentInvested > 0 ? (currentGain / currentInvested * 100) : 0,
          totalInvestments: userInvestments.length,
          activeInvestments: userInvestments.filter(item => item.investment.status === 'active').length
        },
        dailyPerformance,
        topPerformers: performanceRanking.slice(0, 5),
        worstPerformers: performanceRanking.slice(-3).reverse(),
        allInvestments: performanceRanking
      });
    } catch (error: any) {
      console.error('Performance tracking error:', error);
      res.status(500).json({ error: "Failed to fetch performance data" });
    }
  });

  // 🎯 Investment Recommendations
  app.get("/api/analytics/recommendations/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { budget = '0', riskTolerance = 'medium' } = req.query;
      
      console.log(`🎯 Generating recommendations for user: ${userId}`);
      
      // Get user's current portfolio
      const userPortfolio = await db.select({
        investment: investments,
        fund: investmentFunds
      })
      .from(investments)
      .leftJoin(investmentFunds, eq(investments.fundId, investmentFunds.id))
      .where(and(eq(investments.userId, userId), eq(investments.status, 'active')));

      // Get all available funds
      const allFunds = await db.select().from(investmentFunds);
      
      // Calculate portfolio distribution
      const portfolioValue = userPortfolio.reduce((sum, item) => 
        sum + parseFloat(item.investment.amount), 0);
      
      const categoryDistribution: Record<string, number> = {};
      userPortfolio.forEach(item => {
        if (item.fund) {
          const category = item.fund.category;
          categoryDistribution[category] = (categoryDistribution[category] || 0) + 
            parseFloat(item.investment.amount);
        }
      });

      // Generate recommendations based on criteria
      const recommendations = allFunds.map(fund => {
        const dailyReturnPercent = parseFloat(fund.dailyReturn) * 100;
        const annualReturn = dailyReturnPercent * 365;
        const minInvestment = parseFloat(fund.minInvestment.replace(/[,đ]/g, ''));
        
        // Risk scoring (higher daily return = higher risk)
        let riskScore = 'low';
        if (dailyReturnPercent > 12) riskScore = 'high';
        else if (dailyReturnPercent > 10) riskScore = 'medium';
        
        // Compatibility with user's risk tolerance
        const riskCompatible = 
          (riskTolerance === 'low' && riskScore === 'low') ||
          (riskTolerance === 'medium' && ['low', 'medium'].includes(riskScore)) ||
          (riskTolerance === 'high');
        
        // Budget compatibility
        const budgetNumber = parseFloat(budget as string || '0');
        const budgetCompatible = budgetNumber === 0 || budgetNumber >= minInvestment;
        
        // Diversification score (prefer categories user doesn't have much of)
        const currentCategoryAmount = categoryDistribution[fund.category] || 0;
        const categoryWeight = portfolioValue > 0 ? currentCategoryAmount / portfolioValue : 0;
        const diversificationScore = 1 - Math.min(categoryWeight, 1);
        
        // Overall recommendation score
        let score = 0;
        if (riskCompatible) score += 30;
        if (budgetCompatible) score += 20;
        score += diversificationScore * 25; // Max 25 points for diversification
        score += Math.min(annualReturn / 10, 25); // Max 25 points for return potential
        
        return {
          fund,
          score: Math.round(score),
          riskScore,
          riskCompatible,
          budgetCompatible,
          diversificationScore: Math.round(diversificationScore * 100),
          dailyReturnPercent,
          annualReturn: Math.round(annualReturn * 100) / 100,
          minInvestment,
          reasons: [
            ...(riskCompatible ? [`Phù hợp với mức rủi ro ${riskTolerance}`] : []),
            ...(budgetCompatible ? ['Phù hợp với ngân sách'] : []),
            ...(diversificationScore > 0.5 ? ['Giúp đa dạng hóa portfolio'] : []),
            ...(annualReturn > 3000 ? ['Tiềm năng lợi nhuận cao'] : [])
          ]
        };
      })
      .filter(rec => rec.riskCompatible && rec.budgetCompatible)
      .sort((a, b) => b.score - a.score);

      res.json({
        userProfile: {
          userId,
          portfolioValue,
          activeInvestments: userPortfolio.length,
          riskTolerance,
          budget: budgetNumber
        },
        portfolioAnalysis: {
          categoryDistribution,
          diversificationLevel: Object.keys(categoryDistribution).length,
          concentrationRisk: Math.max(...Object.values(categoryDistribution)) / portfolioValue
        },
        recommendations: recommendations.slice(0, 10), // Top 10 recommendations
        summary: {
          totalFunds: allFunds.length,
          compatibleFunds: recommendations.length,
          topRecommendation: recommendations[0] || null
        }
      });
    } catch (error: any) {
      console.error('Recommendation error:', error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  console.log('✅ Advanced Analytics APIs added successfully');
}
