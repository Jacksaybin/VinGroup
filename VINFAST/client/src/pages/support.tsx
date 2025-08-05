import { useState } from "react";

export default function Support() {
  const [activeTab, setActiveTab] = useState("faq");
  const [selectedCategory, setSelectedCategory] = useState("general");

  const faqCategories = [
    { id: "general", name: "Câu hỏi chung", icon: "fas fa-question-circle" },
    { id: "investment", name: "Đầu tư", icon: "fas fa-chart-line" },
    { id: "account", name: "Tài khoản", icon: "fas fa-user" },
    { id: "payment", name: "Thanh toán", icon: "fas fa-credit-card" },
    { id: "technical", name: "Kỹ thuật", icon: "fas fa-cog" }
  ];

  const faqs = {
    general: [
      {
        question: "VGreen Platform là gì?",
        answer: "VGreen Platform là nền tảng đầu tư vào hệ sinh thái trạm sạc VinFast, cho phép các nhà đầu tư tham gia vào việc phát triển hạ tầng sạc xe điện tại Việt Nam với lợi nhuận hấp dẫn từ 0.2% - 2.2% mỗi ngày."
      },
      {
        question: "Tại sao nên đầu tư vào trạm sạc VinFast?",
        answer: "Với sự phát triển mạnh mẽ của xe điện tại Việt Nam và cam kết của Chính phủ về trung hòa carbon, nhu cầu về trạm sạc ngày càng tăng. VinFast là thương hiệu xe điện hàng đầu tại Việt Nam, tạo ra cơ hội đầu tư ổn định và sinh lời cao."
      },
      {
        question: "Platform có an toàn không?",
        answer: "VGreen Platform được bảo mật với công nghệ blockchain và tuân thủ các quy định của Ngân hàng Nhà nước Việt Nam. Tất cả giao dịch đều được mã hóa và bảo vệ bởi hệ thống bảo mật nhiều lớp."
      }
    ],
    investment: [
      {
        question: "Số tiền đầu tư tối thiểu là bao nhiêu?",
        answer: "Số tiền đầu tư tối thiểu phụ thuộc vào từng quỹ, dao động từ 1 triệu VNĐ đến 50 triệu VNĐ. Bạn có thể xem chi tiết tại trang danh sách các quỹ đầu tư."
      },
      {
        question: "Làm thế nào để rút tiền?",
        answer: "Bạn có thể rút tiền sau khi kết thúc chu kỳ đầu tư hoặc sử dụng tính năng rút sớm (có thể phát sinh phí). Tiền sẽ được chuyển về tài khoản ngân hàng đã liên kết trong vòng 1-3 ngày làm việc."
      },
      {
        question: "Lợi nhuận được tính như thế nào?",
        answer: "Lợi nhuận được tính hàng ngày dựa trên số tiền đầu tư và tỷ lệ lợi nhuận của từng quỹ. Ví dụ: đầu tư 10 triệu VNĐ với lợi nhuận 1%/ngày sẽ nhận được 100,000 VNĐ mỗi ngày."
      }
    ],
    account: [
      {
        question: "Làm thế nào để tạo tài khoản?",
        answer: "Bạn có thể đăng ký tài khoản miễn phí bằng email hoặc số điện thoại. Sau đó xác thực danh tính bằng CCCD/CMND và liên kết tài khoản ngân hàng để bắt đầu đầu tư."
      },
      {
        question: "Tôi quên mật khẩu, phải làm sao?",
        answer: "Sử dụng tính năng 'Quên mật khẩu' trên trang đăng nhập. Chúng tôi sẽ gửi link đặt lại mật khẩu qua email hoặc SMS đã đăng ký."
      },
      {
        question: "Làm thế nào để bảo mật tài khoản?",
        answer: "Kích hoạt xác thực 2 lớp (2FA), sử dụng mật khẩu mạnh, không chia sẻ thông tin đăng nhập và thường xuyên cập nhật thông tin bảo mật."
      }
    ],
    payment: [
      {
        question: "Những phương thức thanh toán nào được hỗ trợ?",
        answer: "Chúng tôi hỗ trợ chuyển khoản ngân hàng, thẻ ATM và thẻ tín dụng của các ngân hàng lớn tại Việt Nam."
      },
      {
        question: "Có phí giao dịch không?",
        answer: "Phí nạp tiền: 0% cho chuyển khoản ngân hàng. Phí rút tiền: 0.5% cho rút thường, 2% cho rút nhanh (trong ngày)."
      },
      {
        question: "Thời gian xử lý giao dịch là bao lâu?",
        answer: "Nạp tiền: 5-30 phút cho chuyển khoản ngân hàng. Rút tiền: 1-3 ngày làm việc cho rút thường, trong ngày cho rút nhanh."
      }
    ],
    technical: [
      {
        question: "Tại sao tôi không thể đăng nhập?",
        answer: "Kiểm tra kết nối internet, xóa cache trình duyệt, hoặc thử trình duyệt khác. Nếu vẫn không được, liên hệ bộ phận hỗ trợ."
      },
      {
        question: "Ứng dụng có hoạt động trên điện thoại không?",
        answer: "VGreen Platform được tối ưu cho mobile, hoạt động mượt mà trên tất cả trình duyệt di động. Chúng tôi cũng đang phát triển ứng dụng mobile riêng."
      },
      {
        question: "Làm sao để cập nhật thông tin cá nhân?",
        answer: "Vào phần 'Hồ sơ' trong tài khoản của bạn để cập nhật thông tin. Một số thông tin quan trọng có thể yêu cầu xác thực bổ sung."
      }
    ]
  };

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "normal"
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.");
    setContactForm({ name: "", email: "", subject: "", message: "", priority: "normal" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-vgreen-primary to-vgreen-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-sans mb-4">Trung Tâm Hỗ Trợ</h1>
            <p className="text-xl text-gray-200 font-sans">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comments text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">CSKH</h3>
            <p className="text-gray-600 mb-4">Trò chuyện trực tiếp với chuyên viên hỗ trợ</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Bắt đầu chat
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope text-purple-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Gửi email để được tư vấn chi tiết</p>
            <a 
              href="mailto:support@vgreen.vn" 
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
            >
              support@vgreen.vn
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("faq")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "faq"
                    ? "border-b-2 border-vgreen-primary text-vgreen-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-question-circle mr-2"></i>
                Câu hỏi thường gặp
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "contact"
                    ? "border-b-2 border-vgreen-primary text-vgreen-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Liên hệ
              </button>
              <button
                onClick={() => setActiveTab("guide")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "guide"
                    ? "border-b-2 border-vgreen-primary text-vgreen-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-book mr-2"></i>
                Hướng dẫn
              </button>
            </div>
          </div>

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Category Sidebar */}
                <div className="lg:w-1/4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục</h3>
                  <div className="space-y-2">
                    {faqCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.id
                            ? "bg-vgreen-primary text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <i className={`${category.icon} mr-3`}></i>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ Content */}
                <div className="lg:w-3/4">
                  <div className="space-y-4">
                    {faqs[selectedCategory as keyof typeof faqs].map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <div className="p-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">
                            <i className="fas fa-question text-vgreen-primary mr-2"></i>
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="p-8">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Liên hệ với chúng tôi</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                        placeholder="Nhập chủ đề"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ ưu tiên</label>
                      <select
                        value={contactForm.priority}
                        onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                      >
                        <option value="low">Thấp</option>
                        <option value="normal">Bình thường</option>
                        <option value="high">Cao</option>
                        <option value="urgent">Khẩn cấp</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                    <textarea
                      required
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                      placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-vgreen-primary to-success text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Gửi tin nhắn
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Guide Tab */}
          {activeTab === "guide" && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Hướng dẫn sử dụng VGreen Platform</h3>
                
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      <i className="fas fa-user-plus text-vgreen-primary mr-2"></i>
                      Bước 1: Đăng ký tài khoản
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Click vào nút "Đăng ký" trên trang chủ</li>
                      <li>Điền thông tin cá nhân và email</li>
                      <li>Xác nhận email qua link được gửi</li>
                      <li>Hoàn tất xác thực danh tính bằng CCCD/CMND</li>
                    </ol>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      <i className="fas fa-credit-card text-vgreen-primary mr-2"></i>
                      Bước 2: Nạp tiền vào tài khoản
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Vào phần "Nạp tiền" trong tài khoản</li>
                      <li>Chọn phương thức thanh toán phù hợp</li>
                      <li>Nhập số tiền cần nạp</li>
                      <li>Thực hiện thanh toán theo hướng dẫn</li>
                    </ol>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      <i className="fas fa-chart-line text-vgreen-primary mr-2"></i>
                      Bước 3: Chọn quỹ đầu tư
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Duyệt danh sách 14 quỹ đầu tư</li>
                      <li>Xem chi tiết từng quỹ và so sánh</li>
                      <li>Chọn quỹ phù hợp với mục tiêu đầu tư</li>
                      <li>Nhập số tiền muốn đầu tư và xác nhận</li>
                    </ol>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      <i className="fas fa-money-bill-wave text-vgreen-primary mr-2"></i>
                      Bước 4: Theo dõi và rút tiền
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Theo dõi lợi nhuận hàng ngày trong dashboard</li>
                      <li>Xem báo cáo chi tiết về hiệu suất đầu tư</li>
                      <li>Rút tiền khi kết thúc chu kỳ hoặc rút sớm</li>
                      <li>Tiền sẽ được chuyển về tài khoản ngân hàng</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
}