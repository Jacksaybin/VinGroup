export default function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="grid grid-cols-4 h-16">
        <a href="/" className="flex flex-col items-center justify-center text-vgreen-primary font-sans">
          <i className="fas fa-home text-lg mb-1"></i>
          <span className="text-xs font-medium">Trang Chủ</span>
        </a>
        <a href="/investments" className="flex flex-col items-center justify-center text-gray-500 hover:text-vgreen-primary transition-colors font-sans">
          <i className="fas fa-chart-line text-lg mb-1"></i>
          <span className="text-xs font-medium">Đầu Tư</span>
        </a>
        <a href="/news" className="flex flex-col items-center justify-center text-gray-500 hover:text-vgreen-primary transition-colors font-sans">
          <i className="fas fa-newspaper text-lg mb-1"></i>
          <span className="text-xs font-medium">Tin Tức</span>
        </a>
        <div className="relative group">
          <a href="/profile" className="flex flex-col items-center justify-center text-gray-500 hover:text-vgreen-primary transition-colors font-sans">
            <i className="fas fa-user text-lg mb-1"></i>
            <span className="text-xs font-medium">Hồ Sơ</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
