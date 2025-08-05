import { useState } from "react";
import { useParams, Link } from "wouter";

// Funds data đồng bộ với InvestmentCards
const funds = [
	{
		name: "Quỹ Phát Triển Trạm Sạc VinFast",
		profit: "0.25%",
		days: 45,
		amount: "150,000,000đ",
		scale: "7,500,000,000đ",
		progress: "90%",
		progressNum: 90,
		color: "from-yellow-500 to-orange-600",
		border: "border-yellow-500",
		text: "text-yellow-700",
		image: "/assets/vinfast-vgreen-logo.png",
		description: "Quỹ đầu tư vào hệ thống trạm sạc VinFast, mang lại lợi ích cho người tiêu dùng và nhà đầu tư.",
		features: [
			"Lợi nhuận ổn định 0.25%/ngày",
			"Thời gian đầu tư ngắn hạn 45 ngày",
			"Được bảo đảm bởi tập đoàn VinGroup",
			"Thanh khoản cao, rút vốn linh hoạt"
		],
		risks: ["Thấp", "Phù hợp nhà đầu tư mới"],
		minInvestment: "10,000,000đ",
		fundManager: "VinGroup Asset Management",
		established: "2024",
		totalAssets: "7.5 tỷ VND"
	},
	{
		name: "Quỹ Năng Lượng Xanh VinEco",
		profit: "0.5%",
		days: 90,
		amount: "500,000,000đ",
		scale: "25,000,000,000đ",
		progress: "75%",
		progressNum: 75,
		color: "from-green-500 to-emerald-600",
		border: "border-green-500",
		text: "text-green-700",
		image: "/assets/vinfast-vgreen-logo.png",
		description: "Đầu tư vào công nghệ xanh và năng lượng tái tạo cho tương lai bền vững.",
		features: [
			"Đầu tư vào công nghệ xanh",
			"Hỗ trợ phát triển năng lượng tái tạo",
			"Lợi nhuận hấp dẫn 0.5%/ngày",
			"Tác động tích cực đến môi trường"
		],
		risks: ["Trung bình", "Có hỗ trợ từ chính phủ"],
		minInvestment: "50,000,000đ",
		fundManager: "VinEco Solutions",
		established: "2024",
		totalAssets: "25 tỷ VND"
	},
	{
		name: "Quỹ Công Nghệ Cao VinTech",
		profit: "1%",
		days: 180,
		amount: "1,000,000,000đ",
		scale: "50,000,000,000đ",
		progress: "60%",
		progressNum: 60,
		color: "from-blue-500 to-purple-600",
		border: "border-blue-500",
		text: "text-blue-700",
		image: "/assets/vinfast-vgreen-logo.png",
		description: "Đầu tư vào các công nghệ tiên tiến như AI, IoT và blockchain.",
		features: [
			"Công nghệ AI và Machine Learning",
			"Phát triển IoT thông minh",
			"Lợi nhuận cao 1%/ngày",
			"Hợp tác với các tập đoàn tech toàn cầu"
		],
		risks: ["Cao", "Tiềm năng tăng trưởng lớn"],
		minInvestment: "100,000,000đ",
		fundManager: "VinTech Ventures",
		established: "2024",
		totalAssets: "50 tỷ VND"
	}
];

