export default function AnalyticsSection() {
  return (
    <section id="analytics" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Phân Tích Đầu Tư Thông Minh</h2>
          <p className="text-xl text-gray-600">Theo dõi hiệu suất đầu tư với công cụ phân tích tiên tiến</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Portfolio Performance Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Hiệu Suất Portfolio</h3>
              <select className="bg-gray-100 rounded-lg px-4 py-2 text-sm">
                <option>7 ngày</option>
                <option>30 ngày</option>
                <option>3 tháng</option>
                <option>1 năm</option>
              </select>
            </div>
            
            {/* Simulated Chart Area */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-center space-x-2 p-4">
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-24"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-32"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-20"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-40"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-36"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-48"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-44"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-52"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-56"></div>
              <div className="w-8 bg-gradient-to-t from-vgreen-primary to-success rounded-t h-60"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">+12.5%</div>
                <div className="text-sm text-gray-600">Tăng trưởng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vgreen-primary">₫2.8M</div>
                <div className="text-sm text-gray-600">Lợi nhuận</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">8.7%</div>
                <div className="text-sm text-gray-600">ROI hàng năm</div>
              </div>
            </div>
          </div>

          {/* Investment Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Phân Bố Đầu Tư</h3>
            
            {/* Simulated Pie Chart */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-conic from-vgreen-primary via-success to-blue-500"></div>
              <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">₫125M</div>
                  <div className="text-sm text-gray-600">Tổng đầu tư</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-vgreen-primary rounded mr-3"></div>
                  <span className="text-gray-700">VIC09 - DC Charging</span>
                </div>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-success rounded mr-3"></div>
                  <span className="text-gray-700">VIC05 - Fast Charging</span>
                </div>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-gray-700">VinGroup Card</span>
                </div>
                <span className="font-semibold">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Admin Tools Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-users-cog text-blue-600 text-xl"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Quản Lý User</h4>
            <p className="text-gray-600 text-sm mb-4">Theo dõi và quản lý người dùng</p>
            <button className="text-blue-600 font-medium text-sm hover:text-blue-700">Xem chi tiết →</button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-chart-bar text-green-600 text-xl"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Báo Cáo Tài Chính</h4>
            <p className="text-gray-600 text-sm mb-4">Phân tích dữ liệu tài chính</p>
            <button className="text-green-600 font-medium text-sm hover:text-green-700">Xem chi tiết →</button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-bell text-purple-600 text-xl"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Hệ Thống Thông Báo</h4>
            <p className="text-gray-600 text-sm mb-4">Gửi thông báo và cảnh báo</p>
            <button className="text-purple-600 font-medium text-sm hover:text-purple-700">Xem chi tiết →</button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-cogs text-orange-600 text-xl"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Cài Đặt Hệ Thống</h4>
            <p className="text-gray-600 text-sm mb-4">Quản lý cấu hình platform</p>
            <button className="text-orange-600 font-medium text-sm hover:text-orange-700">Xem chi tiết →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
