import { Link } from "wouter";
import { useState, useEffect } from "react";
import type { InvestmentFund } from "../../../shared/schema";

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
      <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4" onClick={(e: any) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Đầu tư vào {fund.name}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Số tiền đầu tư (VND):</label>
          <input
            type="text"
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
            placeholder={`Tối thiểu: ${fund.minInvestment}`}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg">Hủy</button>
          <button onClick={handleSubmit} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Đầu tư</button>
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
        color: "from-green-500 to-emerald-600",
        border: "border-green-500",
        text: "text-green-700"
      };
    case 'công nghệ 3d':
      return {
        color: "from-purple-500 to-violet-600", 
        border: "border-purple-500",
        text: "text-purple-700"
      };
    case 'tích lũy':
      return {
        color: "from-blue-500 to-cyan-600",
        border: "border-blue-500", 
        text: "text-blue-700"
      };
    case 'gói thương':
      return {
        color: "from-orange-500 to-red-600",
        border: "border-orange-500",
        text: "text-orange-700"
      };
    case 'gói vip':
      return {
        color: "from-yellow-500 to-amber-600",
        border: "border-yellow-500",
        text: "text-yellow-700"
      };
    case 'công nghệ':
      return {
        color: "from-indigo-500 to-blue-600",
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
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch investment funds from API
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch('/api/investment-funds');
        if (response.ok) {
          const data = await response.json();
          setFunds(data);
          console.log(`📊 Đã tải ${data.length} quỹ đầu tư từ API`);
        } else {
          console.error('Failed to fetch investment funds');
        }
      } catch (error) {
        console.error('Error fetching funds:', error);
      } finally {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">📊 Quỹ Đầu Tư VinFast V-Green</h2>
        <p className="text-gray-600">
          Hiện có <span className="font-bold text-blue-600">{funds.length}</span> quỹ đầu tư với lợi nhuận hấp dẫn
        </p>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {successMsg}
        </div>
      )}
      
      {/* Investment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {funds.map((fund) => {
          const colors = getCategoryColors(fund.category);
          const dailyReturnPercent = (parseFloat(fund.dailyReturn) * 100).toFixed(2);
          
          return (
            <div key={fund.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Header với gradient */}
              <div className={`bg-gradient-to-r ${colors.color} p-6 text-white rounded-t-2xl`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-3xl font-bold">{dailyReturnPercent}%</div>
                    <div className="text-sm opacity-90">mỗi ngày</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{fund.duration} ngày</div>
                    <div className="text-sm opacity-90">thời gian</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold leading-tight">{fund.name}</h3>
              </div>

              {/* Fund Image */}
              <div className="relative">
                <img 
                  src={fund.image} 
                  alt={fund.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/vinfast-vgreen-logo.png';
                  }}
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {fund.code}
                </div>
              </div>

              {/* Fund Details */}
              <div className="p-6 space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tiến độ dự án</span>
                    <span className="font-semibold">{fund.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${colors.color} h-2 rounded-full`}
                      style={{ width: `${fund.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Fund Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quy mô:</span>
                    <span className="font-semibold">{fund.projectScale}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Danh mục:</span>
                    <span className={`font-semibold ${colors.text}`}>{fund.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đầu tư tối thiểu:</span>
                    <span className="font-semibold">{fund.minInvestment}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Đặc điểm nổi bật:</h4>
                  <div className="space-y-1">
                    {fund.features && fund.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Link 
                    href={`/investment/${fund.id}`}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all text-sm text-center"
                  >
                    Chi tiết
                  </Link>
                  <button 
                    onClick={() => setSelectedFund(fund)}
                    className={`flex-1 bg-gradient-to-r ${colors.color} text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all text-sm`}
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
