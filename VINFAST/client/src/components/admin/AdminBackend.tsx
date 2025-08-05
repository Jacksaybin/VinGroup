import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

// Inline components to avoid import issues
const AdminDashboard = () => (
  <div className="p-6 space-y-6">
    {/* Welcome Header */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">
            Tổng quan hệ thống VinFast V-Green Platform
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">System Uptime</p>
          <p className="text-3xl font-bold">99.9%</p>
        </div>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Tổng Người Dùng</p>
            <p className="text-2xl font-bold text-gray-900">2,847</p>
            <p className="text-sm text-green-600">+23 hôm nay</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-users text-blue-600"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Người Dùng Hoạt Động</p>
            <p className="text-2xl font-bold text-gray-900">1,923</p>
            <p className="text-sm text-green-600">67.5% tổng</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-user-check text-green-600"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Tổng Vốn Đầu Tư</p>
            <p className="text-2xl font-bold text-gray-900">2.4T vnđ</p>
            <p className="text-sm text-green-600">+12% tháng này</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-chart-line text-purple-600"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Giao Dịch Hôm Nay</p>
            <p className="text-2xl font-bold text-gray-900">847</p>
            <p className="text-sm text-green-600">+18% so với hôm qua</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-exchange-alt text-orange-600"></i>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Thao Tác Nhanh</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-plus text-blue-600"></i>
          </div>
          <span className="font-medium text-gray-900">Thêm Quỹ</span>
        </button>

        <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-user-plus text-green-600"></i>
          </div>
          <span className="font-medium text-gray-900">Thêm Admin</span>
        </button>

        <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-newspaper text-purple-600"></i>
          </div>
          <span className="font-medium text-gray-900">Đăng Tin</span>
        </button>

        <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-database text-orange-600"></i>
          </div>
          <span className="font-medium text-gray-900">Backup</span>
        </button>
      </div>
    </div>
  </div>
);

const UserManagement = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Quản Lý Người Dùng</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Tổng Người Dùng</h3>
        <p className="text-2xl font-bold text-blue-600">2,847</p>
        <p className="text-sm text-blue-600">+23 hôm nay</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Đang Hoạt Động</h3>
        <p className="text-2xl font-bold text-green-600">1,923</p>
        <p className="text-sm text-green-600">67.5% tổng</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-4">
        <h3 className="font-semibold text-orange-900 mb-2">Cần Xem Xét</h3>
        <p className="text-2xl font-bold text-orange-600">47</p>
        <p className="text-sm text-orange-600">Tài khoản đình chỉ</p>
      </div>
    </div>
    
    <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Danh Sách Người Dùng</h4>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-2 text-sm font-medium text-gray-600">Tên</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Email</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Vai Trò</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Trạng Thái</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 text-sm">Nguyễn Văn A</td>
                <td className="py-3 text-sm text-gray-600">nguyenvana@email.com</td>
                <td className="py-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">User</span></td>
                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Hoạt động</span></td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">Xem</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Khóa</button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 text-sm">Trần Thị B</td>
                <td className="py-3 text-sm text-gray-600">tranthib@email.com</td>
                <td className="py-3"><span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Admin</span></td>
                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Hoạt động</span></td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">Xem</button>
                  <button className="text-yellow-600 hover:text-yellow-800 text-sm">Sửa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const FundManagement = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Quản Lý Quỹ Đầu Tư</h2>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Tổng Quỹ</h3>
        <p className="text-2xl font-bold text-blue-600">12</p>
        <p className="text-sm text-blue-600">Quỹ đang hoạt động</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Tổng Vốn</h3>
        <p className="text-2xl font-bold text-green-600">2.5T vnđ</p>
        <p className="text-sm text-green-600">Vốn được quản lý</p>
      </div>
      <div className="bg-purple-50 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">Nhà Đầu Tư</h3>
        <p className="text-2xl font-bold text-purple-600">8,439</p>
        <p className="text-sm text-purple-600">Tổng nhà đầu tư</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-4">
        <h3 className="font-semibold text-orange-900 mb-2">Lợi Nhuận Trung Bình</h3>
        <p className="text-2xl font-bold text-orange-600">+12.4%</p>
        <p className="text-sm text-orange-600">30 ngày qua</p>
      </div>
    </div>
    
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Danh Sách Quỹ Đầu Tư</h4>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
          <i className="fas fa-plus mr-2"></i>Thêm Quỹ Mới
        </button>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold">Quỹ Tích Lũy VinGroup</h5>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Hoạt động</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vốn quản lý:</span>
                <span className="font-medium">450B vnđ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nhà đầu tư:</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lợi nhuận:</span>
                <span className="font-medium text-green-600">+8.5%</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">Chi tiết</button>
              <button className="text-yellow-600 hover:text-yellow-800 text-sm">Chỉnh sửa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TransactionManagement = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Quản Lý Giao Dịch</h2>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Giao Dịch Hôm Nay</h3>
        <p className="text-2xl font-bold text-blue-600">847</p>
        <p className="text-sm text-blue-600">+12% so với hôm qua</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Tổng Giá Trị</h3>
        <p className="text-2xl font-bold text-green-600">2.8B vnđ</p>
        <p className="text-sm text-green-600">Giá trị giao dịch hôm nay</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-4">
        <h3 className="font-semibold text-orange-900 mb-2">Chờ Xử Lý</h3>
        <p className="text-2xl font-bold text-orange-600">23</p>
        <p className="text-sm text-orange-600">Giao dịch pending</p>
      </div>
      <div className="bg-red-50 rounded-lg p-4">
        <h3 className="font-semibold text-red-900 mb-2">Thất Bại</h3>
        <p className="text-2xl font-bold text-red-600">5</p>
        <p className="text-sm text-red-600">Cần xem xét</p>
      </div>
    </div>
    
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Giao Dịch Gần Đây</h4>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-2 text-sm font-medium text-gray-600">ID</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Người Dùng</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Loại</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Số Tiền</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Trạng Thái</th>
                <th className="pb-2 text-sm font-medium text-gray-600">Thời Gian</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 text-sm font-mono">#TX847291</td>
                <td className="py-3 text-sm">Nguyễn Văn A</td>
                <td className="py-3 text-sm">Nạp tiền</td>
                <td className="py-3 text-sm font-medium">5,000,000 vnđ</td>
                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Thành công</span></td>
                <td className="py-3 text-sm text-gray-600">2 phút trước</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 text-sm font-mono">#TX847290</td>
                <td className="py-3 text-sm">Trần Thị B</td>
                <td className="py-3 text-sm">Đầu tư</td>
                <td className="py-3 text-sm font-medium">10,000,000 vnđ</td>
                <td className="py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Chờ xử lý</span></td>
                <td className="py-3 text-sm text-gray-600">5 phút trước</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const ContentManagement = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Quản Lý Nội Dung</h2>
    <p className="text-gray-600">Module quản lý nội dung đang được phát triển...</p>
  </div>
);

