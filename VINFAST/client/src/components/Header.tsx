export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          {/* Logo section removed as requested */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#dashboard" className="text-gray-700 hover:text-banana-green-500 transition-colors">Dashboard</a>
            <a href="#investments" className="text-gray-700 hover:text-banana-green-500 transition-colors">Đầu Tư</a>
            <a href="#analytics" className="text-gray-700 hover:text-banana-green-500 transition-colors">Phân Tích</a>
            <a href="#news" className="text-gray-700 hover:text-banana-green-500 transition-colors">Tin Tức</a>
            <a href="#support" className="text-gray-700 hover:text-banana-green-500 transition-colors">Hỗ Trợ</a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-banana-green-500">
              <i className="fas fa-bell"></i>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-vinfast-red text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-banana-green-500 to-banana-green-400 rounded-full flex items-center justify-center shadow-md">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
              <span className="hidden sm:block text-sm font-medium">Nguyễn Văn An</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
