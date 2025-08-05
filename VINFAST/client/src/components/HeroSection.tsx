import { useRef, useEffect } from "react";
import LeafIcon from "./icons/LeafIcon";
import SpeakerIcon from "./icons/SpeakerIcon";
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Cắt bỏ 15 giây đầu tiên
      video.currentTime = 15;
      
      // Khi video kết thúc, quay lại giây thứ 15 thay vì giây 0
      const handleEnded = () => {
        video.currentTime = 15;
        video.play();
      };
      
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <section id="dashboard" className="relative text-banana-green-800 overflow-hidden">



      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-title text-title-lg leading-tight font-sans">
          Quỹ Đầu Tư VinFast - V-Green
        </h1>
      </div>
      <div className="mb-8 p-6 bg-white bg-opacity-95 rounded-soft-lg border-2 border-banana-green-500 shadow-lg animate-fade-in animate-slide-up transition-all duration-500">
        <p className="text-body text-body-lg leading-relaxed mb-6">
          Nhằm khuyến khích người dân tham gia tích lũy và đầu tư dài hạn, góp phần gia tăng giá trị tài sản và xây dựng nền tài chính bền vững. VinFast và VGreen cung cấp hơn 50 sản phẩm quỹ đa dạng, phục vụ nhu cầu đầu tư của nhiều đối tượng khách hàng trên toàn quốc, với hơn 300.000 người dùng tin tưởng và tổng giá trị tài sản quản lý đạt trên 4.000 tỷ đồng.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-6">
          <div>
            <div className="text-title-sm text-title font-bold">50+</div>
            <div className="text-body text-body-md">Sản phẩm quỹ</div>
          </div>
          <div>
            <div className="text-title-sm text-title font-bold">300.000+</div>
            <div className="text-body text-body-md">Người dùng</div>
          </div>
          <div>
            <div className="text-title-sm text-title font-bold">4.000+ tỷ đồng</div>
            <div className="text-body text-body-md">Giá trị tài sản quản lý</div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-banana-green-500 text-white rounded-soft font-semibold shadow hover:bg-banana-green-600 transition-all duration-300">
            Xem danh mục quỹ đầu tư
          </button>
        </div>
      </div>
            
            {/* Enhanced Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Đã xóa thống kê Trạm Sạc theo yêu cầu */}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Button phức tạp đã được xóa */}
            </div>
          </div>

          {/* Enhanced Portfolio Summary Card */}
          <div className="glass-effect rounded-soft-lg animate-float h-72 border-banana-green-500">
            {/* Video Section: Replace dashboard with autoplay video */}
            <video
              ref={videoRef}
              src="/assets/dashboard-video.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full rounded-soft-lg object-cover border-banana-green-500 animate-zoom-in-out"
            >
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
          {/* Biểu tượng loa và marquee chạy song song */}
          <div className="mt-2 flex items-center w-full overflow-hidden">
            <div className="rounded-full p-2 shadow-2xl border-2 border-transparent flex items-center justify-center flex-shrink-0 transition-transform duration-500 hover:scale-110" style={{width: 44, height: 44}}>
              <div style={{
                border: '3px solid #84cc16',
                borderRadius: '50%',
                padding: 4,
                background: '#fff',
                boxShadow: '0 0 10px #84cc1655',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36
              }}>
                <SpeakerIcon color="#84cc16" />
              </div>
            </div>
            {/* Audio phát song song với chữ chạy */}
            <audio src="/assets/announce.mp3" autoPlay loop preload="auto" style={{ display: 'none' }} />
            <div className="relative flex-1 overflow-hidden ml-4" style={{height: 40}}>
              <div className="marquee-content custom-marquee" style={{
                position: 'absolute',
                whiteSpace: 'nowrap',
                color: '#fff700',
                fontWeight: 600,
                fontSize: '1rem',
                fontStyle: 'italic',
                animation: 'marquee 40s linear infinite',
                left: 0,
                paddingLeft: 60
              }}>
                Khám phá cơ hội đầu tư vào một mạng lưới trạm sạc hiện đại, với tiềm năng sinh lời hấp dẫn. Tham gia cùng chúng tôi để xây dựng tương lai bền vững cho Việt Nam và góp phần vào sự phát triển của ngành công nghiệp xanh. &nbsp; &nbsp; 📈 Lợi nhuận hàng ngày từ 0.2% đến 2.2% &nbsp; 🌱 Góp phần phát triển bền vững &nbsp; ⚡ Hơn 150 Trạm Sạc &nbsp; 👥 Hơn 25,000 Nhà Đầu Tư &nbsp; 💰 Tổng Đầu Tư: ₫2.5T &nbsp; Hãy cùng chúng tôi hiện thực hóa tương lai xanh ngay hôm nay!
              </div>
            </div>
          </div>

        </div> {/* Kết thúc grid */}
      </div>   {/* Kết thúc max-w-7xl */}
    </section>
  );
}
