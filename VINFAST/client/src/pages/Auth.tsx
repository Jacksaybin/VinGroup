import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const [tab, setTab] = useState<'login'|'register'>('login');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-leaf text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VinFast - VGreen</h1>
          <p className="text-gray-600">Nền tảng đầu tư trạm sạc thông minh</p>
        </div>
        
        <div className="flex justify-center gap-1 mb-8 bg-gray-100 p-1 rounded-lg">
          <button 
            className={`flex-1 px-4 py-2 font-medium rounded-md text-sm transition-all ${
              tab==='login'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`} 
            onClick={()=>setTab('login')}
          >
            Đăng nhập
          </button>
          <button 
            className={`flex-1 px-4 py-2 font-medium rounded-md text-sm transition-all ${
              tab==='register'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`} 
            onClick={()=>setTab('register')}
          >
            Đăng ký
          </button>
        </div>
        
        {tab==='login' && <LoginForm />}
        {tab==='register' && <RegisterForm />}
      </div>
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Validation
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      setLoading(false);
      return;
    }
    
    // Giả lập API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập loading
      
      // Kiểm tra thông tin đăng nhập (giả lập)
      if (username === 'admin' && password === 'admin123') {
        const userData = {
          email: 'admin@vinfast.vn',
          role: 'admin' as const,
          name: 'Quản trị viên',
          loginTime: new Date().toISOString()
        };
        login(userData);
        setLocation("/InvestmentsManager");
      } else if (username === 'user' && password === '123456') {
        const userData = {
          email: 'user@vinfast.vn',
          role: 'user' as const,
          name: 'Người dùng',
          loginTime: new Date().toISOString()
        };
        login(userData);
        setLocation("/");
      } else if (username.length >= 3 && password.length >= 6) {
        // Cho phép đăng nhập với tài khoản bất kỳ (demo)
        const userData = {
          email: `${username}@demo.com`,
          role: 'user' as const,
          name: username,
          loginTime: new Date().toISOString()
        };
        login(userData);
        setLocation("/");
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r-lg">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-user mr-2"></i>Tên đăng nhập
        </label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
          placeholder="admin hoặc user" 
          value={username} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-lock mr-2"></i>Mật khẩu
        </label>
        <input 
          type="password" 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
          placeholder="admin123 hoặc 123456" 
          value={password} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} 
          required 
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className={`w-full font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center ${
          loading 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transform hover:scale-105'
        }`}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Đang đăng nhập...
          </>
        ) : (
          <>
            <i className="fas fa-sign-in-alt mr-2"></i>
            Đăng nhập
          </>
        )}
      </button>
      
      <div className="text-center text-sm text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="font-medium mb-2">🎯 Tài khoản demo:</p>
        <p><strong>Admin:</strong> admin / admin123</p>
        <p><strong>User:</strong> user / 123456</p>
        <p className="text-xs mt-2">Hoặc nhập bất kỳ tên đăng nhập/mật khẩu nào</p>
      </div>
    </form>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [fullName, setFullName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Validation
    if (!username || !password || !confirm || !fullName || !referralCode) {
      setError('Vui lòng nhập đầy đủ thông tin bao gồm mã giới thiệu');
      setLoading(false);
      return;
    }
    
    // Kiểm tra mã giới thiệu bắt buộc
    if (referralCode !== 'VIC1150') {
      setError('Mã giới thiệu không hợp lệ. Vui lòng sử dụng mã: VIC1150');
      setLoading(false);
      return;
    }
    
    if (username.length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }
    
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }
    
    // Giả lập API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Lưu thông tin user mới (giả lập)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Kiểm tra username đã tồn tại
      if (users.find((u: any) => u.username === username)) {
        setError('Tên đăng nhập đã được sử dụng');
        setLoading(false);
        return;
      }
      
      // Xử lý mã giới thiệu VIC1150
      let bonusAmount = 100000; // Bonus 100,000 VNĐ cho người đăng ký với VIC1150
      
      const newUser = {
        username,
        password, // Trong thực tế cần hash password
        fullName,
        email: `${username}@demo.com`,
        role: 'user',
        referralCode: `REF${Date.now()}`, // Tạo mã giới thiệu cho user mới
        referredBy: 'VIC1150', // Được giới thiệu bởi mã VIC1150
        balance: bonusAmount, // Số dư ban đầu với bonus
        referralCount: 0,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Tự động đăng nhập sau khi đăng ký
      const userData = {
        email: newUser.email,
        role: 'user' as const,
        name: fullName,
        loginTime: new Date().toISOString()
      };
      
      login(userData);
      
      // Chuyển về trang chủ
      const successMessage = 'Đăng ký thành công! Bạn đã nhận bonus 100,000 VNĐ từ mã giới thiệu VIC1150. Đang chuyển về trang chủ...';
      
      setSuccess(successMessage);
      
      setTimeout(() => {
        setLocation("/");
      }, 2000);
      
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r-lg">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 text-green-700 px-4 py-3 rounded-r-lg">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            {success}
          </div>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-id-card mr-2"></i>Họ và tên *
        </label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
          placeholder="Nguyễn Văn A" 
          value={fullName} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFullName(e.target.value)} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-user mr-2"></i>Tên đăng nhập *
        </label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
          placeholder="Ít nhất 3 ký tự" 
          value={username} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-lock mr-2"></i>Mật khẩu *
        </label>
        <input 
          type="password" 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
          placeholder="Ít nhất 6 ký tự" 
          value={password} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-lock mr-2"></i>Nhập lại mật khẩu *
        </label>
        <input 
          type="password" 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
          placeholder="Nhập lại mật khẩu" 
          value={confirm} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConfirm(e.target.value)} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-gift mr-2"></i>Mã giới thiệu *
        </label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
          placeholder="Nhập mã: VIC1150" 
          value={referralCode} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setReferralCode(e.target.value.trim())} 
          required
        />
        <div className="mt-2 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
          <div className="flex items-center text-sm">
            <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
            <div>
              <p className="text-red-700 font-medium">⚠️ Bắt buộc sử dụng mã giới thiệu:</p>
              <p className="text-red-600">• Mã yêu cầu: <strong className="text-lg">VIC1150</strong></p>
              <p className="text-red-600">• Không thể đăng ký mà không có mã này</p>
            </div>
          </div>
        </div>
        <div className="mt-2 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center text-sm">
            <i className="fas fa-star text-yellow-500 mr-2"></i>
            <div>
              <p className="text-green-700 font-medium">🎁 Ưu đãi khi đăng ký:</p>
              <p className="text-green-600">• Nhận ngay: <strong>100,000 VNĐ</strong> vào tài khoản</p>
              <p className="text-green-600">• Miễn phí sử dụng tất cả tính năng</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <div className="flex items-center">
          <i className="fas fa-info-circle text-blue-600 mr-2"></i>
          <div>
            <p className="text-blue-700 text-sm font-medium">📝 Lưu ý quan trọng:</p>
            <p className="text-blue-600 text-sm">
              • Mã giới thiệu <strong>VIC1150</strong> là bắt buộc để đăng ký
            </p>
            <p className="text-blue-600 text-sm">
              • Sau khi đăng ký thành công, bạn sẽ nhận ngay 100,000 VNĐ vào tài khoản
            </p>
          </div>
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className={`w-full font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center ${
          loading 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-105'
        }`}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Đang đăng ký...
          </>
        ) : (
          <>
            <i className="fas fa-user-plus mr-2"></i>
            Đăng ký tài khoản
          </>
        )}
      </button>
    </form>
  );
}


