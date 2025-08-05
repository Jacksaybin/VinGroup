export default function News() {
  const newsArticles = [
    {
      id: 1,
      title: "VinFast mở rộng mạng lưới trạm sạc tại Việt Nam",
      excerpt: "VinFast tiếp tục đầu tư mạnh vào hạ tầng sạc điện với kế hoạch xây dựng thêm 3,000 trạm sạc mới trong năm 2025.",
      content: "VinFast vừa công bố kế hoạch đầu tư 2 tỷ USD để mở rộng mạng lưới trạm sạc điện tại Việt Nam và các thị trường quốc tế. Theo kế hoạch, công ty sẽ xây dựng thêm 3,000 trạm sạc mới trong năm 2025, nâng tổng số trạm sạc lên 15,000 điểm. Đây là một phần trong chiến lược phát triển hệ sinh thái xe điện toàn diện của VinFast.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      author: "Nguyễn Minh Hạnh",
      date: "2025-01-28",
      category: "Đầu tư",
      readTime: "5 phút"
    },
    {
      id: 2,
      title: "Lợi nhuận từ đầu tư trạm sạc VinFast tăng 45% trong Q4/2024",
      excerpt: "Các nhà đầu tư vào hệ thống trạm sạc VinFast đã ghi nhận mức lợi nhuận ấn tượng trong quý cuối năm 2024.",
      content: "Báo cáo tài chính Q4/2024 cho thấy lợi nhuận từ các quỹ đầu tư trạm sạc VinFast đã tăng 45% so với cùng kỳ năm trước. Điều này là kết quả của việc gia tăng nhu cầu sử dụng xe điện và mở rộng mạng lưới trạm sạc. Các quỹ VIC Premium và VIC Ultimate dẫn đầu về hiệu suất với lợi nhuận trung bình 2.1% mỗi ngày.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      author: "Trần Văn Thành",
      date: "2025-01-27",
      category: "Tài chính",
      readTime: "4 phút"
    },
    {
      id: 3,
      title: "VinFast ký thỏa thuận hợp tác với 500 đại lý mới",
      excerpt: "Mở rộng mạng lưới phân phối và dịch vụ hậu mãi cho khách hàng xe điện VinFast.",
      content: "VinFast đã ký kết thỏa thuận hợp tác với 500 đại lý mới trên toàn quốc, nâng tổng số điểm bán hàng và dịch vụ lên 2,000 showroom. Các đại lý mới sẽ tập trung vào việc cung cấp dịch vụ sạc điện, bảo dưỡng và hỗ trợ khách hàng. Điều này tạo ra cơ hội đầu tư hấp dẫn cho các quỹ liên quan đến hệ sinh thái VinFast.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      author: "Lê Thị Mai",
      date: "2025-01-26",
      category: "Kinh doanh",
      readTime: "3 phút"
    },
    {
      id: 4,
      title: "Công nghệ sạc nhanh V2G của VinFast đạt chứng nhận quốc tế",
      excerpt: "Teknologi sạc Vehicle-to-Grid (V2G) của VinFast nhận chứng nhận từ Hiệp hội Xe điện Quốc tế.",
      content: "VinFast vừa nhận được chứng nhận quốc tế cho công nghệ sạc Vehicle-to-Grid (V2G), cho phép xe điện không chỉ sạc pin mà còn có thể trả điện về lưới điện quốc gia. Công nghệ này mở ra tiềm năng kinh doanh mới cho các nhà đầu tư, với khả năng tạo thu nhập từ việc bán điện dư thừa từ pin xe điện.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      author: "Phạm Đức Anh",
      date: "2025-01-25",
      category: "Công nghệ",
      readTime: "6 phút"
    },
    {
      id: 5,
      title: "VGreen Platform ra mắt 3 quỹ đầu tư mới cho năm 2025",
      excerpt: "Ba quỹ đầu tư mới với mức lợi nhuận cao và thời gian đầu tư linh hoạt được bổ sung vào danh mục.",
      content: "VGreen Platform chính thức ra mắt 3 quỹ đầu tư mới: VIC Future Pro, VIC Sustainable Energy và VIC Smart Grid. Các quỹ này tập trung vào công nghệ sạc thông minh, năng lượng bền vững và lưới điện thông minh. Với mức lợi nhuận dự kiến từ 1.8% - 2.5% mỗi ngày, đây là cơ hội đầu tư hấp dẫn cho các nhà đầu tư quan tâm đến lĩnh vực công nghệ xanh.",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      author: "Nguyễn Thị Lan",
      date: "2025-01-24",
      category: "Sản phẩm",
      readTime: "4 phút"
    },
    {
      id: 6,
      title: "Xu hướng đầu tư xanh: Tại sao chọn trạm sạc điện?",
      excerpt: "Phân tích chi tiết về tiềm năng đầu tư vào hạ tầng sạc điện trong bối cảnh chuyển đổi năng lượng.",
      content: "Với cam kết của Việt Nam về trung hòa carbon vào năm 2050, đầu tư vào hạ tầng sạc điện trở thành xu hướng tất yếu. Theo nghiên cứu của McKinsey, thị trường xe điện Việt Nam sẽ tăng trưởng 300% trong 5 năm tới, tạo ra nhu cầu khổng lồ về trạm sạc. VGreen Platform cung cấp cơ hội tham gia vào làn sóng chuyển đổi này với các gói đầu tư đa dạng và hiệu suất cao.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      author: "Hoàng Việt Dũng",
      date: "2025-01-23",
      category: "Phân tích",
      readTime: "8 phút"
    }
  ];

  const categories = ["Tất cả", "Đầu tư", "Tài chính", "Công nghệ", "Kinh doanh", "Sản phẩm", "Phân tích"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-vgreen-primary to-vgreen-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-sans mb-4">Tin Tức VGreen</h1>
            <p className="text-xl text-gray-200 font-sans">Cập nhật thông tin mới nhất về VinFast và thị trường xe điện</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}


        {/* Featured Article */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={newsArticles[0].image} 
                  alt={newsArticles[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-vgreen-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {newsArticles[0].category}
                  </span>
                  <span className="ml-4 text-gray-500 text-sm">Nổi bật</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{newsArticles[0].title}</h2>
                <p className="text-gray-600 mb-6">{newsArticles[0].content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-user mr-2"></i>
                    <span>{newsArticles[0].author}</span>
                    <i className="fas fa-calendar ml-4 mr-2"></i>
                    <span>{new Date(newsArticles[0].date).toLocaleDateString('vi-VN')}</span>
                    <i className="fas fa-clock ml-4 mr-2"></i>
                    <span>{newsArticles[0].readTime}</span>
                  </div>
                  <button className="bg-vgreen-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-vgreen-secondary transition-colors">
                    Đọc thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.slice(1).map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-vgreen-primary transition-colors cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-user mr-2"></i>
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock mr-2"></i>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('vi-VN')}
                  </span>
                  <button className="text-vgreen-primary font-semibold hover:text-vgreen-secondary transition-colors">
                    Đọc thêm →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-vgreen-primary to-success rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Đăng ký nhận tin</h3>
            <p className="text-gray-200 mb-6">Nhận thông tin mới nhất về VinFast và cơ hội đầu tư qua email</p>
            <div className="max-w-md mx-auto flex">
              <input 
                type="email" 
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-vgreen-primary px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
}