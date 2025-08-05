export default function NewsSection() {
  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tin Tức & Cập Nhật</h2>
          <p className="text-xl text-gray-600">Cập nhật thông tin mới nhất về VinFast và ngành xe điện</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured News */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                   alt="VinFast VF7 Launch Event" className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-vgreen-primary text-white px-3 py-1 rounded-full text-sm font-medium">Tin Nổi Bật</span>
                  <span className="text-gray-500 text-sm ml-4">2 giờ trước</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">VinFast Mở Rộng Mạng Lưới Trạm Sạc Toàn Quốc</h3>
                <p className="text-gray-600 mb-6">VinFast công bố kế hoạch mở rộng hệ thống trạm sạc với 500 trạm mới trong năm 2025, tạo cơ hội đầu tư hấp dẫn cho nhà đầu tư...</p>
                <button className="text-vgreen-primary font-semibold hover:text-vgreen-secondary">Đọc thêm →</button>
              </div>
            </div>
          </div>

          {/* Side News */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-3">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">Thị Trường</span>
                <span className="text-gray-500 text-sm ml-3">4 giờ trước</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Xe Điện Việt Nam Tăng Trưởng 150%</h4>
              <p className="text-gray-600 text-sm">Thị trường xe điện Việt Nam ghi nhận mức tăng trưởng ấn tượng...</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-3">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">Đầu Tư</span>
                <span className="text-gray-500 text-sm ml-3">6 giờ trước</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Quỹ VIC09 Đạt Lợi Nhuận Kỷ Lục</h4>
              <p className="text-gray-600 text-sm">Quỹ đầu tư trạm sạc VIC09 đạt mức lợi nhuận cao nhất...</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-3">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">Công Nghệ</span>
                <span className="text-gray-500 text-sm ml-3">1 ngày trước</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Công Nghệ Sạc Nhanh Mới Của VinFast</h4>
              <p className="text-gray-600 text-sm">VinFast ra mắt công nghệ sạc siêu nhanh 350kW...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
