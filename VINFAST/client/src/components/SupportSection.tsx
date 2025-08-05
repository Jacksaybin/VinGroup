export default function SupportSection() {
  return (
    <section id="support" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Hỗ Trợ Chuyên Nghiệp 24/7</h2>
            <p className="text-xl mb-8 text-gray-200">Đội ngũ chuyên gia VGreen luôn sẵn sàng hỗ trợ bạn trong hành trình đầu tư</p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-phone text-white text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold">Hotline 24/7</div>
                  <div className="text-gray-300">1900 6868 (miễn phí)</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-envelope text-white text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold">Email Hỗ Trợ</div>
                  <div className="text-gray-300">support@vgreen.vn</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-map-marker-alt text-white text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold">Văn Phòng Tại TP.HCM</div>
                  <div className="text-gray-300">123 Nguyễn Huệ, Q1, TP.HCM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Liên Hệ Ngay</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và Tên</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vgreen-primary" placeholder="Nhập họ tên của bạn" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vgreen-primary" placeholder="your@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số Điện Thoại</label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vgreen-primary" placeholder="0123 456 789" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội Dung</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vgreen-primary" placeholder="Mô tả vấn đề bạn cần hỗ trợ..."></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-vgreen-primary to-success text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                <i className="fas fa-paper-plane mr-2"></i>
                Gửi Yêu Cầu
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
