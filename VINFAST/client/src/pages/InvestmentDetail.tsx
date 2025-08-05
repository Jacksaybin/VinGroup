import { useLocation } from "wouter";
import { funds } from "../components/InvestmentCards";

export default function InvestmentDetail() {
  const [location] = useLocation();
  const id = parseInt(location.split("/").pop() || "0", 10);
  const fund = funds[id];
  if (!fund) return <div className="p-8">Không tìm thấy quỹ đầu tư.</div>;
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{fund.name}</h1>
      <img src={fund.image} alt={fund.name} className="w-full h-80 object-cover rounded-2xl mb-4" />
      <div className="mb-2">Lợi nhuận: <b>{fund.profit}</b></div>
      <div className="mb-2">Thời gian: <b>{fund.days}</b></div>
      <div className="mb-2">Số tiền đầu tư: <b>{fund.amount}</b></div>
      <div className="mb-2">Quy mô dự án: <b>{fund.scale}</b></div>
      <div className="mb-2">Tiến độ: <b>{fund.progress}</b></div>
      <a href="/" className="text-blue-600 underline">Quay lại danh sách</a>
    </div>
  );
}
