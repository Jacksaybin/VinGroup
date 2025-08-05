import { useState } from "react";
import { type InvestmentFund } from "@shared/schema";

interface InvestmentModalProps {
  fund: InvestmentFund;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestmentModal({ fund, isOpen, onClose }: InvestmentModalProps) {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("balance");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const paymentMethods = [
    { id: "balance", name: "Số dư tài khoản", icon: "fas fa-wallet", available: "125,450,000 VNĐ" },
    { id: "bank", name: "Chuyển khoản ngân hàng", icon: "fas fa-building-columns", available: "Không giới hạn" }
  ];

  const handleInvest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Vui lòng đọc và đồng ý với các điều khoản đầu tư.");
      return;
    }
    
    // In real app, this would call API
    alert(`Đầu tư ${investmentAmount} VNĐ vào quỹ ${fund.name} thành công!`);
    setInvestmentAmount("");
    setAgreedToTerms(false);
    onClose();
  };

  const calculateProfit = () => {
    if (!investmentAmount) return { daily: 0, total: 0 };
    const amount = parseInt(investmentAmount.replace(/,/g, "")) || 0;
    const dailyReturn = parseFloat(fund.dailyReturn);
    const daily = (amount * dailyReturn) / 100;
    const total = daily * fund.duration;
    return { daily, total };
  };

  const profit = calculateProfit();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Đầu tư vào quỹ</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-times text-gray-600"></i>
          </button>
        </div>

        {/* Fund Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img 
              src={fund.image} 
              alt={fund.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{fund.name}</h3>
              <p className="text-gray-600">{fund.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-vgreen-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {fund.code}
                </span>
                <span className="text-green-600 font-semibold">{fund.dailyReturn}%/ngày</span>
                <span className="text-blue-600 font-semibold">{fund.duration} ngày</span>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Form */}
        <form onSubmit={handleInvest} className="p-6 space-y-6">
          {/* Investment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số tiền đầu tư (VNĐ)
            </label>
            <input
              type="text"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
              placeholder="Nhập số tiền muốn đầu tư"
              required
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>Tối thiểu: {fund.minInvestment}</span>
              {fund.maxInvestment && <span>Tối đa: {fund.maxInvestment}</span>}
            </div>
            <div className="flex gap-2 mt-2">
              {[fund.minInvestment, "10,000,000", "50,000,000", "100,000,000"].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setInvestmentAmount(amount)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Phương thức thanh toán
            </label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedPaymentMethod === method.id
                      ? "border-vgreen-primary bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className={`${method.icon} text-xl mr-3`}></i>
                      <div>
                        <div className="font-semibold">{method.name}</div>
                        <div className="text-sm text-gray-600">Khả dụng: {method.available}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profit Calculation */}
          {investmentAmount && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Dự tính lợi nhuận</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">{formatCurrency(profit.daily)} VNĐ</div>
                  <div className="text-sm text-gray-600">Mỗi ngày</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{formatCurrency(profit.daily * 30)} VNĐ</div>
                  <div className="text-sm text-gray-600">Mỗi tháng</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{formatCurrency(profit.total)} VNĐ</div>
                  <div className="text-sm text-gray-600">Tổng lợi nhuận</div>
                </div>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-vgreen-primary focus:ring-vgreen-primary border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Tôi đã đọc và đồng ý với{" "}
              <a href="#" className="text-vgreen-primary hover:underline">
                điều khoản và điều kiện đầu tư
              </a>
              . Tôi hiểu rằng đầu tư có rủi ro và lợi nhuận có thể thay đổi.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={!agreedToTerms || !investmentAmount}
              className="flex-1 bg-gradient-to-r from-vgreen-primary to-success text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chart-line mr-2"></i>
              Xác nhận đầu tư
            </button>
          </div>
        </form>

        {/* Risk Warning */}
        <div className="p-6 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-yellow-600 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Cảnh báo rủi ro đầu tư</h4>
              <p className="text-sm text-yellow-700">
                Đầu tư vào các quỹ trạm sạc có rủi ro. Lợi nhuận trong quá khứ không đảm bảo cho kết quả tương lai. 
                Vui lòng đánh giá kỹ khả năng tài chính và chỉ đầu tư số tiền bạn có thể chấp nhận mất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}