import { useState } from "react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-vgreen-primary to-success rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 animate-pulse"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 animate-slide-up">
          <div className="bg-gradient-to-r from-vgreen-primary to-success text-white p-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Hỗ Trợ VGreen</h4>
                <p className="text-sm opacity-90">Đang online</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto">
            <div className="mb-4">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">Xin chào! Tôi có thể hỗ trợ gì cho bạn về đầu tư VinFast?</p>
                <p className="text-xs text-gray-500 mt-1">9:30 AM</p>
              </div>
            </div>
          </div>
          
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vgreen-primary" 
              />
              <button className="bg-vgreen-primary text-white p-2 rounded-lg hover:bg-vgreen-secondary transition-colors">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
