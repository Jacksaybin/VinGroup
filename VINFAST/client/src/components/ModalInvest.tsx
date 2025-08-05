import React, { useState } from "react";

interface ModalInvestProps {
  fundIdx: number;
  onClose: () => void;
  onInvest: (idx: number, amount: number) => void;
}

const ModalInvest: React.FC<ModalInvestProps> = ({ fundIdx, onClose, onInvest }) => {
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
        <h2 className="text-2xl font-bold mb-4 text-center">Đầu tư vào quỹ #{fundIdx + 1}</h2>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-lg"
          placeholder="Nhập số tiền đầu tư"
          value={amount}
          min={0}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <button
          className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-lg font-bold text-lg transition-all"
          onClick={() => onInvest(fundIdx, amount)}
          disabled={amount <= 0}
        >
          Xác nhận đầu tư
        </button>
      </div>
    </div>
  );
};

export default ModalInvest;
