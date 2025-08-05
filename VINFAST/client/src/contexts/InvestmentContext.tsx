import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { investmentAPI } from '../lib/api';
import type { InvestmentFund, Investment } from '../../../shared/schema';

interface InvestmentContextType {
  funds: InvestmentFund[];
  userInvestments: Investment[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchFunds: () => Promise<void>;
  createInvestment: (investment: {
    userId: string;
    fundId: string;
    amount: string;
    expectedReturn?: string;
  }) => Promise<void>;
  withdrawInvestment: (investmentId: string, actualReturn: string) => Promise<void>;
  refreshUserInvestments: (userId: string) => Promise<void>;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};

interface InvestmentProviderProps {
  children: ReactNode;
}

export const InvestmentProvider: React.FC<InvestmentProviderProps> = ({ children }) => {
  const [funds, setFunds] = useState<InvestmentFund[]>([]);
  const [userInvestments, setUserInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFunds = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedFunds = await investmentAPI.getFunds();
      setFunds(fetchedFunds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch funds');
      console.error('Error fetching funds:', err);
    } finally {
      setLoading(false);
    }
  };

  const createInvestment = async (investment: {
    userId: string;
    fundId: string;
    amount: string;
    expectedReturn?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      await investmentAPI.createInvestment(investment);
      // Refresh user investments after creating new one
      await refreshUserInvestments(investment.userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create investment');
      console.error('Error creating investment:', err);
      throw err; // Re-throw to handle in UI
    } finally {
      setLoading(false);
    }
  };

  const withdrawInvestment = async (investmentId: string, actualReturn: string) => {
    setLoading(true);
    setError(null);
    try {
      await investmentAPI.withdrawInvestment(investmentId, actualReturn);
      // Update local state
      setUserInvestments(prev => 
        prev.map(inv => 
          inv.id === investmentId 
            ? { ...inv, status: 'withdrawn', actualReturn, withdrawnAt: new Date().toISOString() }
            : inv
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to withdraw investment');
      console.error('Error withdrawing investment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserInvestments = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const investments = await investmentAPI.getUserInvestments(userId);
      setUserInvestments(investments.map((item: any) => ({
        ...item.investment,
        fund: item.fund
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user investments');
      console.error('Error fetching user investments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load funds on mount
  useEffect(() => {
    fetchFunds();
  }, []);

  const value: InvestmentContextType = {
    funds,
    userInvestments,
    loading,
    error,
    fetchFunds,
    createInvestment,
    withdrawInvestment,
    refreshUserInvestments,
  };

  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
};
