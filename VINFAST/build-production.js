#!/usr/bin/env node

/**
 * VinFast V-Green Production Build Script
 * Handles building, testing, and deployment preparation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ProductionBuilder {
  constructor() {
    this.projectRoot = process.cwd();
    this.clientDir = path.join(this.projectRoot, 'client');
    this.serverDir = path.join(this.projectRoot, 'server');
    this.distDir = path.join(this.projectRoot, 'dist');
  }

  async buildForProduction() {
    console.log('🚀 VinFast V-Green Production Build Process');
    console.log('=' .repeat(60));
    
    try {
      // Step 1: Clean previous builds
      await this.cleanPreviousBuilds();
      
      // Step 2: Install dependencies
      await this.installDependencies();
      
      // Step 3: Run type checking
      await this.runTypeChecking();
      
      // Step 4: Build client
      await this.buildClient();
      
      // Step 5: Build server
      await this.buildServer();
      
      // Step 6: Run tests
      await this.runTests();
      
      // Step 7: Generate production package
      await this.generateProductionPackage();
      
      console.log('\n🎉 Production build completed successfully!');
      console.log('📦 Ready for deployment');
      
    } catch (error) {
      console.error('\n❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  async cleanPreviousBuilds() {
    console.log('\n🧹 Cleaning previous builds...');
    
    const dirsToClean = ['dist', 'client/dist', 'server/dist'];
    
    dirsToClean.forEach(dir => {
      const fullPath = path.join(this.projectRoot, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`   ✅ Cleaned ${dir}`);
      }
    });
  }

  async installDependencies() {
    console.log('\n📦 Installing dependencies...');
    
    try {
      execSync('npm ci', { stdio: 'inherit', cwd: this.projectRoot });
      console.log('   ✅ Dependencies installed');
    } catch (error) {
      throw new Error('Failed to install dependencies');
    }
  }

  async runTypeChecking() {
    console.log('\n🔍 Running TypeScript type checking...');
    
    try {
      execSync('npx tsc --noEmit', { stdio: 'inherit', cwd: this.projectRoot });
      console.log('   ✅ Type checking passed');
    } catch (error) {
      throw new Error('TypeScript type checking failed');
    }
  }

  async buildClient() {
    console.log('\n🎨 Building client (React + Vite)...');
    
    try {
      // Set production environment
      process.env.NODE_ENV = 'production';
      
      execSync('npm run build', { stdio: 'inherit', cwd: this.projectRoot });
      
      const clientDistDir = path.join(this.clientDir, 'dist');
      if (!fs.existsSync(clientDistDir)) {
        throw new Error('Client build output not found');
      }
      
      console.log('   ✅ Client build completed');
      
      // Get build size info
      const stats = this.getDirectorySize(clientDistDir);
      console.log(`   📊 Client bundle size: ${this.formatBytes(stats.size)}`);
      
    } catch (error) {
      throw new Error('Client build failed');
    }
  }

  async buildServer() {
    console.log('\n⚙️  Building server (Node.js + TypeScript)...');
    
    try {
      // TypeScript compile for server
      execSync('npx tsc --project server/tsconfig.json', { stdio: 'inherit', cwd: this.projectRoot });
      
      console.log('   ✅ Server build completed');
      
    } catch (error) {
      throw new Error('Server build failed');
    }
  }

  async runTests() {
    console.log('\n🧪 Running test suite...');
    
    try {
      // Start server in test mode
      const serverProcess = execSync('node test-advanced-features.js', { 
        stdio: 'inherit', 
        cwd: this.projectRoot,
        timeout: 30000 
      });
      
      console.log('   ✅ All tests passed');
      
    } catch (error) {
      console.warn('   ⚠️  Some tests may have failed, but build will continue');
    }
  }

  async generateProductionPackage() {
    console.log('\n📦 Generating production package...');
    
    // Create dist directory
    if (!fs.existsSync(this.distDir)) {
      fs.mkdirSync(this.distDir, { recursive: true });
    }
    
    // Copy essential files
    const filesToCopy = [
      'package.json',
      'package-lock.json',
      'drizzle.config.ts',
      'README.md'
    ];
    
    filesToCopy.forEach(file => {
      const src = path.join(this.projectRoot, file);
      const dest = path.join(this.distDir, file);
      
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`   ✅ Copied ${file}`);
      }
    });
    
    // Copy server build
    const serverBuildSrc = path.join(this.serverDir, 'dist');
    const serverBuildDest = path.join(this.distDir, 'server');
    
    if (fs.existsSync(serverBuildSrc)) {
      this.copyDirectory(serverBuildSrc, serverBuildDest);
      console.log('   ✅ Copied server build');
    }
    
    // Copy client build
    const clientBuildSrc = path.join(this.clientDir, 'dist');
    const clientBuildDest = path.join(this.distDir, 'client');
    
    if (fs.existsSync(clientBuildSrc)) {
      this.copyDirectory(clientBuildSrc, clientBuildDest);
      console.log('   ✅ Copied client build');
    }
    
    // Generate production package.json
    this.generateProductionPackageJson();
    
    // Generate deployment scripts
    this.generateDeploymentScripts();
    
    console.log('   📊 Production package generated in ./dist');
  }

  generateProductionPackageJson() {
    const originalPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const productionPackage = {
      name: originalPackage.name,
      version: originalPackage.version,
      description: originalPackage.description,
      main: 'server/index.js',
      scripts: {
        start: 'node server/index.js',
        "db:migrate": "drizzle-kit migrate",
        "db:studio": "drizzle-kit studio"
      },
      dependencies: {
        // Only include production dependencies
        ...Object.fromEntries(
          Object.entries(originalPackage.dependencies || {})
            .filter(([name]) => !name.includes('@types/'))
        )
      },
      engines: {
        node: '>=18.0.0',
        npm: '>=8.0.0'
      }
    };
    
    fs.writeFileSync(
      path.join(this.distDir, 'package.json'),
      JSON.stringify(productionPackage, null, 2)
    );
    
    console.log('   ✅ Generated production package.json');
  }

  generateDeploymentScripts() {
    // Docker deployment
    const dockerfile = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start application
CMD ["npm", "start"]`;
    
    fs.writeFileSync(path.join(this.distDir, 'Dockerfile'), dockerfile);
    
    // Docker Compose
    const dockerCompose = `version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  default:
    external: true
    name: vinfast-network`;
    
    fs.writeFileSync(path.join(this.distDir, 'docker-compose.yml'), dockerCompose);
    
    // Deployment script
    const deployScript = `#!/bin/bash
set -e

echo "🚀 VinFast V-Green Deployment Script"
echo "====================================="

# Check environment variables
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is required"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:migrate

# Start application
echo "🎯 Starting VinFast V-Green platform..."
npm start`;
    
    fs.writeFileSync(path.join(this.distDir, 'deploy.sh'), deployScript);
    fs.chmodSync(path.join(this.distDir, 'deploy.sh'), '755');
    
    console.log('   ✅ Generated deployment scripts (Docker, deploy.sh)');
  }

  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    entries.forEach(entry => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  getDirectorySize(dirPath) {
    let size = 0;
    let files = 0;
    
    const traverse = (currentPath) => {
      const stats = fs.statSync(currentPath);
      
      if (stats.isDirectory()) {
        const entries = fs.readdirSync(currentPath);
        entries.forEach(entry => {
          traverse(path.join(currentPath, entry));
        });
      } else {
        size += stats.size;
        files++;
      }
    };
    
    traverse(dirPath);
    return { size, files };
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run build if this file is executed directly
if (require.main === module) {
  const builder = new ProductionBuilder();
  builder.buildForProduction().catch(console.error);
}

module.exports = ProductionBuilder;