const SystemSettings = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Cài Đặt Hệ Thống</h2>
    <p className="text-gray-600">Module cài đặt hệ thống đang được phát triển...</p>
  </div>
);

const Analytics = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Thống Kê & Báo Cáo</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Doanh Thu Tháng</h3>
        <p className="text-2xl font-bold text-blue-600">47.2B vnđ</p>
        <p className="text-sm text-blue-600">+18.5% so với tháng trước</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Người Dùng Mới</h3>
        <p className="text-2xl font-bold text-green-600">1,249</p>
        <p className="text-sm text-green-600">+23% so với tháng trước</p>
      </div>
      <div className="bg-purple-50 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">Tỷ Lệ Chuyển Đổi</h3>
        <p className="text-2xl font-bold text-purple-600">3.4%</p>
        <p className="text-sm text-purple-600">Từ khách thăm thành nhà đầu tư</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-4">
        <h3 className="font-semibold text-orange-900 mb-2">Điểm Hài Lòng</h3>
        <p className="text-2xl font-bold text-orange-600">4.8/5</p>
        <p className="text-sm text-orange-600">Đánh giá từ người dùng</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Biểu Đồ Doanh Thu</h4>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-chart-line text-4xl text-gray-400 mb-2"></i>
            <p className="text-gray-600">Biểu đồ doanh thu theo thời gian</p>
            <p className="text-sm text-gray-500 mt-1">Tích hợp Chart.js coming soon</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Tăng Trưởng Người Dùng</h4>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-chart-bar text-4xl text-gray-400 mb-2"></i>
            <p className="text-gray-600">Biểu đồ tăng trưởng người dùng</p>
            <p className="text-sm text-gray-500 mt-1">Tích hợp Chart.js coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function AdminBackend() {
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Auto-create admin user for development/testing
    const createTestAdmin = () => {
      const testAdmin = {
        id: 1,
        name: 'Admin VinFast',
        email: 'admin@vinfast.vn',
        role: 'admin',
        isLoggedIn: true
      };
      localStorage.setItem('userData', JSON.stringify(testAdmin));
      localStorage.setItem('authToken', 'test-admin-token');
      localStorage.setItem('isLoggedIn', 'true');
      return testAdmin;
    };

    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'admin') {
        setUser(parsedUser);
      } else {
        // Create admin for non-admin users accessing admin backend
        const adminUser = createTestAdmin();
        setUser(adminUser);
      }
    } else {
      // Create admin if no user data exists
      const adminUser = createTestAdmin();
      setUser(adminUser);
    }
  }, [setLocation]);

  const adminSections = [
    {
      id: 'dashboard',
      label: 'Tổng Quan',
      icon: 'fas fa-tachometer-alt',
      component: AdminDashboard,
      color: 'bg-blue-500'
    },
    {
      id: 'users',
      label: 'Quản Lý Người Dùng',
      icon: 'fas fa-users',
      component: UserManagement,
      color: 'bg-green-500'
    },
    {
      id: 'funds',
      label: 'Quản Lý Quỹ',
      icon: 'fas fa-coins',
      component: FundManagement,
      color: 'bg-purple-500'
    },
    {
      id: 'transactions',
      label: 'Quản Lý Giao Dịch',
      icon: 'fas fa-exchange-alt',
      component: TransactionManagement,
      color: 'bg-orange-500'
    },
    {
      id: 'content',
      label: 'Quản Lý Nội Dung',
      icon: 'fas fa-edit',
      component: ContentManagement,
      color: 'bg-pink-500'
    },
    {
      id: 'settings',
      label: 'Cài Đặt Hệ Thống',
      icon: 'fas fa-cogs',
      component: SystemSettings,
      color: 'bg-gray-500'
    },
    {
      id: 'analytics',
      label: 'Thống Kê & Báo Cáo',
      icon: 'fas fa-chart-bar',
      component: Analytics,
      color: 'bg-indigo-500'
    }
  ];

  const ActiveComponent = adminSections.find(section => section.id === activeSection)?.component || AdminDashboard;

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    setLocation('/');
  };

  const goToUserSite = () => {
    setLocation('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/assets/vinfast-vgreen-logo.png" alt="VGreen Admin" className="h-8 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-white">VinFast V-Green Admin</h1>
                <p className="text-sm text-gray-400">Hệ thống quản trị</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>

              <button
                onClick={goToUserSite}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Quay lại trang chính"
              >
                <i className="fas fa-home"></i>
              </button>

              <button
                onClick={handleLogout}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors"
                title="Đăng xuất"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`bg-gray-800 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } min-h-screen`}>
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-300`}></i>
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {adminSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? `${section.color} text-white shadow-lg`
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <i className={`${section.icon} ${sidebarCollapsed ? 'text-lg' : ''}`}></i>
                {!sidebarCollapsed && <span className="font-medium">{section.label}</span>}
              </button>
            ))}
          </nav>

          {!sidebarCollapsed && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <h4 className="text-sm font-medium text-white mb-2">Admin Tools</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-300 hover:text-white">
                    <i className="fas fa-database mr-2"></i>
                    Backup Database
                  </button>
                  <button className="w-full text-left text-sm text-gray-300 hover:text-white">
                    <i className="fas fa-sync mr-2"></i>
                    System Sync
                  </button>
                  <button className="w-full text-left text-sm text-gray-300 hover:text-white">
                    <i className="fas fa-bug mr-2"></i>
                    Debug Mode
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <i className={`${adminSections.find(s => s.id === activeSection)?.icon} text-2xl text-gray-700`}></i>
                <h2 className="text-3xl font-bold text-gray-900">
                  {adminSections.find(s => s.id === activeSection)?.label}
                </h2>
              </div>
              <p className="text-gray-600">
                Quản lý và điều hành hệ thống VinFast V-Green Platform
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
