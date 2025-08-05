# VGreen - Electric Vehicle Charging Station Investment Platform

## Overview

VGreen is a comprehensive investment platform focused on electric vehicle charging stations in Vietnam, specifically branded around VinFast. The application enables users to browse investment opportunities, manage their portfolios, track performance analytics, read news updates, and access customer support. The platform is designed with a mobile-first approach and features a professional, modern UI with VinFast branding integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based architecture:
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **Component Library**: Shadcn/ui components for consistent design

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Structure**: RESTful endpoints with `/api` prefix

## Key Components

### UI Components Structure
The application follows a component-based architecture with:
- **Layout Components**: Header, Footer, MobileNavigation for consistent navigation
- **Section Components**: HeroSection, InvestmentCards, AnalyticsSection, NewsSection, SupportSection
- **Interactive Elements**: LiveChat widget for customer support
- **UI Library**: Complete Shadcn/ui component collection (buttons, forms, dialogs, etc.)

### Investment System
- **Investment Cards**: 14 different VinFast charging station investment funds
- **Portfolio Management**: User investment tracking and analytics
- **Performance Metrics**: Real-time ROI calculations and growth tracking
- **Visual Branding**: Authentic VinFast imagery and branding integration

### Mobile-First Design
- **Responsive Layout**: Tailwind CSS breakpoints for all screen sizes
- **Bottom Navigation**: Mobile-specific navigation with Vietnamese labels
- **Touch Optimization**: Minimum 44px touch targets for mobile usability
- **Performance**: Optimized images and smooth scrolling for mobile devices

## Data Flow

### Database Schema
The application uses 10 main database tables:
- **users**: User account information and authentication
- **admin_roles**: Administrative role management
- **transactions**: Investment transactions and financial records
- **support_tickets**: Customer support case management
- **user_investments**: Active user investment portfolio tracking
- **investment_funds**: Available investment opportunities
- **sessions**: User session management
- **notifications**: User notification system
- **user_accounts**: Extended user account details
- **system_logs**: Application logging and audit trails

### API Integration
- **Authentication**: User authentication and session management
- **Investment Data**: RESTful endpoints for investment fund information
- **User Portfolio**: Personal investment and transaction history
- **Real-time Updates**: Live data for investment performance

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/react-***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form state management and validation

### Development Tools
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production
- **Drizzle-kit**: Database migration and schema management

### Platform Integration
- **Replit**: Development environment with runtime error handling
- **Connect-pg-simple**: PostgreSQL session store for Express
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter and Plus Jakarta Sans typography

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR (Hot Module Replacement)
- **TypeScript**: Real-time type checking and compilation
- **Database**: Drizzle push for schema synchronization

### Production Build
- **Frontend**: Vite build with optimized asset bundling
- **Backend**: ESBuild compilation to Node.js compatible modules
- **Static Assets**: Served from `dist/public` directory
- **Server**: Express server running compiled TypeScript

### Database Management
- **Migrations**: Drizzle-kit for database schema versioning
- **Connection**: Environment variable-based database URL configuration
- **Session Storage**: PostgreSQL-backed session management

### Platform Features
- **Mobile Optimization**: Comprehensive mobile-first responsive design
- **Performance**: Optimized images, lazy loading, and efficient caching
- **Accessibility**: WCAG-compliant UI components with proper ARIA labels
- **Internationalization**: Vietnamese language interface with proper localization

## Recent Updates - January 28, 2025

### Investment System Enhancement
- **Investment Modal**: Complete investment interface with fund selection, payment methods (balance, bank transfer, e-wallets), and real-time profit calculations
- **Investment Integration**: Connected investment functionality to all fund display components (homepage cards, investments page, fund details)
- **Payment Options**: Support for account balance, bank transfer, MoMo, ZaloPay with different fee structures

### News & Content Management
- **News Section**: Full news page with 6 categorized articles covering VinFast developments, market analysis, and investment insights
- **Content Categories**: Investment, Finance, Technology, Business, Product, Analysis categories with filtering
- **Newsletter Subscription**: Email subscription system for investment updates

### Customer Support System
- **Multi-channel Support**: Live chat, hotline (1900 588 822), and email support integration
- **FAQ System**: Comprehensive FAQ with 5 categories (General, Investment, Account, Payment, Technical) and detailed answers
- **Contact Forms**: Priority-based contact system with immediate response capability
- **User Guides**: Step-by-step investment process documentation

### User Profile & Financial Management
- **Complete Profile System**: User overview with KYC verification status and investment statistics
- **Deposit/Withdrawal Interface**: Multiple payment methods with fee transparency and processing times
- **Investment Tracking**: Active investment portfolio with performance metrics and ROI calculations
- **Transaction History**: Complete financial transaction log with categorization
- **Account Settings**: Security features including 2FA setup and notification preferences

### Navigation & Routing
- **Complete Site Navigation**: All 5 main sections (Home, Investments, News, Profile, Support) fully functional
- **Mobile-First Design**: Bottom navigation for mobile with responsive header for desktop
- **Breadcrumb System**: Context-aware navigation breadcrumbs across all pages