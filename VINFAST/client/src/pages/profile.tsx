import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

// CSS styles cho hiệu ứng chạy xung quanh
const animationStyles = `
  @keyframes borderRun {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 5px rgba(132, 204, 22, 0.5), 0 0 20px rgba(132, 204, 22, 0.3), 0 0 35px rgba(132, 204, 22, 0.2);
    }
    50% {
      box-shadow: 0 0 10px rgba(132, 204, 22, 0.8), 0 0 30px rgba(132, 204, 22, 0.5), 0 0 50px rgba(132, 204, 22, 0.3);
    }
  }

  .animated-border {
    position: relative;
    background: linear-gradient(45deg, #84cc16, #a3e635, #84cc16, #a3e635);
    background-size: 400% 400%;
    animation: borderRun 3s ease infinite;
    padding: 2px;
    border-radius: 12px;
  }

  .animated-border::before {
    con        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="pb-20 md:pb-0"></div>
    </div> '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(45deg, #84cc16, #a3e635, #84cc16, #a3e635);
    background-size: 400% 400%;
    animation: borderRun 3s ease infinite;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  .glow-effect {
    animation: glowPulse 2s ease-in-out infinite;
  }

  .button-glow {
    position: relative;
    overflow: hidden;
  }

  .button-glow::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #84cc16, #a3e635, #84cc16, #a3e635);
    background-size: 400% 400%;
    animation: borderRun 3s ease infinite;
    border-radius: 14px;
    z-index: -1;
  }
`;

// Thêm styles vào head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = animationStyles;
  if (!document.head.querySelector('style[data-profile-animations]')) {
    styleElement.setAttribute('data-profile-animations', 'true');
    document.head.appendChild(styleElement);
  }
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  birthDate: string;
  balance: string;
  totalInvested: string;
  totalProfit: string;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  investments: Array<{
    id: string;
    fundName: string;
    amount: string;
    status: string;
    date: string;
    estimatedReturn: string;
    currentValue: string;
  }>;
  transactions: Array<{
    id: string;
    type: 'deposit' | 'withdraw' | 'investment' | 'profit';
    amount: string;
    date: string;
    method: string;
    status: 'completed' | 'pending';
  }>;
}

