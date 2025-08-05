// In-memory caching layer for VinFast V-Green Platform
class CacheManager {
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expiry });
    console.log(`💾 Cached: ${key} (TTL: ${ttl || this.defaultTTL}ms)`);
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      console.log(`🗑️  Cache expired: ${key}`);
      return null;
    }
    
    console.log(`✅ Cache hit: ${key}`);
    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
    console.log(`🗑️  Cache deleted: ${key}`);
  }

  clear(): void {
    this.cache.clear();
    console.log('🧹 Cache cleared');
  }

  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    const keysToDelete: string[] = [];
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => this.delete(key));
    console.log(`🔄 Invalidated ${keysToDelete.length} cache entries matching: ${pattern}`);
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired cache entries`);
    }
  }
}

// Create global cache instance
export const cache = new CacheManager();

// Cache middleware function
export function cacheMiddleware(keyGenerator: (req: any) => string, ttl?: number) {
  return (req: any, res: any, next: any) => {
    const cacheKey = keyGenerator(req);
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      res.json(cachedData);
      return;
    }
    
    // Store original json method
    const originalJson = res.json;
    
    // Override json method to cache response
    res.json = function(data: any) {
      cache.set(cacheKey, data, ttl);
      originalJson.call(this, data);
    };
    
    next();
  };
}

// Predefined cache key generators
export const cacheKeys = {
  allFunds: () => 'funds:all',
  fundsByCategory: (category: string) => `funds:category:${category}`,
  fundById: (id: string) => `fund:${id}`,
  userInvestments: (userId: string) => `investments:user:${userId}`,
  userPortfolio: (userId: string) => `portfolio:user:${userId}`,
  marketAnalysis: () => 'analytics:market',
  platformStats: () => 'stats:platform',
  userPerformance: (userId: string, timeframe: string) => `performance:user:${userId}:${timeframe}`,
  recommendations: (userId: string, budget: string, risk: string) => `recommendations:${userId}:${budget}:${risk}`
};

// Auto cleanup every 10 minutes
setInterval(() => {
  cache.cleanup();
}, 10 * 60 * 1000);

console.log('💾 Cache Manager initialized');
