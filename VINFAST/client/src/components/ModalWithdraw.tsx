import React, { useState } from "react";

interface ModalWithdrawProps {
  onClose: () => void;
  onWithdraw: (amount: number) => void;
  max: number;
}

const ModalWithdraw: React.FC<ModalWithdrawProps> = ({ onClose, onWithdraw, max }) => {
  const [amount, setAmount] = useState(0);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Rút tiền từ ví</h2>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-lg"
          placeholder={`Tối đa: ${max.toLocaleString()}đ`}
          value={amount}
          min={0}
          max={max}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold text-lg transition-all"
          onClick={() => onWithdraw(amount)}
          disabled={amount <= 0 || amount > max}
        >
          Xác nhận rút tiền
        </button>
      </div>
    </div>
  );
};

export default ModalWithdraw;