const Profile: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [userData, setUserData] = useState<UserData>({
    id: "1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    phone: "+84 123 456 789",
    joinDate: "2024-01-15",
    birthDate: "",
    balance: "50,000,000",
    totalInvested: "200,000,000",
    totalProfit: "18,300,000",
    bankInfo: {
      bankName: "Ngân hàng TMCP Công Thương Việt Nam (VietinBank)",
      accountNumber: "113366888999",
      accountHolder: "Nguyễn Văn An"
    },
    investments: [
      {
        id: "1",
        fundName: "Quỹ phát triển trạm sạc VinFast DC 40kW",
        amount: "50,000,000",
        status: "active",
        date: "2024-01-15",
        estimatedReturn: "4,250,000",
        currentValue: "54,250,000"
      },
      {
        id: "2",
        fundName: "Quỹ phát triển trạm sạc VinFast VIC03",
        amount: "30,000,000",
        status: "active",
        date: "2024-02-01",
        estimatedReturn: "2,700,000",
        currentValue: "32,700,000"
      }
    ],
    transactions: [
      {
        id: "1",
        type: "deposit",
        amount: "+100,000,000",
        date: "2024-01-15",
        method: "Chuyển khoản ngân hàng",
        status: "completed"
      },
      {
        id: "2",
        type: "investment",
        amount: "-50,000,000",
        date: "2024-01-15",
        method: "Đầu tư quỹ",
        status: "completed"
      }
    ]
  });

  const [activeTab, setActiveTab] = useState("account");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  // Local state for editing birth date
  const [birthDateLocal, setBirthDateLocal] = useState(userData.birthDate);

  const paymentMethods = [
    { id: "bank", name: "Ngân hàng", icon: "fas fa-university", fee: "Miễn phí" }
  ];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nạp tiền:", depositAmount);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rút tiền:", withdrawAmount);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Đổi mật khẩu");
    setShowChangePassword(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("Đổi mật khẩu thành công!");
  };

  const navigateToSupport = () => {
    console.log("Navigate to support");
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    
    // Chuyển hướng về trang đăng nhập
    setLocation('/');
    
    console.log("Đã đăng xuất thành công");
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return 'fas fa-arrow-down text-green-600';
      case 'withdraw': return 'fas fa-arrow-up text-red-600';
      case 'investment': return 'fas fa-chart-line text-blue-600';
      case 'profit': return 'fas fa-coins text-yellow-600';
      default: return 'fas fa-circle text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return "bg-green-100 text-green-800";
      case 'pending': return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleBirthDateCancel = () => {
    setBirthDateLocal(userData.birthDate);
  };

  const handleBirthDateConfirm = () => {
    setUserData({ ...userData, birthDate: birthDateLocal });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-vgreen-primary to-vgreen-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-6">
              <i className="fas fa-user text-3xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold font-sans mb-2" style={{textTransform:'none'}}>{userData.name}</h1>
              <p className="text-gray-200 font-sans" style={{textTransform:'none'}}>Thành viên từ {new Date(userData.joinDate).toLocaleDateString('vi-VN')}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={navigateToSupport}
                  className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all rounded-lg px-4 py-2 text-sm"
                >
                  <i className="fas fa-headset mr-2"></i>
                  Hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Balance Cards với hiệu ứng glow */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="animated-border glow-effect">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Số dư khả dụng</h3>
                <i className="fas fa-wallet text-vgreen-primary text-xl"></i>
              </div>
              <div className="text-3xl font-bold text-vgreen-primary mb-2">{userData.balance} vnđ</div>
              <p className="text-sm text-gray-600">Có thể đầu tư hoặc rút</p>
            </div>
          </div>
          
          <div className="animated-border glow-effect">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tổng đã đầu tư</h3>
                <i className="fas fa-chart-line text-blue-600 text-xl"></i>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{userData.totalInvested} vnđ</div>
              <p className="text-sm text-gray-600">Trong các quỹ đầu tư</p>
            </div>
          </div>
          
          <div className="animated-border glow-effect">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tổng lợi nhuận</h3>
                <i className="fas fa-coins text-green-600 text-xl"></i>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">+{userData.totalProfit} vnđ</div>
              <p className="text-sm text-gray-600">Lợi nhuận tích lũy</p>
            </div>
          </div>
        </div>

        {/* Action Buttons với hiệu ứng chạy */}
        <div className="animated-border glow-effect">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setActiveTab("deposit")}
                className="button-glow flex items-center px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-lime-500 hover:to-lime-600"
              >
                <i className="fas fa-arrow-down mr-2 text-lg"></i>
                Nạp tiền
              </button>
              
              <button 
                onClick={() => setActiveTab("withdraw")}
                className="button-glow flex items-center px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-lime-500 hover:to-lime-600"
              >
                <i className="fas fa-arrow-up mr-2 text-lg"></i>
                Rút tiền
              </button>
              
              <button 
                onClick={() => setActiveTab("cards")}
                className="button-glow flex items-center px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-lime-500 hover:to-lime-600"
              >
                <i className="fas fa-credit-card mr-2 text-lg"></i>
                Thẻ của tôi
              </button>
            </div>
          </div>
        </div>

        {/* Main Content với hiệu ứng khung viền */}
        <div className="animated-border glow-effect">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex">
              {/* Sidebar Menu */}
              <div className="w-64 bg-gray-50 border-r border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4" style={{textTransform:'none'}}>Của tôi</h3>
                <nav className="space-y-1">
                  {[
                    { id: "account", name: "Tài khoản", icon: "fas fa-user" },
                    { id: "transactions", name: "Lịch sử giao dịch", icon: "fas fa-history" },
                    { id: "deposit", name: "Nạp tiền", icon: "fas fa-arrow-down" },
                    { id: "withdraw", name: "Quản lí rút tiền", icon: "fas fa-arrow-up" },
                    { id: "cards", name: "Thẻ của tôi", icon: "fas fa-credit-card" },
                    { id: "personal", name: "Thông tin cá nhân", icon: "fas fa-id-card" },
                    { id: "security", name: "Bảo mật", icon: "fas fa-shield-alt" },
                    { id: "logout", name: "Đăng xuất", icon: "fas fa-sign-out-alt" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === "logout") {
                          handleLogout();
                        } else {
                          setActiveTab(item.id);
                        }
                      }}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-vgreen-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <i className={`${item.icon} mr-3`}></i>
                      <span style={{textTransform:'none'}}>{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8">
              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6" style={{textTransform:'none'}}>Tổng quan tài khoản</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{userData.investments.length}</div>
                        <div className="text-sm text-gray-600" style={{textTransform:'none'}}>Quỹ đang tham gia</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {userData.investments.filter(inv => inv.status === 'active').length}
                        </div>
                        <div className="text-sm text-gray-600" style={{textTransform:'none'}}>Đầu tư đang hoạt động</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {userData.transactions.filter(t => t.status === 'pending').length}
                        </div>
                        <div className="text-sm text-gray-600" style={{textTransform:'none'}}>Đang chờ xử lý</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">9.15%</div>
                        <div className="text-sm text-gray-600" style={{textTransform:'none'}}>ROI trung bình</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6" style={{textTransform:'none'}}>Thông tin cá nhân</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-600">Họ và tên</div>
                        <div className="text-lg font-semibold text-gray-900">{userData.name}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-600">Thư điện tử</div>
                        <div className="text-lg font-semibold text-gray-900">{userData.email}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-600">Số điện thoại</div>
                        <div className="text-lg font-semibold text-gray-900">{userData.phone}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-600">Ngày sinh</div>
                        <input
                          type="date"
                          value={birthDateLocal}
                          onChange={(e) => setBirthDateLocal(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                        />
                      </div>
                    </div>  {/* end grid */}
                    <div className="flex justify-end gap-4 mt-4">
                      <button
                        type="button"
                        onClick={handleBirthDateCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Trở về
                      </button>
                      <button
                        type="button"
                        onClick={handleBirthDateConfirm}
                        className="px-4 py-2 bg-vgreen-primary text-white rounded-lg hover:bg-vgreen-accent transition-colors"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900" style={{textTransform:'none'}}>Bảo mật tài khoản</h3>
                      {!showChangePassword && (
                        <button
                          onClick={() => setShowChangePassword(true)}
                          className="bg-vgreen-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-vgreen-accent transition-colors"
                        >
                          <i className="fas fa-key mr-2"></i>
                          Đổi mật khẩu
                        </button>
                      )}
                    </div>
                    
                    {showChangePassword ? (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Đổi mật khẩu</h4>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
                            <input
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                              required
                            />
                          </div>
                          <div className="flex gap-4">
                            <button
                              type="submit"
                              className="bg-vgreen-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-vgreen-accent transition-colors"
                            >
                              Cập nhật
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowChangePassword(false)}
                              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                            >
                              Hủy
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Mật khẩu đăng nhập */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className="fas fa-key text-lime-500 text-xl mr-3"></i>
                                <div>
                                  <h4 className="font-semibold text-gray-900">Mật khẩu đăng nhập</h4>
                                  <p className="text-sm text-gray-600">Bảo vệ tài khoản đăng nhập</p>
                                </div>
                              </div>
                              <button className="px-3 py-1 bg-lime-100 text-lime-700 rounded-lg text-sm font-medium hover:bg-lime-200 transition-colors">
                                Thay đổi
                              </button>
                            </div>
                          </div>

                          {/* Mật khẩu rút tiền */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className="fas fa-lock text-lime-500 text-xl mr-3"></i>
                                <div>
                                  <h4 className="font-semibold text-gray-900">Mật khẩu rút tiền</h4>
                                  <p className="text-sm text-gray-600">Bảo mật giao dịch rút tiền</p>
                                </div>
                              </div>
                              <button className="px-3 py-1 bg-lime-100 text-lime-700 rounded-lg text-sm font-medium hover:bg-lime-200 transition-colors">
                                Thiết lập
                              </button>
                            </div>
                          </div>

                          {/* Xác nhận thư điện tử */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className="fas fa-envelope text-lime-500 text-xl mr-3"></i>
                                <div>
                                  <h4 className="font-semibold text-gray-900">Xác nhận thư điện tử</h4>
                                  <p className="text-sm text-gray-600">{userData.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium mr-2">
                                  Đã xác nhận
                                </span>
                                <i className="fas fa-check-circle text-green-500"></i>
                              </div>
                            </div>
                          </div>

                          {/* Số điện thoại */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <i className="fas fa-phone text-lime-500 text-xl mr-3"></i>
                                <div>
                                  <h4 className="font-semibold text-gray-900">Số điện thoại</h4>
                                  <p className="text-sm text-gray-600">{userData.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium mr-2">
                                  Đã xác nhận
                                </span>
                                <i className="fas fa-check-circle text-green-500"></i>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Thông tin bảo mật */}
                        <div className="bg-lime-50 border border-lime-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <i className="fas fa-shield-alt text-lime-600 text-lg mt-1 mr-3"></i>
                            <div>
                              <h4 className="font-semibold text-lime-800 mb-2">Tình trạng bảo mật tài khoản</h4>
                              <p className="text-sm text-lime-700">
                                Tài khoản của bạn đã được bảo vệ với các lớp bảo mật cần thiết. 
                                Hãy đảm bảo thông tin liên lạc luôn được cập nhật để nhận thông báo bảo mật.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === "transactions" && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6" style={{textTransform:'none'}}>Lịch sử giao dịch</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại giao dịch</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userData.transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <i className={`${getTransactionIcon(transaction.type)} mr-2`}></i>
                                  <span className="text-sm font-medium text-gray-900" style={{textTransform:'none'}}>
                                    {transaction.type === 'deposit' ? 'Nạp tiền' :
                                     transaction.type === 'withdraw' ? 'Rút tiền' :
                                     transaction.type === 'investment' ? 'Đầu tư' : 'Lợi nhuận'}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`text-sm font-semibold ${
                                  transaction.amount.startsWith('+') ? 'text-green-600' : 
                                  transaction.amount.startsWith('-') ? 'text-red-600' : 'text-gray-900'
                                }`}>
                                  {transaction.amount} vnđ
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString('vi-VN')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{textTransform:'none'}}>
                                {transaction.method}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                                  {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Withdraw Management Tab */}
              {activeTab === "withdraw" && (
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Quản lí rút tiền</h3>
                    <p className="text-gray-600">Rút tiền từ tài khoản về ngân hàng</p>
                  </div>

                  <form onSubmit={handleWithdraw} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">Phương thức rút tiền</label>
                      <div className="grid md:grid-cols-2 gap-4">
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
                            <div className="flex items-center space-x-3">
                              <i className={`${method.icon} text-xl ${
                                selectedPaymentMethod === method.id ? "text-vgreen-primary" : "text-gray-400"
                              }`}></i>
                              <div>
                                <div className="font-medium text-gray-900">{method.name}</div>
                                <div className="text-sm text-gray-600">Phí: {method.fee}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền rút</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent pr-16"
                          placeholder="Nhập số tiền muốn rút"
                          required
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">vnđ</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Số dư khả dụng: <span className="font-semibold text-vgreen-primary">{userData.balance} vnđ</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-vgreen-primary hover:bg-vgreen-accent text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      Xác nhận rút tiền
                    </button>
                  </form>
                </div>
              )}

              {/* Deposit Tab với hiệu ứng khung viền */}
              {activeTab === "deposit" && (
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Nạp tiền vào tài khoản</h3>
                    <p className="text-gray-600">Chọn phương thức và nhập số tiền muốn nạp</p>
                  </div>

                  <div className="animated-border glow-effect">
                    <form onSubmit={handleDeposit} className="bg-white p-6 rounded-xl space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">Chọn phương thức thanh toán</label>
                      <div className="grid md:grid-cols-2 gap-4">
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
                                  <div className="text-sm text-gray-600">Phí: {method.fee}</div>
                                </div>
                              </div>
                              {selectedPaymentMethod === method.id && (
                                <i className="fas fa-check-circle text-vgreen-primary"></i>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền nạp (vnđ)</label>
                      <input
                        type="text"
                        value={depositAmount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepositAmount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vgreen-primary focus:border-transparent"
                        placeholder="Nhập số tiền muốn nạp"
                        required
                      />
                      <div className="flex gap-2 mt-2">
                        {["1,000,000", "5,000,000", "10,000,000", "50,000,000"].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => setDepositAmount(amount)}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                          >
                            {amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="button-glow w-full bg-gradient-to-r from-lime-400 to-lime-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:from-lime-500 hover:to-lime-600 transition-all duration-300"
                    >
                      <i className="fas fa-arrow-down mr-2"></i>
                      Nạp tiền
                    </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Cards Tab */}
              {activeTab === "cards" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6" style={{textTransform:'none'}}>Thẻ của tôi</h3>
                    
                    {/* Card Balance */}
                    <div className="bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-2xl p-6 text-white mb-6 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Vinfast v-green card</h4>
                          <p className="text-lime-100">Thẻ đầu tư độc quyền</p>
                        </div>
                        <i className="fas fa-credit-card text-3xl opacity-80"></i>
                      </div>
                      <div className="mt-6">
                        <p className="text-sm text-lime-100">Số dư thẻ</p>
                        <p className="text-2xl font-bold">{userData.balance} vnđ</p>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-lime-300">
                        <span className="text-lime-100">**** **** **** 8888</span>
                        <span className="text-lime-100">12/26</span>
                      </div>
                    </div>

                    {/* Bank Information */}
                    <div className="bg-white border border-lime-200 rounded-2xl p-6 mb-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <i className="fas fa-university text-lime-500 text-xl mr-3"></i>
                        <h4 className="text-lg font-semibold text-gray-900" style={{textTransform:'none'}}>Thông tin tài khoản liên kết</h4>
                      </div>
                      <div className="bg-lime-50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Tên ngân hàng</p>
                            <p className="font-semibold text-gray-900">{userData.bankInfo.bankName}</p>
                          </div>
                          <div className="w-12 h-8 bg-lime-500 rounded flex items-center justify-center">
                            <i className="fas fa-building text-white text-sm"></i>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Số tài khoản</p>
                            <p className="font-mono font-bold text-lg text-lime-700">{userData.bankInfo.accountNumber}</p>
                          </div>
                          <button className="px-3 py-1 bg-lime-200 text-lime-800 rounded-lg text-sm font-medium hover:bg-lime-300 transition-colors">
                            <i className="fas fa-copy mr-1"></i>
                            Sao chép
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Chủ tài khoản</p>
                            <p className="font-semibold text-gray-900">{userData.bankInfo.accountHolder}</p>
                          </div>
                          <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-user text-white"></i>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start">
                          <i className="fas fa-info-circle text-yellow-600 mt-1 mr-2"></i>
                          <div>
                            <p className="text-sm text-yellow-800 font-medium">Thông tin quan trọng</p>
                            <p className="text-xs text-yellow-700 mt-1">Đây là tài khoản ngân hàng được liên kết để nhận tiền khi rút tiền từ hệ thống. Vui lòng kiểm tra thông tin chính xác.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Benefits */}
                    <div className="bg-white border border-lime-200 rounded-lg p-6 shadow-lg">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4" style={{textTransform:'none'}}>Quyền lợi thẻ v-green</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <i className="fas fa-check-circle text-lime-500 mr-3"></i>
                          <span className="text-gray-700">Miễn phí giao dịch đầu tư quỹ</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-check-circle text-lime-500 mr-3"></i>
                          <span className="text-gray-700">Ưu đãi lãi suất đầu tư lên đến 0.2%</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-check-circle text-lime-500 mr-3"></i>
                          <span className="text-gray-700">Tư vấn đầu tư 24/7</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-check-circle text-lime-500 mr-3"></i>
                          <span className="text-gray-700">Truy cập ưu tiên các quỹ vip</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-check-circle text-lime-500 mr-3"></i>
                          <span className="text-gray-700">Rút tiền nhanh trong ngày</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-check-circle text-lime-500 mr-3"></i>
                          <span className="text-gray-700">Hoàn tiền 0.1% mọi giao dịch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Profile;
