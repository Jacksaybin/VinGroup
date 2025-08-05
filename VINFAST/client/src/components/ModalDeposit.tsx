import React, { useState } from "react";

interface ModalDepositProps {
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const ModalDeposit: React.FC<ModalDepositProps> = ({ onClose, onDeposit }) => {
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
        <h2 className="text-2xl font-bold mb-4 text-center">Nạp tiền vào ví</h2>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-lg"
          placeholder="Nhập số tiền muốn nạp"
          value={amount}
          min={0}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-lg transition-all"
          onClick={() => onDeposit(amount)}
          disabled={amount <= 0}
        >
          Xác nhận nạp tiền
        </button>
      </div>
    </div>
  );
};

export default ModalDeposit;
