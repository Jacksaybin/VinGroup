import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Interfaces
interface User {
  email: string;
  approved: boolean;
  balance: number;
  password: string;
  createdAt?: string;
}

interface Fund {
  id: number;
  name: string;
  profit: string;
  days: number;
  color: string;
  image: string;
}

// Lấy danh sách user và quỹ từ localStorage (giả lập)
function getUsers(): User[] {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function setUsers(users: User[]) {
  localStorage.setItem("users", JSON.stringify(users));
}
function getFunds(): Fund[] {
  return JSON.parse(localStorage.getItem("funds") || "[]");
}
function setFunds(funds: Fund[]) {
  localStorage.setItem("funds", JSON.stringify(funds));
}

export default function AdminManager() {
  const [users, setUsersState] = useState<User[]>([]);
  const [funds, setFundsState] = useState<Fund[]>([]);
  const [tab, setTab] = useState<'users'|'funds'|'stats'|'investments'>("users");
  const [currentUser, setCurrentUser] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        setUsersState(getUsers());
        setFundsState(getFunds());
        setCurrentUser(localStorage.getItem("user"));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Chỉ cho phép admin truy cập
  useEffect(() => {
    if (!loading && currentUser !== "admin@vinfast.vn") {
      setLocation("/auth");
    }
  }, [currentUser, setLocation, loading]);

  // Duyệt user
  const approveUser = (email: string) => {
    const updated = users.map(u => u.email === email ? { ...u, approved: true } : u);
    setUsers(updated);
    setUsersState(updated);
  };

  // Từ chối user
  const rejectUser = (email: string) => {
    const updated = users.filter(u => u.email !== email);
    setUsers(updated);
    setUsersState(updated);
  };

  // Cộng/trừ tiền
  const adjustBalance = (email: string, amount: number) => {
    const updated = users.map(u => u.email === email ? { ...u, balance: (u.balance||0) + amount } : u);
    setUsers(updated);
    setUsersState(updated);
  };

  // Reset mật khẩu
  const resetPassword = (email: string) => {
    const updated = users.map(u => u.email === email ? { ...u, password: "123456" } : u);
    setUsers(updated);
    setUsersState(updated);
    alert("Đã reset mật khẩu về 123456");
  };

  // Sửa quỹ
  const editFund = (id: number, field: keyof Fund, value: string | number) => {
    const updated = funds.map(f => f.id === id ? { ...f, [field]: value } : f);
    setFunds(updated);
    setFundsState(updated);
  };

  // Lấy danh sách đầu tư
  const getInvestments = () => {
    return JSON.parse(localStorage.getItem("investments") || "[]");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">VGreen Admin Manager</h1>
              <p className="text-gray-600 mt-1">Quản lý hệ thống VinFast VGreen</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Đăng nhập với</p>
              <p className="font-medium text-green-600">{currentUser}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex flex-wrap gap-2 mb-6 border-b">
            {[
              { key: 'users', label: '👥 Người dùng', count: users.length },
              { key: 'funds', label: '💰 Quỹ đầu tư', count: funds.length },
              { key: 'investments', label: '📊 Đầu tư', count: getInvestments().length },
              { key: 'stats', label: '📈 Thống kê', count: null }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  tab === key
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setTab(key as any)}
              >
                {label} {count !== null && <span className="ml-1 bg-white/20 px-2 py-1 rounded-full text-xs">({count})</span>}
              </button>
            ))}
          </div>
          {/* Users Tab */}
          {tab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h2>
                <div className="text-sm text-gray-500">
                  Đã duyệt: {users.filter(u => u.approved).length} / {users.length}
                </div>
              </div>
              
              <div className="overflow-x-auto bg-gray-50 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-center">Trạng thái</th>
                      <th className="px-4 py-3 text-center">Số dư (VND)</th>
                      <th className="px-4 py-3 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, idx) => (
                      <tr key={u.email} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-4 py-3 font-medium">{u.email}</td>
                        <td className="px-4 py-3 text-center">
                          {u.approved ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              ✅ Đã duyệt
                            </span>
                          ) : (
                            <div className="space-x-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                                onClick={() => approveUser(u.email)}
                              >
                                ✓ Duyệt
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                                onClick={() => rejectUser(u.email)}
                              >
                                🗑️ Xóa tài khoản
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="font-medium">{(u.balance || 0).toLocaleString()}</span>
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors"
                              onClick={() => adjustBalance(u.email, 1000000)}
                            >
                              +1M
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                              onClick={() => adjustBalance(u.email, -1000000)}
                            >
                              -1M
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                            onClick={() => resetPassword(u.email)}
                          >
                            🔄 Reset PW
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">Chưa có người dùng nào đăng ký</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Funds Tab */}
          {tab === "funds" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý quỹ đầu tư</h2>
              
              <div className="overflow-x-auto bg-gray-50 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Tên quỹ</th>
                      <th className="px-4 py-3 text-center">Lợi nhuận</th>
                      <th className="px-4 py-3 text-center">Thời gian (ngày)</th>
                      <th className="px-4 py-3 text-center">Màu sắc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funds.map((f, idx) => (
                      <tr key={f.id} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-4 py-3 font-medium">{f.id}</td>
                        <td className="px-4 py-3">
                          <input
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-500 focus:outline-none"
                            value={f.name}
                            onChange={e => editFund(f.id, 'name', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            className="w-20 border border-gray-300 rounded px-2 py-1 text-center focus:border-green-500 focus:outline-none"
                            value={f.profit}
                            onChange={e => editFund(f.id, 'profit', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            className="w-20 border border-gray-300 rounded px-2 py-1 text-center focus:border-green-500 focus:outline-none"
                            value={f.days}
                            onChange={e => editFund(f.id, 'days', parseInt(e.target.value) || 0)}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className={`w-8 h-8 rounded-full mx-auto ${f.color} border-2 border-gray-300`}></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {funds.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">Chưa có quỹ đầu tư nào</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Investments Tab */}
          {tab === "investments" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Danh sách đầu tư</h2>
              
              <div className="overflow-x-auto bg-gray-50 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="px-4 py-3 text-left">Tên quỹ</th>
                      <th className="px-4 py-3 text-center">Số tiền (VND)</th>
                      <th className="px-4 py-3 text-center">Thời gian (ngày)</th>
                      <th className="px-4 py-3 text-center">Lợi nhuận</th>
                      <th className="px-4 py-3 text-center">Ngày đầu tư</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getInvestments().map((inv: any, idx: number) => (
                      <tr key={idx} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-4 py-3 font-medium">{inv.fundName}</td>
                        <td className="px-4 py-3 text-center font-medium">{inv.amount?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">{inv.days}</td>
                        <td className="px-4 py-3 text-center text-green-600 font-medium">{inv.profit}</td>
                        <td className="px-4 py-3 text-center">{inv.createdAt || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {getInvestments().length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">Chưa có giao dịch đầu tư nào</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Stats Tab */}
          {tab === "stats" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Thống kê hệ thống</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Tổng quỹ đầu tư</p>
                      <p className="text-3xl font-bold">{funds.length}</p>
                    </div>
                    <div className="text-4xl">💰</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Giao dịch đầu tư</p>
                      <p className="text-3xl font-bold">{getInvestments().length}</p>
                    </div>
                    <div className="text-4xl">📊</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Thống kê tài chính</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng số dư hệ thống:</span>
                      <span className="font-bold text-green-600">
                        {users.reduce((a, b) => a + (b.balance || 0), 0).toLocaleString()} VND
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng tiền đầu tư:</span>
                      <span className="font-bold text-blue-600">
                        {getInvestments().reduce((a: number, b: any) => a + (b.amount || 0), 0).toLocaleString()} VND
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số dư trung bình:</span>
                      <span className="font-bold text-purple-600">
                        {users.length > 0 ? Math.round(users.reduce((a, b) => a + (b.balance || 0), 0) / users.length).toLocaleString() : 0} VND
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Thống kê hoạt động</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tỷ lệ duyệt user:</span>
                      <span className="font-bold text-green-600">
                        {users.length > 0 ? Math.round((users.filter(u => u.approved).length / users.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quỹ phổ biến nhất:</span>
                      <span className="font-bold text-blue-600">
                        {getInvestments().length > 0 ? 
                          getInvestments().reduce((a: any, b: any) => 
                            getInvestments().filter((v: any) => v.fundName === a).length >= 
                            getInvestments().filter((v: any) => v.fundName === b.fundName).length ? a : b.fundName, 
                            getInvestments()[0]?.fundName
                          ) : 'N/A'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đầu tư trung bình:</span>
                      <span className="font-bold text-purple-600">
                        {getInvestments().length > 0 ? 
                          Math.round(getInvestments().reduce((a: number, b: any) => a + (b.amount || 0), 0) / getInvestments().length).toLocaleString() : 0
                        } VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
