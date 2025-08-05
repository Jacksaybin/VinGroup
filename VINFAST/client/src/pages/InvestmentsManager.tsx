import { useEffect, useState } from "react";
import ModalDeposit from "../components/ModalDeposit";
import ModalWithdraw from "../components/ModalWithdraw";

export default function InvestmentsManager() {
  const [investments, setInvestments] = useState([]);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [balance, setBalance] = useState(() => {
    const b = localStorage.getItem("balance");
    return b ? Number(b) : 0;
  });
  const [openWithdraw, setOpenWithdraw] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("investments");
    setInvestments(data ? JSON.parse(data) : []);
  }, []);
  const remove = (idx: number) => {
    const newList = investments.filter((_: any, i: number) => i !== idx);
    setInvestments(newList);
    localStorage.setItem("investments", JSON.stringify(newList));
  };

  const handleDeposit = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem("balance", String(newBalance));
    setOpenDeposit(false);
  };
  const handleWithdraw = (amount: number) => {
    const newBalance = balance - amount;
    setBalance(newBalance);
    localStorage.setItem("balance", String(newBalance));
    setOpenWithdraw(false);
  };
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý đầu tư</h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-lg text-blue-700">Số dư: {balance.toLocaleString()}đ</span>
          <button
            className="px-6 py-4 font-medium whitespace-nowrap text-gray-500 hover:text-gray-700 border border-blue-500 rounded-lg"
            onClick={() => setOpenDeposit(true)}
          >
            <i className="fas fa-arrow-down mr-2"></i>Nạp tiền
          </button>
          <button
            className="px-6 py-4 font-medium whitespace-nowrap text-gray-500 hover:text-gray-700 border border-red-500 rounded-lg"
            onClick={() => setOpenWithdraw(true)}
          >
            <i className="fas fa-arrow-up mr-2"></i>Rút tiền
          </button>
        </div>
      </div>
      {investments.length === 0 ? (
        <div>Chưa có khoản đầu tư nào.</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-1 py-1">Quỹ</th>
              <th className="px-1 py-1">Số tiền</th>
              <th className="px-1 py-1">Thời gian</th>
              <th className="px-1 py-1">Lợi nhuận</th>
              <th className="px-1 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv: any, idx: number) => (
              <tr key={idx} className="border-t">
                <td className="px-1 py-1">{inv.fundName}</td>
                <td className="px-1 py-1">{inv.amount}đ</td>
                <td className="px-1 py-1">{inv.days}</td>
                <td className="px-1 py-1">{inv.profit}</td>
                <td className="px-1 py-1"><button className="text-red-600" onClick={() => remove(idx)}>Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <a href="/" className="inline-block mt-6 text-blue-600 underline">Quay lại danh sách</a>
      {openDeposit && (
        <ModalDeposit onClose={() => setOpenDeposit(false)} onDeposit={handleDeposit} />
      )}
      {openWithdraw && (
        <ModalWithdraw onClose={() => setOpenWithdraw(false)} onWithdraw={handleWithdraw} max={balance} />
      )}
    </div>
  );
}
