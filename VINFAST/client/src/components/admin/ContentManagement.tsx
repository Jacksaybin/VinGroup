import React, { useState, useEffect } from 'react';import { useLocation } from 'wouter';export default function AdminBackend() {  const [, setLocation] = useLocation();  const [user, setUser] = useState<any>(null);  const [activeModule, setActiveModule] = useState('dashboard');  // Auto-login admin for development  useEffect(() => {    const adminUser = {      id: 'admin-001',      name: 'Admin VinFast',      email: 'admin@vinfast.vn',      role: 'admin',      token: 'test-admin-token'    };        localStorage.setItem('userData', JSON.stringify(adminUser));    localStorage.setItem('token', adminUser.token);    setUser(adminUser);  }, []);  const modules = [    { id: 'dashboard', name: 'Tổng Quan', icon: '📊' },    { id: 'users', name: 'Quản Lý Người Dùng', icon: '👥' },    { id: 'funds', name: 'Quản Lý Quỹ', icon: '💰' },    { id: 'transactions', name: 'Quản Lý Giao Dịch', icon: '💳' },    { id: 'content', name: 'Quản Lý Nội Dung', icon: '📝' },    { id: 'settings', name: 'Cài Đặt Hệ Thống', icon: '⚙️' },    { id: 'analytics', name: 'Thống Kê & Báo Cáo', icon: '📈' }  ];  return (    <div className="min-h-screen bg-white">      {/* Header */}      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">        <div className="flex items-center justify-between">          <div className="flex items-center space-x-4">            <div className="bg-gray-100 p-2 rounded-lg">              <img src="/vinfast-vgreen-logo.png" alt="VinFast V-Green" className="h-6" />            </div>            <div>              <h1 className="text-xl font-medium text-black">VinFast V-Green</h1>              <p className="text-sm text-gray-600">Admin Management System</p>            </div>          </div>          <div className="flex items-center space-x-4">            <div className="text-right">              <p className="text-sm text-black font-normal">{user?.name}</p>              <p className="text-xs text-gray-600">{user?.email}</p>            </div>            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black font-normal">              {user?.name?.charAt(0)}            </div>            <button               onClick={() => setLocation('/')}              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg text-black font-normal transition-all duration-200"            >              🏠 Trang Chủ            </button>          </div>        </div>      </header>      <div className="flex">        {/* Sidebar */}        <nav className="w-72 bg-gray-50 min-h-screen p-6 border-r border-gray-200">          <div className="mb-8">            <h3 className="text-lg font-normal text-black mb-2">Admin Modules</h3>            <div className="h-1 bg-gray-300 rounded-full"></div>          </div>                    <div className="space-y-3">            {modules.map((module) => (              <button                key={module.id}                onClick={() => setActiveModule(module.id)}                className={`w-full text-left px-5 py-4 rounded-lg flex items-center space-x-4 transition-all duration-200 ${                  activeModule === module.id                    ? 'bg-gray-200 text-black border border-gray-300'                    : 'text-gray-700 hover:bg-gray-100 hover:text-black border border-transparent'                }`}              >                <span className="text-xl">{module.icon}</span>                <div>                  <span className="font-normal">{module.name}</span>                  {activeModule === module.id && (                    <div className="text-xs text-gray-600 mt-1">Module đang hoạt động</div>                  )}                </div>              </button>            ))}          </div>          {/* Sidebar Footer */}          <div className="mt-12 p-4 bg-gray-100 border border-gray-200 rounded-lg">            <h4 className="text-black font-normal mb-2">🚀 System Status</h4>            <div className="space-y-2 text-sm">              <div className="flex items-center justify-between text-gray-700">                <span>Server:</span>                <span className="text-green-600">● Online</span>              </div>              <div className="flex items-center justify-between text-gray-700">                <span>Database:</span>                <span className="text-green-600">● Connected</span>              </div>            </div>          </div>        </nav>        {/* Main Content */}        <main className="flex-1 p-8 bg-white">          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">            <div className="flex items-center justify-between mb-8">              <div>                <h2 className="text-2xl font-normal text-black mb-2">                  {modules.find(m => m.id === activeModule)?.name}                </h2>                <p className="text-gray-600">Quản lý và theo dõi hệ thống VinFast V-Green</p>              </div>              <div className="text-3xl">                {modules.find(m => m.id === activeModule)?.icon}              </div>            </div>                        {activeModule === 'dashboard' && (              <div className="space-y-8">                {/* Stats Cards */}                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">                  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">                    <div className="flex items-center justify-between">                      <div>                        <h3 className="text-lg font-normal text-black">Tổng Người Dùng</h3>                        <p className="text-2xl font-normal text-black">1,234</p>                        <p className="text-sm text-gray-600 mt-1">+12% từ tháng trước</p>                      </div>                      <div className="text-3xl">👥</div>                    </div>                  </div>                                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">                    <div className="flex items-center justify-between">                      <div>                        <h3 className="text-lg font-normal text-black">Tổng Quỹ Đầu Tư</h3>                        <p className="text-2xl font-normal text-black">14</p>                        <p className="text-sm text-gray-600 mt-1">+2 quỹ mới</p>                      </div>                      <div className="text-3xl">💰</div>                    </div>                  </div>                                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">                    <div className="flex items-center justify-between">                      <div>                        <h3 className="text-lg font-normal text-black">Doanh Thu</h3>                        <p className="text-2xl font-normal text-black">2.5M USD</p>                        <p className="text-sm text-gray-600 mt-1">+25% tăng trưởng</p>                      </div>                      <div className="text-3xl">📈</div>                    </div>                  </div>                </div>                {/* Quick Actions */}                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">                  <h3 className="text-xl font-normal text-black mb-4">⚡ Thao Tác Nhanh</h3>                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">                    {[                      { name: 'Thêm Người Dùng', icon: '👤' },                      { name: 'Tạo Quỹ Mới', icon: '💎' },                      { name: 'Xem Báo Cáo', icon: '📊' },                      { name: 'Cài Đặt', icon: '⚙️' }                    ].map((action, index) => (                      <button                        key={index}                        className="bg-white border border-gray-200 p-4 rounded-lg text-black font-normal hover:bg-gray-50 transition-all duration-200 shadow-sm"                      >                        <div className="text-2xl mb-2">{action.icon}</div>                        <div className="text-sm">{action.name}</div>                      </button>                    ))}                  </div>                </div>              </div>            )}                        {activeModule !== 'dashboard' && (              <div className="text-center py-12">                <div className="text-4xl mb-4">                  {modules.find(m => m.id === activeModule)?.icon}                </div>                <h3 className="text-xl font-normal text-black mb-4">                  {modules.find(m => m.id === activeModule)?.name}                </h3>                <p className="text-gray-600 mb-6">                  Module đang được phát triển với đầy đủ chức năng quản trị.                </p>                <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">                  <p className="text-green-700 font-normal">✅ Bạn có quyền chỉnh sửa đầy đủ</p>                  <p className="text-gray-600 text-sm mt-2">                    Tất cả tính năng CRUD và quản lý dữ liệu đều khả dụng                  </p>                </div>              </div>            )}          </div>        </main>      </div>    </div>  );}import React, { useState } from 'react';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'blog' | 'news' | 'banner';
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'pages' | 'blog' | 'news' | 'banners'>('pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const [content, setContent] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Trang chủ VinFast V-Green',
      type: 'page',
      status: 'published',
      lastModified: '2024-08-05'
    },
    {
      id: '2',
      title: 'Về chúng tôi',
      type: 'page',
      status: 'published',
      lastModified: '2024-08-04'
    },
    {
      id: '3',
      title: 'VinFast ra mắt quỹ đầu tư mới',
      type: 'news',
      status: 'published',
      lastModified: '2024-08-03'
    },
    {
      id: '4',
      title: 'Banner khuyến mãi tháng 8',
      type: 'banner',
      status: 'draft',
      lastModified: '2024-08-05'
    }
  ]);

  const filteredContent = content.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === 'pages' ? item.type === 'page' :
     activeTab === 'blog' ? item.type === 'blog' :
     activeTab === 'news' ? item.type === 'news' :
     item.type === 'banner')
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Đã xuất bản';
      case 'draft': return 'Bản nháp';
      case 'archived': return 'Đã lưu trữ';
      default: return 'Không xác định';
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nội dung này?')) {
      setContent(content.filter(item => item.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: 'published' | 'draft' | 'archived') => {
    setContent(content.map(item => 
      item.id === id 
        ? { ...item, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
        : item
    ));
  };

  const handleAdd = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: 'Nội dung mới',
      type: activeTab === 'pages' ? 'page' : activeTab === 'blog' ? 'blog' : activeTab === 'news' ? 'news' : 'banner',
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0]
    };
    setContent([...content, newItem]);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-normal text-black">📝 Quản Lý Nội Dung</h2>
          <p className="text-sm text-gray-600 mt-1">Quản trị viên duy nhất - Toàn quyền điều hành</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-normal"
        >
          + Tạo Nội Dung Mới
        </button>
      </div>

      {/* Admin Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-normal text-sm">
            A
          </div>
          <div>
            <p className="text-black font-normal">Admin VinFast - Quản trị viên duy nhất</p>
            <p className="text-xs text-blue-600">Toàn quyền quản lý hệ thống • Không giới hạn chức năng</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'pages', label: 'Trang Web', icon: '📄', count: content.filter(c => c.type === 'page').length },
            { id: 'blog', label: 'Blog', icon: '📝', count: content.filter(c => c.type === 'blog').length },
            { id: 'news', label: 'Tin Tức', icon: '📰', count: content.filter(c => c.type === 'news').length },
            { id: 'banners', label: 'Banner', icon: '🎨', count: content.filter(c => c.type === 'banner').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-4 border-b-2 font-normal text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm nội dung..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:outline-none"
        />
        <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:outline-none">
          <option>Tất cả trạng thái</option>
          <option>Đã xuất bản</option>
          <option>Bản nháp</option>
          <option>Đã lưu trữ</option>
        </select>
        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg text-black">
          🔄 Làm mới
        </button>
      </div>

      {/* Content Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Cập nhật
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Thao tác Admin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredContent.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-normal text-black">{item.title}</div>
                  <div className="text-xs text-gray-500">ID: {item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="capitalize text-gray-600">{item.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                    className={`text-xs font-normal rounded border px-2 py-1 ${getStatusColor(item.status)}`}
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="published">Đã xuất bản</option>
                    <option value="archived">Đã lưu trữ</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.lastModified}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-normal space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    ✏️ Chỉnh sửa
                  </button>
                  <button className="text-green-600 hover:text-green-800 hover:underline">
                    👁️ Xem trước
                  </button>
                  <button className="text-orange-600 hover:text-orange-800 hover:underline">
                    📋 Sao chép
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 hover:underline"
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredContent.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>Không tìm thấy nội dung nào</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Tạo nội dung đầu tiên
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats - Single Admin View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Tổng Trang</h3>
          <p className="text-2xl font-normal text-black">{content.filter(c => c.type === 'page').length}</p>
          <p className="text-xs text-gray-500">Quản lý bởi Admin</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Bài Blog</h3>
          <p className="text-2xl font-normal text-black">{content.filter(c => c.type === 'blog').length}</p>
          <p className="text-xs text-gray-500">Toàn quyền chỉnh sửa</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Tin Tức</h3>
          <p className="text-2xl font-normal text-black">{content.filter(c => c.type === 'news').length}</p>
          <p className="text-xs text-gray-500">Không giới hạn</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Banner</h3>
          <p className="text-2xl font-normal text-black">{content.filter(c => c.type === 'banner').length}</p>
          <p className="text-xs text-gray-500">Quản trị viên duy nhất</p>
        </div>
      </div>

      {/* Single Admin Actions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-normal text-black mb-4">⚡ Thao Tác Admin Duy Nhất</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Thêm Nội Dung', icon: '➕', desc: 'Tạo mới' },
            { name: 'Xuất Bản Tất Cả', icon: '🚀', desc: 'Đăng ngay' },
            { name: 'Sao Lưu Dữ Liệu', icon: '💾', desc: 'Backup' },
            { name: 'Xóa Hàng Loạt', icon: '🗑️', desc: 'Multi-delete' },
            { name: 'Cài Đặt Hệ Thống', icon: '⚙️', desc: 'Settings' }
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

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-normal text-black mb-4">Tạo Nội Dung Mới</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Tiêu đề nội dung..."
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="page">Trang Web</option>
                <option value="blog">Blog</option>
                <option value="news">Tin Tức</option>
                <option value="banner">Banner</option>
              </select>
              <div className="flex space-x-3">
                <button 
                  onClick={handleAdd}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Tạo Ngay
                </button>
                <button 
                  onClick={() => setShowAddForm(false)}
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