// Modal đầu tư
function InvestmentModal({ fund, isOpen, onClose }: { fund: any; isOpen: boolean; onClose: () => void }) {
	const [amount, setAmount] = useState("");

	const handleInvest = () => {
		const investmentAmount = parseInt(amount.replace(/,/g, ""));
		if (investmentAmount > 0) {
			const data = localStorage.getItem("investments");
			const list = data ? JSON.parse(data) : [];
			list.push({
				fundName: fund.name,
				amount: investmentAmount,
				days: fund.days,
				profit: fund.profit,
				date: new Date().toISOString()
			});
			localStorage.setItem("investments", JSON.stringify(list));
			alert("Đầu tư thành công!");
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
			<div className="bg-white p-8 rounded-xl max-w-md w-full mx-4" onClick={(e: any) => e.stopPropagation()}>
				<h3 className="text-xl font-bold mb-4">Đầu tư vào {fund.name}</h3>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-2">Số tiền đầu tư (VND):</label>
					<input
						type="text"
						value={amount}
						onChange={(e: any) => setAmount(e.target.value)}
						placeholder="Tối thiểu: 1,000,000"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
					/>
				</div>
				<div className="flex gap-4">
					<button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg">Hủy</button>
					<button onClick={handleInvest} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Đầu tư</button>
				</div>
			</div>
		</div>
	);
}

export default function FundDetail() {
	const { id } = useParams();
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const fundIndex = parseInt(id || "0");
	const fund = funds[fundIndex];

	if (!fund) {
		return (
			<div className="min-h-screen bg-gray-50 py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy quỹ đầu tư</h2>
					<p className="text-gray-600 mb-8">Quỹ đầu tư bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
					<Link href="/" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
						Quay lại danh sách quỹ
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<Link 
						href="/" 
						className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
					>
						← Quay lại danh sách quỹ
					</Link>
				</div>

				{/* Main Content */}
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
					{/* Hero Section */}
					<div className={`bg-gradient-to-r ${fund.color} p-8 text-white`}>
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<h1 className="text-4xl font-bold mb-4">{fund.name}</h1>
								<p className="text-xl opacity-90 max-w-2xl">{fund.description}</p>
							</div>
							<div className="text-right">
								<div className="text-5xl font-bold mb-2">{fund.profit}</div>
								<div className="text-lg opacity-90">lợi nhuận/ngày</div>
							</div>
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid md:grid-cols-4 gap-6 p-8 bg-gray-50">
						<div className="text-center">
							<div className="text-3xl font-bold text-green-600 mb-2">{fund.profit}</div>
							<div className="text-sm text-gray-600">Lợi nhuận hàng ngày</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-blue-600 mb-2">{fund.days}</div>
							<div className="text-sm text-gray-600">Ngày đầu tư</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">{fund.progress}</div>
							<div className="text-sm text-gray-600">Tiến độ gọi vốn</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-orange-600 mb-2">{fund.scale}</div>
							<div className="text-sm text-gray-600">Quy mô quỹ</div>
						</div>
					</div>

					{/* Details */}
					<div className="grid lg:grid-cols-2 gap-8 p-8">
						{/* Left Column */}
						<div className="space-y-6">
							{/* Fund Info */}
							<div className="bg-gray-50 rounded-xl p-6">
								<h3 className="text-xl font-bold mb-4">Thông tin quỹ</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">Quản lý bởi:</span>
										<span className="font-semibold">{fund.fundManager}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Thành lập:</span>
										<span className="font-semibold">{fund.established}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Tổng tài sản:</span>
										<span className="font-semibold text-green-600">{fund.totalAssets}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Đầu tư tối thiểu:</span>
										<span className="font-semibold text-blue-600">{fund.minInvestment}</span>
									</div>
								</div>
							</div>

							{/* Features */}
							<div className="bg-gray-50 rounded-xl p-6">
								<h3 className="text-xl font-bold mb-4">Đặc điểm nổi bật</h3>
								<div className="space-y-3">
									{fund.features.map((feature: string, index: number) => (
										<div key={index} className="flex items-start gap-3">
											<div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
											<span className="text-gray-700">{feature}</span>
										</div>
									))}
								</div>
							</div>

							{/* Risk Assessment */}
							<div className="bg-gray-50 rounded-xl p-6">
								<h3 className="text-xl font-bold mb-4">Đánh giá rủi ro</h3>
								<div className="flex flex-wrap gap-2">
									{fund.risks.map((risk: string, index: number) => (
										<span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${
											risk.includes('Thấp') ? 'bg-green-100 text-green-700' :
											risk.includes('Trung bình') ? 'bg-yellow-100 text-yellow-700' :
											'bg-red-100 text-red-700'
										}`}>
											{risk}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className="space-y-6">
							{/* Investment Calculator */}
							<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
								<h3 className="text-xl font-bold mb-4 text-blue-800">Máy tính lợi nhuận</h3>
								<div className="space-y-4">
									<div className="grid grid-cols-3 gap-4 text-center">
										<div className="bg-white rounded-lg p-3">
											<div className="text-lg font-bold text-green-600">{fund.profit}</div>
											<div className="text-xs text-gray-600">1 ngày</div>
										</div>
										<div className="bg-white rounded-lg p-3">
											<div className="text-lg font-bold text-blue-600">{(parseFloat(fund.profit.replace('%', '')) * 30).toFixed(1)}%</div>
											<div className="text-xs text-gray-600">30 ngày</div>
										</div>
										<div className="bg-white rounded-lg p-3">
											<div className="text-lg font-bold text-purple-600">{(parseFloat(fund.profit.replace('%', '')) * fund.days).toFixed(1)}%</div>
											<div className="text-xs text-gray-600">{fund.days} ngày</div>
										</div>
									</div>
								</div>
							</div>

							{/* Investment Actions */}
							<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
								<h3 className="text-xl font-bold mb-4 text-green-800">Đầu tư ngay</h3>
								<div className="space-y-4">
									<div className="bg-white rounded-lg p-4">
										<div className="text-sm text-gray-600 mb-1">Số tiền đầu tư tối thiểu</div>
										<div className="text-2xl font-bold text-green-600">{fund.minInvestment}</div>
									</div>
									<button 
										onClick={() => setIsModalOpen(true)}
										className={`w-full bg-gradient-to-r ${fund.color} text-white py-4 px-6 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
									>
										💰 Đầu tư ngay
									</button>
								</div>
							</div>

							{/* Progress Tracking */}
							<div className="bg-gray-50 rounded-xl p-6">
								<h3 className="text-xl font-bold mb-4">Tiến độ gọi vốn</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">Đã huy động:</span>
										<span className="font-semibold">{fund.progress}</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-3">
										<div 
											className={`bg-gradient-to-r ${fund.color} h-3 rounded-full transition-all duration-1000`}
											style={{width: `${fund.progressNum}%`}}
										></div>
									</div>
									<div className="text-center text-sm text-gray-600">
										Còn lại: {100 - fund.progressNum}% chưa được huy động
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Investment Modal */}
			<InvestmentModal
				fund={fund}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
}
