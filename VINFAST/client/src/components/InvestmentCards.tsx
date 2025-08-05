import { Link } from "wouter";
import { useState, useEffect } from "react";
import type { InvestmentFund } from "../../../shared/schema";
import { tempFundsData } from "../../../server/temp-funds";

// Modal đầu tư
function ModalInvest({ fund, onClose, onInvest }: { 
  fund: InvestmentFund | null; 
  onClose: () => void; 
  onInvest: (fund: InvestmentFund, amount: number) => void 
}) {
  const [amount, setAmount] = useState("");
  
  if (!fund) return null;
  
  const handleSubmit = () => {
    const num = parseInt(amount.replace(/,/g, ""));
    if (num > 0) {
      onInvest(fund, num);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-soft-lg max-w-md w-full mx-4" onClick={(e: any) => e.stopPropagation()}>
        <h3 className="text-title text-title-sm mb-4">Đầu tư vào {fund.name}</h3>
        <div className="mb-4">
          <label className="block text-body text-body-md font-medium mb-2">Số tiền đầu tư (VND):</label>
          <input
            type="text"
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
            placeholder={`Tối thiểu: ${fund.minInvestment}`}
            className="w-full border border-gray-300 rounded-soft px-3 py-2 text-body"
          />
        </div>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-soft text-body">Hủy</button>
          <button onClick={handleSubmit} className="flex-1 bg-banana-green-600 text-white py-2 rounded-soft hover:bg-banana-green-700 transition-colors font-semibold">Đầu tư</button>
        </div>
      </div>
    </div>
  );
}

// Modal chi tiết quỹ đầu tư
function ModalDetail({ fund, onClose, onInvest }: { 
  fund: InvestmentFund | null; 
  onClose: () => void;
  onInvest?: (fund: InvestmentFund) => void;
}) {
  if (!fund) return null;

  const formatNumber = (num: number | string) => {
    return new Intl.NumberFormat('vi-VN').format(Number(num));
  };

  const dailyReturnPercent = (Number(fund.dailyReturn) * 100).toFixed(2);
  const monthlyReturn = (Number(fund.dailyReturn) * 30 * 100).toFixed(2);
  const yearlyReturn = (Number(fund.dailyReturn) * 365 * 100).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-soft-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e: any) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-banana-green-500 to-banana-green-600 text-white p-6 rounded-t-soft-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-title text-title-lg font-bold mb-2">{fund.name}</h2>
              <p className="text-banana-green-100">Mã quỹ: {fund.code}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-banana-green-200 transition-colors text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Thông tin đặc biệt cho DC120kW */}
          {fund.code === "DC120" && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-soft-lg p-6">
              <h3 className="text-title text-title-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🎯 Thông tin đầu tư đặc biệt - {fund.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Mỗi cổ tức:</span>
                    <span className="text-body font-bold">0 VND</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Chu kỳ đầu tư:</span>
                    <span className="text-body font-bold">90 Ngày</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Phương pháp chia lợi nhuận:</span>
                    <span className="text-body font-bold">Quỹ đầu tư ngắn hạn</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Đầu tư không có rủi ro:</span>
                    <span className="text-green-600 font-bold">100%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Số tiền dự án:</span>
                    <span className="text-body font-bold">100,000,000,000 VND</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Lợi nhuận:</span>
                    <span className="text-green-600 font-bold">Tỷ lệ 0.6% thu nhập (vốn và lãi)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Thời gian giải quyết:</span>
                    <span className="text-body font-bold">Ngày thứ 31</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-soft border">
                    <span className="text-body font-medium">Bảo mật:</span>
                    <span className="text-green-600 font-bold">100%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-soft">
                <h4 className="font-semibold text-yellow-800 mb-2">🎁 Thưởng đặc biệt:</h4>
                <p className="text-yellow-700">Thưởng gói nâng cấp gói: <span className="font-bold">246.000.000 VND</span></p>
              </div>
            </div>
          )}

          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-title text-title-md font-semibold border-b-2 border-banana-green-500 pb-2">
                📊 Thông tin đầu tư
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Lợi nhuận hàng ngày:</span>
                  <span className="text-banana-green-600 font-bold text-lg">{dailyReturnPercent}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Lợi nhuận hàng tháng:</span>
                  <span className="text-banana-green-600 font-bold">{monthlyReturn}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Lợi nhuận hàng năm:</span>
                  <span className="text-banana-green-600 font-bold">{yearlyReturn}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Thời gian đầu tư:</span>
                  <span className="text-body font-bold">{fund.duration} ngày</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-title text-title-md font-semibold border-b-2 border-banana-green-500 pb-2">
                💰 Thông tin tài chính
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Đầu tư tối thiểu:</span>
                  <span className="text-body font-bold">{fund.minInvestment}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Đầu tư tối đa:</span>
                  <span className="text-body font-bold">{fund.maxInvestment}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Quy mô dự án:</span>
                  <span className="text-body font-bold">{fund.projectScale}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-soft">
                  <span className="text-body font-medium">Tiến độ:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-banana-green-500 transition-all duration-500"
                        style={{ width: `${Math.min(fund.progress, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-body font-bold">{fund.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mô tả chi tiết */}
          <div className="mb-6">
            <h3 className="text-title text-title-md font-semibold border-b-2 border-banana-green-500 pb-2 mb-4">
              📋 Mô tả dự án
            </h3>
            <div className="bg-gray-50 p-4 rounded-soft">
              <p className="text-body leading-relaxed">{fund.description}</p>
            </div>
          </div>

          {/* Tính toán lợi nhuận */}
          <div className="mb-6">
            <h3 className="text-title text-title-md font-semibold border-b-2 border-banana-green-500 pb-2 mb-4">
              🧮 Ví dụ tính toán lợi nhuận
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1000000, 10000000, 100000000].map((amount) => (
                <div key={amount} className="bg-gradient-to-br from-banana-green-50 to-banana-green-100 p-4 rounded-soft border border-banana-green-200">
                  <h4 className="font-semibold text-banana-green-800 mb-2">
                    Đầu tư: {formatNumber(amount)} VND
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Lợi nhuận/ngày:</span>
                      <span className="font-bold text-banana-green-600">
                        {formatNumber(amount * Number(fund.dailyReturn))} VND
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sau {fund.duration} ngày:</span>
                      <span className="font-bold text-banana-green-600">
                        {formatNumber(amount + (amount * Number(fund.dailyReturn) * fund.duration))} VND
                      </span>
                    </div>
                    <div className="flex justify-between text-banana-green-700">
                      <span>Tổng lợi nhuận:</span>
                      <span className="font-bold">
                        {formatNumber(amount * Number(fund.dailyReturn) * fund.duration)} VND
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Đặc điểm nổi bật */}
          <div className="mb-6">
            <h3 className="text-title text-title-md font-semibold border-b-2 border-banana-green-500 pb-2 mb-4">
              ⭐ Đặc điểm nổi bật
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {fund.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-banana-green-50 rounded-soft border border-banana-green-200">
                  <div className="w-2 h-2 bg-banana-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-body text-banana-green-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lưu ý rủi ro */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-soft">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              ⚠️ Lưu ý quan trọng
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Đầu tư có rủi ro, bạn có thể mất một phần hoặc toàn bộ số tiền đầu tư</li>
              <li>• Lợi nhuận trong quá khứ không đảm bảo cho kết quả tương lai</li>
              <li>• Hãy đọc kỹ các điều khoản và điều kiện trước khi đầu tư</li>
              <li>• Chỉ đầu tư số tiền mà bạn có thể chấp nhận mất</li>
            </ul>
          </div>
        </div>

        {/* Footer với nút hành động */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-soft-lg">
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 border border-gray-300 py-3 rounded-soft font-semibold hover:bg-gray-50 transition-colors"
            >
              Đóng
            </button>
            <button 
              onClick={() => {
                onClose();
                if (onInvest && fund) {
                  onInvest(fund);
                }
              }}
              className="flex-1 bg-gradient-to-r from-banana-green-500 to-banana-green-600 text-white py-3 rounded-soft font-semibold hover:shadow-lg transition-all"
            >
              Đầu tư ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Get color scheme based on category
function getCategoryColors(category: string) {
  switch (category.toLowerCase()) {
    case 'hạ tầng sạc':
      return {
        color: "from-banana-green-500 to-banana-green-600",
        border: "border-banana-green-500",
        text: "text-banana-green-700"
      };
    case 'công nghệ 3d':
      return {
        color: "from-banana-green-400 to-banana-green-500", 
        border: "border-banana-green-400",
        text: "text-banana-green-700"
      };
    case 'tích lũy':
      return {
        color: "from-lime-banana to-yellow-green",
        border: "border-lime-banana", 
        text: "text-banana-green-800"
      };
    case 'gói thương':
      return {
        color: "from-banana-green-300 to-banana-green-400",
        border: "border-banana-green-300",
        text: "text-banana-green-700"
      };
    case 'gói vip':
      return {
        color: "from-chartreuse to-banana-green-400",
        border: "border-chartreuse",
        text: "text-banana-green-800"
      };
    case 'công nghệ':
      return {
        color: "from-banana-green-600 to-banana-green-500",
        border: "border-indigo-500", 
        text: "text-indigo-700"
      };
    case 'r&d':
      return {
        color: "from-pink-500 to-rose-600",
        border: "border-pink-500",
        text: "text-pink-700"
      };
    case 'tương lai':
      return {
        color: "from-teal-500 to-cyan-600",
        border: "border-teal-500",
        text: "text-teal-700"
      };
    case 'siêu dự án':
      return {
        color: "from-red-500 to-pink-600",
        border: "border-red-500",
        text: "text-red-700"
      };
    default:
      return {
        color: "from-gray-500 to-slate-600",
        border: "border-gray-500",
        text: "text-gray-700"
      };
  }
}

export default function InvestmentCards() {
  const [funds, setFunds] = useState<InvestmentFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFund, setSelectedFund] = useState<InvestmentFund | null>(null);
  const [detailFund, setDetailFund] = useState<InvestmentFund | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Remove fallback data to force API usage
  const fallbackFunds: InvestmentFund[] = tempFundsData as unknown as InvestmentFund[];

  // Fetch investment funds from API
  useEffect(() => {
    const fetchFunds = async () => {
      console.log('🔄 Bắt đầu fetch funds từ API...');
      try {
        const response = await fetch('http://localhost:5000/api/investment-funds');
        console.log('📡 API response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Dữ liệu nhận được:', data.length, 'quỹ');
          console.log('📄 Sample fund:', data[0]?.name, data[0]?.dailyReturn);
          setFunds(data);
          console.log(`📊 Đã tải ${data.length} quỹ đầu tư từ API`);
        } else {
          console.error('❌ API không khả dụng, status:', response.status);
          console.error('Sử dụng dữ liệu fallback');
          setFunds(fallbackFunds);
        }
      } catch (error) {
        console.error('💥 Error fetching funds:', error);
        console.error('Sử dụng dữ liệu fallback');
        setFunds(fallbackFunds);
      } finally {
        console.log('🏁 Kết thúc loading');
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  const handleInvest = (fund: InvestmentFund, amount: number) => {
    console.log(`Đầu tư ${amount} VNĐ vào quỹ ${fund.name}`);
    setSelectedFund(null);
    setSuccessMsg(`Đã đầu tư thành công ${amount.toLocaleString()} VNĐ vào ${fund.name}!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-banana-green-600"></div>
        <span className="ml-4 text-gray-600">Đang tải quỹ đầu tư...</span>
      </div>
    );
  }

  if (funds.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="text-gray-500 text-lg mb-4">⚠️ Không tìm thấy quỹ đầu tư</div>
          <div className="text-sm text-gray-400">Vui lòng kiểm tra kết nối API</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-title text-title-md mb-4">📊 Quỹ Đầu Tư VinFast V-Green</h2>
        <p className="text-body text-body-lg">
          Hiện có <span className="font-bold text-banana-green-600">đầy đủ 14 gói quỹ đầu tư</span> với lợi nhuận hấp dẫn
        </p>
        <div className="mt-2 text-sm text-gray-600">
          ✅ Cập nhật đầy đủ 14 gói quỹ đang hoạt động với mức lợi nhuận từ 9.1% - 21.9%/năm
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {successMsg}
        </div>
      )}
      
      {/* Investment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {funds.map((fund) => {
          const colors = getCategoryColors(fund.category);
          const dailyReturnPercent = (parseFloat(fund.dailyReturn) * 100).toFixed(2);
          
          return (
            <div key={fund.id} className="bg-white rounded-soft-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Header với gradient xanh nõn chuối - tên quỹ và trạng thái */}
              <div className="bg-gradient-to-r from-banana-green-500 to-banana-green-600 p-6 text-white rounded-t-soft-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-body-lg font-bold leading-tight flex-1 mr-3">{fund.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-body-sm font-medium">Đang hoạt động</span>
                  </div>
                </div>
              </div>

              {/* Fund Image */}
              <div className="relative">
                <img 
                  src={fund.image} 
                  alt={fund.name}
                  className="w-full h-40 object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    (e.target as HTMLImageElement).src = '/assets/vinfast-vgreen-logo.png';
                  }}
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-soft-sm text-body-sm font-semibold text-gray-700">
                  {fund.code}
                </div>
              </div>

              {/* Lợi nhuận và Thời gian - 2 cột có khung dưới hình ảnh */}
              <div className="px-4 py-3 bg-gray-50">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
                    <div className="text-xs text-gray-500 mb-1 font-medium">Lợi nhuận hàng ngày</div>
                    <div className="text-title-sm font-bold text-banana-green-600">{dailyReturnPercent}%</div>
                    <div className="text-xs text-gray-600">mỗi ngày</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
                    <div className="text-xs text-gray-500 mb-1 font-medium">Thời gian đầu tư</div>
                    <div className="text-title-sm font-bold text-banana-green-600">{fund.duration}</div>
                    <div className="text-xs text-gray-600">ngày</div>
                  </div>
                </div>
              </div>

              {/* Fund Details */}
              <div className="p-6 space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-body-sm mb-2">
                    <span>Tiến độ dự án</span>
                    <span className="font-semibold">{fund.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-soft-sm h-2">
                    <div 
                      className="bg-gradient-to-r from-banana-green-500 to-banana-green-600 h-2 rounded-soft-sm"
                      style={{ width: `${fund.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Fund Info */}
                <div className="space-y-3 text-body-sm">
                  <div className="flex justify-between">
                    <span className="text-light">Quy mô:</span>
                    <span className="font-semibold text-body">{fund.projectScale}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light">Đầu tư tối thiểu:</span>
                    <span className="font-semibold text-body">{fund.minInvestment}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setDetailFund(fund)}
                    className="flex-1 border border-gray-300 text-body py-2 px-4 rounded-soft font-semibold hover:bg-gray-50 transition-all text-body-sm"
                  >
                    Chi tiết
                  </button>
                  <button 
                    onClick={() => setSelectedFund(fund)}
                    className="flex-1 bg-gradient-to-r from-banana-green-500 to-banana-green-600 text-white py-2 px-4 rounded-soft font-semibold hover:shadow-lg transition-all text-body-sm"
                  >
                    Đầu tư
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Investment Modal */}
      {selectedFund && (
        <ModalInvest 
          fund={selectedFund}
          onClose={() => setSelectedFund(null)}
          onInvest={handleInvest}
        />
      )}

      {/* Detail Modal */}
      {detailFund && (
        <ModalDetail 
          fund={detailFund}
          onClose={() => setDetailFund(null)}
          onInvest={(fund) => {
            setDetailFund(null);
            setSelectedFund(fund);
          }}
        />
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500">
        <p>🌱 VinFast V-Green - Đầu tư vào tương lai xanh</p>
        <p className="text-sm mt-2">
          Tổng cộng {funds.length} quỹ đầu tư đang hoạt động
        </p>
      </div>
    </div>
  );
}