import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    {
      path: '/',
      label: 'Trang Chủ',
      icon: 'fas fa-home',
      description: 'Trang chính'
    },
    {
      path: '/investments',
      label: 'Đầu Tư',
      icon: 'fas fa-chart-line',
      description: '14 quỹ đầu tư'
    },
    {
      path: '/news',
      label: 'Tin Tức',
      icon: 'fas fa-newspaper',
      description: 'Cập nhật mới nhất'
    },
    {
      path: '/support',
      label: 'Hỗ Trợ',
      icon: 'fas fa-headset',
      description: 'Trợ giúp khách hàng'
    },
    {
      path: '/profile',
      label: 'Hồ Sơ',
      icon: 'fas fa-user',
      description: 'Thông tin cá nhân'
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo on the far left */}
          <div className="flex items-center" style={{ minWidth: 180, justifyContent: 'flex-start' }}>
            <Link href="/">
              <img src="/assets/vinfast-vgreen-logo.png" alt="VGreen Logo" style={{ height: 56, width: 'auto', objectFit: 'contain' }} />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-sm border border-gray-200 bg-white transition-all duration-200 ${
                  location === item.path
                    ? "bg-banana-green-50 text-banana-green-800 border-banana-green-400"
                    : "text-black hover:bg-banana-green-50 hover:text-banana-green-700"
                }`}
                style={{ minWidth: 110, justifyContent: 'center' }}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="relative p-2 text-gray-600 border-2 border-banana-green-500 rounded-lg shadow hover:bg-banana-green-500 hover:text-white hover:border-yellow-400 transition-all duration-300">
                  <i className="fas fa-bell"></i>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-vinfast-red text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-banana-green-500 to-banana-green-400 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-white text-sm"></i>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</div>
                    </div>
                    <i className="fas fa-chevron-down text-xs text-gray-400"></i>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <i className="fas fa-user mr-3"></i>
                          Thông tin cá nhân
                        </Link>
                        <Link href="/investments" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <i className="fas fa-chart-line mr-3"></i>
                          Đầu tư của tôi
                        </Link>
                        {user?.role === 'admin' && (
                          <Link href="/admin-backend" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i className="fas fa-cogs mr-3"></i>
                            Admin Backend
                          </Link>
                        )}
                        <hr className="my-1" />
                        <button 
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <i className="fas fa-sign-out-alt mr-3"></i>
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link href="/auth" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center transition-colors ${
                location === item.path
                  ? "text-vgreen-primary"
                  : "text-gray-500 hover:text-vgreen-primary"
              }`}
            >
              {item.path === '/' ? (
                <>
                  <img src="/assets/vinfast-vgreen-logo.png" alt="VGreen Logo" style={{ height: 20, width: 20, objectFit: 'contain', marginBottom: 2 }} />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              ) : (
                <>
                  <i className={`${item.icon} text-lg mb-1`}></i>
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
                {/* Logo and brand name removed as requested */}
            </Link>
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <button className="relative p-2 text-gray-600 border-2 border-blue-main rounded-lg shadow hover:bg-blue-main hover:text-white hover:border-yellow-400 transition-all duration-300">
                    <i className="fas fa-bell"></i>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-vinfast-red text-white text-xs rounded-full flex items-center justify-center">3</span>
                  </button>
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="relative w-8 h-8 bg-gradient-to-r from-vgreen-primary to-success rounded-full flex items-center justify-center"
                  >
                    <i className="fas fa-user text-white text-sm"></i>
                  </button>
                  
                  {/* Mobile User Menu */}
                  {showUserMenu && (
                    <div className="absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="text-sm font-medium">{user?.name}</div>
                          <div className="text-xs text-gray-500">{user?.email}</div>
                        </div>
                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <i className="fas fa-user mr-3"></i>
                          Hồ sơ
                        </Link>
                        <button 
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <i className="fas fa-sign-out-alt mr-3"></i>
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/auth" className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            {location !== "/" && (
              <>
                <Link href="/" className="text-gray-500 hover:text-vgreen-primary">
                  <i className="fas fa-home mr-1"></i>
                  Trang Chủ
                </Link>
                <i className="fas fa-chevron-right text-gray-300"></i>
                <span className="text-vgreen-primary font-medium">
                  {navItems.find(item => item.path === location)?.label || "Trang Hiện Tại"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}