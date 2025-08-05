import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import ContentManagement from './ContentManagement';
import UserManagement from './UserManagement';
import FundManagement from './FundManagement';
import TransactionManagement from './TransactionManagement';

export default function AdminBackend() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [activeModule, setActiveModule] = useState('dashboard');

  // Single admin account - no role management needed
  useEffect(() => {
    const singleAdmin = {
      id: 'admin-vinfast-001',
      name: 'Admin VinFast',
      email: 'admin@vinfast.vn',
      role: 'single-admin',
      token: 'vinfast-single-admin-token',
      permissions: 'all' // Full access to everything
    };
    
    localStorage.setItem('userData', JSON.stringify(singleAdmin));
    localStorage.setItem('token', singleAdmin.token);
    setUser(singleAdmin);
  }, []);

  const modules = [
    { id: 'dashboard', name: 'Tổng Quan Hệ Thống', icon: '📊', desc: 'Dashboard chính' },
    { id: 'users', name: 'Quản Lý Người Dùng', icon: '👥', desc: 'Toàn quyền' },
    { id: 'funds', name: 'Quản Lý Quỹ Đầu Tư', icon: '💰', desc: 'Không giới hạn' },
    { id: 'transactions', name: 'Quản Lý Giao Dịch', icon: '💳', desc: 'Toàn bộ quyền' },
    { id: 'content', name: 'Quản Lý Nội Dung', icon: '📝', desc: 'Chỉnh sửa tự do' },
    { id: 'settings', name: 'Cài Đặt Hệ Thống', icon: '⚙️', desc: 'Config hệ thống' },
    { id: 'analytics', name: 'Thống Kê & Báo Cáo', icon: '📈', desc: 'Xem tất cả' }
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'content':
        return <ContentManagement />;
      case 'users':
        return <UserManagement />;
      case 'funds':
        return <FundManagement />;
      case 'transactions':
        return <TransactionManagement />;
      default:
        return (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">
              {modules.find(m => m.id === activeModule)?.icon}
            </div>
            <h3 className="text-xl font-normal text-black mb-2">
              {modules.find(m => m.id === activeModule)?.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {modules.find(m => m.id === activeModule)?.desc}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-blue-700 font-normal">✅ Admin duy nhất - Toàn quyền truy cập</p>
              <p className="text-gray-600 text-sm mt-2">
                Module này đang được phát triển với đầy đủ chức năng admin
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <img src="/vinfast-vgreen-logo.png" alt="VinFast V-Green" className="h-6" />
            </div>
            <div>
              <h1 className="text-xl font-normal text-black">VinFast V-Green Admin</h1>
              <p className="text-sm text-gray-600">Hệ thống quản trị viên duy nhất</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1">
              <p className="text-xs text-green-700 font-normal">👑 Quản trị viên duy nhất</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-black font-normal">{user?.name}</p>
              <p className="text-xs text-gray-600">Toàn quyền hệ thống</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-normal">
              {user?.name?.charAt(0)}
            </div>
            <button 
              onClick={() => setLocation('/')}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg text-black font-normal transition-all duration-200"
            >
              🏠 Về Trang Chủ
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-72 bg-gray-50 min-h-screen p-6 border-r border-gray-200">
          <div className="mb-6">
            <h3 className="text-lg font-normal text-black mb-2">Modules Quản Trị</h3>
            <div className="h-1 bg-blue-500 rounded-full"></div>
            <p className="text-xs text-gray-600 mt-2">Không phân quyền • Toàn quyền truy cập</p>
          </div>
          
          <div className="space-y-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full text-left px-4 py-4 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                  activeModule === module.id
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black border border-transparent'
                }`}
              >
                <span className="text-xl">{module.icon}</span>
                <div className="flex-1">
                  <span className="font-normal block">{module.name}</span>
                  <span className="text-xs text-gray-500">{module.desc}</span>
                  {activeModule === module.id && (
                    <div className="text-xs text-blue-600 mt-1">● Đang hoạt động</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Single Admin Status */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-black font-normal mb-3">👑 Admin Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-700">
                <span>Account:</span>
                <span className="text-blue-600">Single Admin</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Permissions:</span>
                <span className="text-green-600">● Full Access</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Restrictions:</span>
                <span className="text-green-600">● None</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            {activeModule === 'dashboard' ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-normal text-black mb-2">📊 Tổng Quan Hệ Thống</h2>
                    <p className="text-gray-600">Dashboard dành cho quản trị viên duy nhất</p>
                  </div>
                  <div className="bg-blue-100 px-4 py-2 rounded-lg">
                    <span className="text-blue-800 text-sm font-normal">👑 Single Admin Mode</span>
                  </div>
                </div>
                
                {/* Single Admin Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-normal text-black">Tổng Người Dùng</h3>
                        <p className="text-2xl font-normal text-black">1,234</p>
                        <p className="text-sm text-gray-600 mt-1">Quản lý hoàn toàn</p>
                      </div>
                      <div className="text-3xl">👥</div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-normal text-black">Tổng Quỹ Đầu Tư</h3>
                        <p className="text-2xl font-normal text-black">14</p>
                        <p className="text-sm text-gray-600 mt-1">Toàn quyền điều hành</p>
                      </div>
                      <div className="text-3xl">💰</div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-normal text-black">Doanh Thu</h3>
                        <p className="text-2xl font-normal text-black">2.5M USD</p>
                        <p className="text-sm text-gray-600 mt-1">Kiểm soát tuyệt đối</p>
                      </div>
                      <div className="text-3xl">📈</div>
                    </div>
                  </div>
                </div>

                {/* Single Admin Quick Actions */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-normal text-black mb-4">⚡ Thao Tác Nhanh - Admin Duy Nhất</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Thêm Người Dùng', icon: '👤', desc: 'Không giới hạn' },
                      { name: 'Tạo Quỹ Mới', icon: '💎', desc: 'Toàn quyền' },
                      { name: 'Xem Tất Cả Báo Cáo', icon: '📊', desc: 'Không hạn chế' },
                      { name: 'Cài Đặt Hệ Thống', icon: '⚙️', desc: 'Full access' }
                    ].map((action, index) => (
                      <button
                        key={index}
                        className="bg-white border border-gray-200 p-4 rounded-lg text-black font-normal hover:bg-gray-50 transition-all duration-200 text-center"
                      >
                        <div className="text-2xl mb-2">{action.icon}</div>
                        <div className="text-sm font-normal">{action.name}</div>
                        <div className="text-xs text-gray-500">{action.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              renderModuleContent()
            )}
          </div>
        </main>
      </div>

      {/* Admin Dashboard:
- User Management
- Fund Management  
- Transaction Management
- Content Management

© 2024 VinFast V-Green
"@ | Out-File -FilePath "README.md" -Encoding UTF8 */}
    </div>
  );
}

import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'investor' | 'premium' | 'vip';
  status: 'active' | 'inactive' | 'suspended';
  balance: number;
  joinDate: string;
  lastLogin: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      type: 'premium',
      status: 'active',
      balance: 1500000,
      joinDate: '2024-01-15',
      lastLogin: '2024-08-05'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@gmail.com',
      type: 'vip',
      status: 'active',
      balance: 5000000,
      joinDate: '2024-02-20',
      lastLogin: '2024-08-04'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'levanc@gmail.com',
      type: 'investor',
      status: 'inactive',
      balance: 800000,
      joinDate: '2024-03-10',
      lastLogin: '2024-07-28'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'investor': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa user này?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: newStatus }
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-normal text-black">👥 Quản Lý Người Dùng</h2>
          <p className="text-sm text-gray-600 mt-1">Toàn quyền quản lý tất cả tài khoản người dùng - Admin duy nhất</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-normal">
            📤 Export Excel
          </button>
          <button 
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-normal"
          >
            + Thêm User
          </button>
        </div>
      </div>

      {/* Admin Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-normal text-sm">
            A
          </div>
          <div>
            <p className="text-black font-normal">Admin VinFast - Quản trị viên duy nhất</p>
            <p className="text-xs text-blue-600">Toàn quyền quản lý users • Không giới hạn chức năng • CRUD hoàn toàn</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Tổng Users</h3>
          <p className="text-2xl font-normal text-black">{users.length}</p>
          <p className="text-xs text-gray-500">Quản lý hoàn toàn</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Users Hoạt Động</h3>
          <p className="text-2xl font-normal text-green-600">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs text-gray-500">Đang online</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">VIP Members</h3>
          <p className="text-2xl font-normal text-purple-600">{users.filter(u => u.type === 'vip').length}</p>
          <p className="text-xs text-gray-500">Tier cao nhất</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Tổng Balance</h3>
          <p className="text-2xl font-normal text-black">{(users.reduce((sum, user) => sum + user.balance, 0) / 1000000).toFixed(1)}M VND</p>
          <p className="text-xs text-gray-500">Trong hệ thống</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:outline-none"
        />
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Tất cả users</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Không hoạt động</option>
          <option value="suspended">Bị khóa</option>
        </select>
        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg text-black">
          🔄 Làm mới
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Loại tài khoản
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Số dư
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Đăng nhập cuối
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Thao tác Admin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-normal text-black">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-normal rounded border ${getTypeColor(user.type)}`}>
                    {user.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value as any)}
                    className={`text-xs font-normal rounded border px-2 py-1 ${getStatusColor(user.status)}`}
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                    <option value="suspended">Bị khóa</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.balance.toLocaleString()} VND
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-normal space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    👁️ Xem
                  </button>
                  <button className="text-green-600 hover:text-green-800 hover:underline">
                    ✏️ Sửa
                  </button>
                  <button className="text-orange-600 hover:text-orange-800 hover:underline">
                    📧 Email
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 hover:underline"
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">👥</div>
            <p>Không tìm thấy user nào</p>
            <button 
              onClick={() => setShowAddUser(true)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Tạo user đầu tiên
            </button>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-normal text-black mb-4">⚡ Thao Tác Admin Duy Nhất</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { name: 'Gửi Email Hàng Loạt', icon: '📧', desc: 'Bulk email' },
            { name: 'Nâng Cấp VIP', icon: '⭐', desc: 'Upgrade tier' },
            { name: 'Reset Password', icon: '🔑', desc: 'Reset pass' },
            { name: 'Export Tất Cả', icon: '📋', desc: 'Export data' },
            { name: 'Khóa Hàng Loạt', icon: '🚫', desc: 'Bulk suspend' },
            { name: 'Backup Users', icon: '💾', desc: 'Data backup' }
          ].map((action, index) => (
            <button
              key={index}
              className="bg-white border border-gray-200 p-4 rounded-lg text-black font-normal hover:bg-gray-50 transition-all duration-200 text-center"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm font-normal">{action.name}</div>
              <div className="text-xs text-gray-500">{action.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-normal text-black mb-4">Thêm User Mới</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Tên người dùng..."
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input 
                type="email" 
                placeholder="Email..."
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="investor">Investor</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
              <input 
                type="number" 
                placeholder="Số dư ban đầu..."
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    // Add logic here
                    setShowAddUser(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Tạo User
                </button>
                <button 
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

#### Backend:
🚀 Server running on http://localhost:5000
📊 API Health: http://localhost:5000/api/health
🔗 Admin Backend: http://localhost:3001/#/admin-backend