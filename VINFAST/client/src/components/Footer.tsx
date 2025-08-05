export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-vgreen-primary to-success rounded-lg flex items-center justify-center">
                <i className="fas fa-leaf text-white text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold">VGreen</h3>
                {/* Removed VinFast Investment Platform text */}
              </div>
            </div>
            <p className="text-gray-400 mb-6">Nền tảng đầu tư trạm sạc VinFast hàng đầu Việt Nam với công nghệ tiên tiến và lợi nhuận bền vững.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-vgreen-primary transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-vgreen-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-vgreen-primary transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">Liên Kết Nhanh</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Giới Thiệu</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Các Quỹ Đầu Tư</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tin Tức</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hỗ Trợ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên Hệ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6">Dịch Vụ</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Đầu Tư Trạm Sạc</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Quản Lý Portfolio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phân Tích Thị Trường</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tư Vấn Đầu Tư</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Báo Cáo Tài Chính</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-phone mr-3 text-vgreen-primary"></i>
                <span className="text-gray-400">1900 6868</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-3 text-vgreen-primary"></i>
                <span className="text-gray-400">support@vgreen.vn</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-3 text-vgreen-primary"></i>
                <span className="text-gray-400">123 Nguyễn Huệ, Q1, TP.HCM</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Nhận Tin Tức Mới</h5>
              <div className="flex">
                <input type="email" placeholder="Email của bạn" className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-vgreen-primary" />
                <button className="bg-vgreen-primary px-4 py-2 rounded-r-lg hover:bg-vgreen-secondary transition-colors">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 VGreen. Tất cả quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Điều Khoản Sử Dụng</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Chính Sách Bảo Mật</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
