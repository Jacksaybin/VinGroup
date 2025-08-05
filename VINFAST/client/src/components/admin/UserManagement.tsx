import React, { useState } from 'react';

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'dividend' | 'fee';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  fundName?: string;
  paymentMethod: string;
  transactionDate: string;
  processedBy?: string;
  reference: string;
}

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      userId: '1',
      userName: 'Nguyễn Văn A',
      type: 'investment',
      amount: 10000000,
      status: 'completed',
      fundName: 'VinFast Green Growth Fund',
      paymentMethod: 'Bank Transfer',
      transactionDate: '2024-08-05',
      processedBy: 'Admin VinFast',
      reference: 'INV-2024080501'
    },
    {
      id: 'TXN002',
      userId: '2',
      userName: 'Trần Thị B',
      type: 'deposit',
      amount: 5000000,
      status: 'pending',
      paymentMethod: 'Credit Card',
      transactionDate: '2024-08-05',
      reference: 'DEP-2024080502'
    },
    {
      id: 'TXN003',
      userId: '3',
      userName: 'Lê Văn C',
      type: 'withdrawal',
      amount: 2000000,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      transactionDate: '2024-08-04',
      reference: 'WTH-2024080403'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'bg-green-100 text-green-800 border-green-200';
      case 'withdrawal': return 'bg-red-100 text-red-800 border-red-200';
      case 'investment': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'dividend': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'fee': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'completed' | 'failed' | 'cancelled') => {
    setTransactions(transactions.map(txn => 
      txn.id === id 
        ? { ...txn, status: newStatus, processedBy: newStatus === 'completed' ? 'Admin VinFast' : txn.processedBy }
        : txn
    ));
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || txn.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-normal text-black">💳 Quản Lý Giao Dịch</h2>
          <p className="text-sm text-gray-600 mt-1">Toàn quyền phê duyệt và quản lý tất cả giao dịch</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-normal">
            📊 Báo Cáo Giao Dịch
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-white font-normal">
            ⚡ Phê Duyệt Hàng Loạt
          </button>
        </div>
      </div>

      {/* Admin Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-normal text-sm">
            💳
          </div>
          <div>
            <p className="text-black font-normal">Transaction Manager - Quản trị viên duy nhất</p>
            <p className="text-xs text-blue-600">Toàn quyền phê duyệt • Xử lý giao dịch • Reconciliation • Không giới hạn</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Tổng Giao Dịch</h3>
          <p className="text-2xl font-normal text-black">{transactions.length}</p>
          <p className="text-xs text-gray-500">Tất cả loại</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Chờ Duyệt</h3>
          <p className="text-2xl font-normal text-yellow-600">{transactions.filter(t => t.status === 'pending').length}</p>
          <p className="text-xs text-gray-500">Cần xử lý</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Hoàn Thành</h3>
          <p className="text-2xl font-normal text-green-600">{transactions.filter(t => t.status === 'completed').length}</p>
          <p className="text-xs text-gray-500">Đã xử lý</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-normal text-black">Tổng Giá Trị</h3>
          <p className="text-2xl font-normal text-black">{(transactions.reduce((sum, txn) => sum + txn.amount, 0) / 1000000).toFixed(0)}M VND</p>
          <p className="text-xs text-gray-500">Toàn bộ giao dịch</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm giao dịch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:outline-none"
        />
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-black focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="completed">Hoàn thành</option>
          <option value="failed">Thất bại</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-black">
          <option>Tất cả loại</option>
          <option>Nạp tiền</option>
          <option>Rút tiền</option>
          <option>Đầu tư</option>
          <option>Cổ tức</option>
        </select>
        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg text-black">
          🔄 Làm mới
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Giao dịch
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Số tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-normal text-black uppercase tracking-wider">
                Thao tác Admin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-normal text-black">{txn.reference}</div>
                    <div className="text-xs text-gray-500">{txn.fundName || txn.paymentMethod}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-normal text-black">{txn.userName}</div>
                  <div className="text-xs text-gray-500">ID: {txn.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-normal rounded border ${getTypeColor(txn.type)}`}>
                    {txn.type === 'deposit' ? 'NẠP TIỀN' : 
                     txn.type === 'withdrawal' ? 'RÚT TIỀN' :
                     txn.type === 'investment' ? 'ĐẦU TƯ' :
                     txn.type === 'dividend' ? 'CỔ TỨC' : 'PHÍ'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-normal ${txn.type === 'withdrawal' || txn.type === 'fee' ? 'text-red-600' : 'text-green-600'}`}>
                    {txn.type === 'withdrawal' || txn.type === 'fee' ? '-' : '+'}{txn.amount.toLocaleString()} VND
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={txn.status}
                    onChange={(e) => handleStatusChange(txn.id, e.target.value as any)}
                    className={`text-xs font-normal rounded border px-2 py-1 ${getStatusColor(txn.status)}`}
                  >
                    <option value="pending">Chờ duyệt</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="failed">Thất bại</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {txn.transactionDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-normal space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    👁️ Chi tiết
                  </button>
                  <button className="text-green-600 hover:text-green-800 hover:underline">
                    ✅ Duyệt
                  </button>
                  <button className="text-orange-600 hover:text-orange-800 hover:underline">
                    📧 Thông báo
                  </button>
                  <button className="text-red-600 hover:text-red-800 hover:underline">
                    ❌ Từ chối
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Admin Actions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-normal text-black mb-4">⚡ Thao Tác Giao Dịch - Admin Duy Nhất</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { name: 'Phê Duyệt Hàng Loạt', icon: '✅', desc: 'Bulk approval' },
            { name: 'Reconciliation', icon: '🔄', desc: 'Bank matching' },
            { name: 'Fraud Detection', icon: '🚨', desc: 'Risk check' },
            { name: 'Export Báo Cáo', icon: '📊', desc: 'Transaction report' },
            { name: 'Refund Management', icon: '💸', desc: 'Process refunds' },
            { name: 'Backup Data', icon: '💾', desc: 'Transaction backup' }
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
    </div>
  );
}