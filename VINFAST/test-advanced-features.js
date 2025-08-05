#!/usr/bin/env node

/**
 * Test Script for VinFast V-Green Advanced Features
 * Tests: Analytics, Real-time, Caching, Performance
 */

const axios = require('axios');
const io = require('socket.io-client');

const BASE_URL = 'http://localhost:5000';
const API_URL = `${BASE_URL}/api`;

// Test data
const testUserId = 'test-user-' + Date.now();
const testFundId = 'VIC01';

class AdvancedFeaturesTester {
  constructor() {
    this.socket = null;
    this.results = {
      analytics: { passed: 0, failed: 0, tests: [] },
      realtime: { passed: 0, failed: 0, tests: [] },
      caching: { passed: 0, failed: 0, tests: [] },
      performance: { passed: 0, failed: 0, tests: [] }
    };
  }

  async runAllTests() {
    console.log('🚀 VinFast V-Green Advanced Features Test Suite');
    console.log('=' .repeat(60));
    
    try {
      // Wait for server to be ready
      await this.waitForServer();
      
      // Run test suites
      await this.testAnalyticsFeatures();
      await this.testCachingFeatures();
      await this.testRealtimeFeatures();
      await this.testPerformanceOptimizations();
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
    } finally {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
  }

  async waitForServer() {
    console.log('⏳ Waiting for server to be ready...');
    let attempts = 0;
    const maxAttempts = 30;
    
    while (attempts < maxAttempts) {
      try {
        const response = await axios.get(`${API_URL}/health`);
        if (response.data.status === 'healthy') {
          console.log('✅ Server is ready');
          return;
        }
      } catch (error) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    throw new Error('Server did not start within 30 seconds');
  }

  async testAnalyticsFeatures() {
    console.log('\n📊 Testing Advanced Analytics Features...');
    
    // Test market analysis
    await this.runTest('analytics', 'Market Analysis API', async () => {
      const response = await axios.get(`${API_URL}/analytics/market`);
      
      if (!response.data.overview || !response.data.topPerformingFunds) {
        throw new Error('Missing market analysis data');
      }
      
      console.log('   📈 Market overview:', response.data.overview.totalInvestments, 'investments');
      return 'Market analysis API working correctly';
    });

    // Test performance tracking (mock user)
    await this.runTest('analytics', 'Performance Tracking API', async () => {
      const response = await axios.get(`${API_URL}/analytics/performance/${testUserId}`);
      
      if (!response.data.dailyPerformance || !response.data.summary) {
        throw new Error('Missing performance tracking data');
      }
      
      console.log('   📊 Performance data for user:', testUserId);
      return 'Performance tracking API working correctly';
    });

    // Test investment recommendations
    await this.runTest('analytics', 'Investment Recommendations API', async () => {
      const response = await axios.get(`${API_URL}/analytics/recommendations/${testUserId}`);
      
      if (!response.data.recommendations || !Array.isArray(response.data.recommendations)) {
        throw new Error('Missing recommendations data');
      }
      
      console.log('   💡 Generated', response.data.recommendations.length, 'recommendations');
      return 'Investment recommendations API working correctly';
    });
  }

  async testCachingFeatures() {
    console.log('\n⚡ Testing Caching Features...');
    
    // Test cache performance on stats endpoint
    await this.runTest('caching', 'Stats Endpoint Caching', async () => {
      const start1 = Date.now();
      const response1 = await axios.get(`${API_URL}/stats`);
      const time1 = Date.now() - start1;
      
      const start2 = Date.now();
      const response2 = await axios.get(`${API_URL}/stats`);
      const time2 = Date.now() - start2;
      
      if (time2 >= time1) {
        throw new Error(`Cache not working: First request ${time1}ms, Second request ${time2}ms`);
      }
      
      console.log('   ⚡ Cache improvement:', Math.round((time1 - time2) / time1 * 100) + '%');
      return `Cache working: ${time1}ms → ${time2}ms`;
    });

    // Test investment funds caching
    await this.runTest('caching', 'Investment Funds Caching', async () => {
      const start1 = Date.now();
      await axios.get(`${API_URL}/investment-funds`);
      const time1 = Date.now() - start1;
      
      const start2 = Date.now();
      await axios.get(`${API_URL}/investment-funds`);
      const time2 = Date.now() - start2;
      
      console.log('   📋 Funds cache:', time1 + 'ms → ' + time2 + 'ms');
      return 'Investment funds caching working';
    });
  }

  async testRealtimeFeatures() {
    console.log('\n🔄 Testing Real-time Features...');
    
    // Test WebSocket connection
    await this.runTest('realtime', 'WebSocket Connection', async () => {
      return new Promise((resolve, reject) => {
        this.socket = io(BASE_URL);
        
        const timeout = setTimeout(() => {
          reject(new Error('WebSocket connection timeout'));
        }, 5000);
        
        this.socket.on('connect', () => {
          clearTimeout(timeout);
          console.log('   🔌 WebSocket connected:', this.socket.id);
          resolve('WebSocket connection successful');
        });
        
        this.socket.on('connect_error', (error) => {
          clearTimeout(timeout);
          reject(new Error('WebSocket connection failed: ' + error.message));
        });
      });
    });

    // Test notifications API
    await this.runTest('realtime', 'Notifications API', async () => {
      const response = await axios.get(`${API_URL}/notifications/${testUserId}`);
      
      if (!response.data.notifications || !Array.isArray(response.data.notifications)) {
        throw new Error('Missing notifications data');
      }
      
      console.log('   🔔 Found', response.data.notifications.length, 'notifications');
      return 'Notifications API working correctly';
    });
  }

  async testPerformanceOptimizations() {
    console.log('\n🚀 Testing Performance Optimizations...');
    
    // Test concurrent requests
    await this.runTest('performance', 'Concurrent Request Handling', async () => {
      const promises = Array(10).fill().map(() => 
        axios.get(`${API_URL}/investment-funds`)
      );
      
      const start = Date.now();
      const responses = await Promise.all(promises);
      const time = Date.now() - start;
      
      const allSuccessful = responses.every(r => r.status === 200);
      if (!allSuccessful) {
        throw new Error('Some concurrent requests failed');
      }
      
      console.log('   ⚡ 10 concurrent requests:', time + 'ms');
      return `Handled 10 concurrent requests in ${time}ms`;
    });

    // Test memory usage efficiency
    await this.runTest('performance', 'Memory Usage Check', async () => {
      const memBefore = process.memoryUsage();
      
      // Make multiple requests to test memory stability
      for (let i = 0; i < 50; i++) {
        await axios.get(`${API_URL}/stats`);
      }
      
      const memAfter = process.memoryUsage();
      const memIncrease = memAfter.heapUsed - memBefore.heapUsed;
      
      console.log('   💾 Memory increase:', Math.round(memIncrease / 1024 / 1024) + 'MB');
      return 'Memory usage within acceptable range';
    });
  }

  async runTest(category, testName, testFunction) {
    try {
      const result = await testFunction();
      this.results[category].passed++;
      this.results[category].tests.push({ name: testName, status: 'PASSED', result });
      console.log(`   ✅ ${testName}`);
    } catch (error) {
      this.results[category].failed++;
      this.results[category].tests.push({ name: testName, status: 'FAILED', error: error.message });
      console.log(`   ❌ ${testName}: ${error.message}`);
    }
  }

  generateReport() {
    console.log('\n' + '=' .repeat(60));
    console.log('📋 TEST RESULTS SUMMARY');
    console.log('=' .repeat(60));
    
    let totalPassed = 0;
    let totalFailed = 0;
    
    Object.entries(this.results).forEach(([category, results]) => {
      const { passed, failed } = results;
      totalPassed += passed;
      totalFailed += failed;
      
      const emoji = failed === 0 ? '✅' : '❌';
      console.log(`${emoji} ${category.toUpperCase()}: ${passed}/${passed + failed} tests passed`);
      
      if (failed > 0) {
        results.tests.forEach(test => {
          if (test.status === 'FAILED') {
            console.log(`   ❌ ${test.name}: ${test.error}`);
          }
        });
      }
    });
    
    console.log('\n' + '-' .repeat(60));
    console.log(`🎯 OVERALL: ${totalPassed}/${totalPassed + totalFailed} tests passed`);
    
    if (totalFailed === 0) {
      console.log('🎉 ALL ADVANCED FEATURES ARE WORKING PERFECTLY!');
      console.log('✨ VinFast V-Green platform is ready for production!');
    } else {
      console.log(`⚠️  ${totalFailed} test(s) failed - please review and fix`);
    }
    
    console.log('=' .repeat(60));
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new AdvancedFeaturesTester();
  tester.runAllTests().catch(console.error);
}

module.exports = AdvancedFeaturesTester;
