import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Gói đầu tư tích lũy
const accumulativePackages = [
  {
    id: 1,
    name: "Gói Tích Lũy Cơ Bản VinFast",
    monthlyAmount: "1,000,000",
    duration: 12, // tháng
    totalAmount: "12,000,000",
    expectedReturn: "15,600,000",
    profit: "3,600,000",
    returnRate: "2.5%", // hàng tháng
    minMonthly: "500,000",
    maxMonthly: "5,000,000",
    color: "from-green-500 to-emerald-600",
    border: "border-green-500",
    icon: "fa-seedling",
    features: [
      "Đầu tư định kỳ hàng tháng",
      "Lợi nhuận 2.5%/tháng",
      "Linh hoạt điều chỉnh số tiền",
      "Rút vốn sau 6 tháng"
    ]
  },
  {
    id: 2,
    name: "Gói Tích Lũy Cao Cấp VIC",
    monthlyAmount: "5,000,000",
    duration: 24,
    totalAmount: "120,000,000",
    expectedReturn: "180,000,000",
    profit: "60,000,000",
    returnRate: "4.2%",
    minMonthly: "3,000,000",
    maxMonthly: "20,000,000",
    color: "from-blue-600 to-purple-700",
    border: "border-blue-600",
    icon: "fa-crown",
    features: [
      "Đầu tư định kỳ hàng tháng",
      "Lợi nhuận 4.2%/tháng",
      "Ưu đãi đặc biệt cho thành viên VIC",
      "Bảo hiểm khoản đầu tư"
    ]
  },
  {
    id: 3,
    name: "Gói Tích Lũy Premium VinGroup",
    monthlyAmount: "10,000,000",
    duration: 36,
    totalAmount: "360,000,000",
    expectedReturn: "648,000,000",
    profit: "288,000,000",
    returnRate: "6.7%",
    minMonthly: "8,000,000",
    maxMonthly: "50,000,000",
    color: "from-yellow-500 to-orange-600",
    border: "border-yellow-500",
    icon: "fa-gem",
    features: [
      "Đầu tư định kỳ hàng tháng",
      "Lợi nhuận 6.7%/tháng",
      "Quyền ưu tiên đầu tư dự án mới",
      "Tư vấn đầu tư cá nhân 24/7"
    ]
  }
];

export default function AccumulativeInvestment() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const openModal = (pkg: any) => {
    if (!user) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!");
      return;
    }
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <section className="relative overflow-hidden text-blue-main py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <i className="fas fa-piggy-bank text-4xl text-green-600"></i>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-serif text-blue-main">
                Đầu Tư Tích Lũy VinFast
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Tích lũy tài sản một cách thông minh với các gói đầu tư định kỳ hàng tháng
              <br />
              <span className="text-green-600 font-semibold">Lợi nhuận ổn định - Rủi ro thấp - Linh hoạt cao</span>
            </p>
          </div>
        </div>
      </section>

      {/* Gói đầu tư tích lũy */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chọn Gói Đầu Tư Tích Lũy Phù Hợp
            </h2>
            <p className="text-lg text-gray-600">
              Đầu tư định kỳ hàng tháng để xây dựng tài sản lâu dài
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {accumulativePackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                  <div className="text-center">
                    <i className={`fas ${pkg.icon} text-3xl mb-3`}></i>
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-2xl font-bold">
                      {pkg.monthlyAmount.toLocaleString()} VND
                    </div>
                    <div className="text-sm opacity-90">mỗi tháng</div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-semibold">{pkg.duration} tháng</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng đầu tư:</span>
                      <span className="font-semibold">{pkg.totalAmount.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dự kiến nhận:</span>
                      <span className="font-semibold text-green-600">{pkg.expectedReturn.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lợi nhuận:</span>
                      <span className="font-semibold text-green-600">+{pkg.profit.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lãi suất:</span>
                      <span className="font-semibold text-blue-600">{pkg.returnRate}/tháng</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Đặc điểm nổi bật:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openModal(pkg)}
                    className={`w-full bg-gradient-to-r ${pkg.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lợi ích đầu tư tích lũy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại Sao Nên Chọn Đầu Tư Tích Lũy?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "fa-chart-line",
                title: "Tích Lũy Đều Đặn",
                description: "Đầu tư nhỏ mỗi tháng, tích lũy lớn theo thời gian"
              },
              {
                icon: "fa-shield-alt", 
                title: "Rủi Ro Thấp",
                description: "Phân tán rủi ro qua nhiều chu kỳ đầu tư"
              },
              {
                icon: "fa-coins",
                title: "Lợi Nhuận Ổn Định",
                description: "Lãi suất cạnh tranh và minh bạch"
              },
              {
                icon: "fa-hand-holding-usd",
                title: "Linh Hoạt Cao",
                description: "Có thể điều chỉnh số tiền hoặc tạm dừng"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${benefit.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
