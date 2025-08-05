// API service for investment operations
class InvestmentAPI {
  private baseURL = '/api';

  async getFunds() {
    const response = await fetch(`${this.baseURL}/investment-funds`);
    if (!response.ok) throw new Error('Failed to fetch funds');
    return response.json();
  }

  async getFund(id: string) {
    const response = await fetch(`${this.baseURL}/investment-funds/${id}`);
    if (!response.ok) throw new Error('Failed to fetch fund');
    return response.json();
  }

  async createInvestment(investment: {
    userId: string;
    fundId: string;
    amount: string;
    expectedReturn?: string;
  }) {
    const response = await fetch(`${this.baseURL}/investments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(investment),
    });
    if (!response.ok) throw new Error('Failed to create investment');
    return response.json();
  }

  async getUserInvestments(userId: string) {
    const response = await fetch(`${this.baseURL}/investments/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user investments');
    return response.json();
  }

  async withdrawInvestment(investmentId: string, actualReturn: string) {
    const response = await fetch(`${this.baseURL}/investments/${investmentId}/withdraw`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ actualReturn }),
    });
    if (!response.ok) throw new Error('Failed to withdraw investment');
    return response.json();
  }
}

export const investmentAPI = new InvestmentAPI();
