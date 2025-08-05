import { useState, useEffect } from "react";
import { Link } from "wouter";
import type { InvestmentFund } from "../../../shared/schema";

// Simple test page to display all 14 funds
export default function TestFunds() {
	const [funds, setFunds] = useState<InvestmentFund[]>([]);

	useEffect(() => {
		// Direct fallback data - 14 funds
		const allFunds = [
			{
				id: "DC40",
				name: "Quỹ Phát Triển Trạm Sạc DC 40kW",
				code: "DC40",
				category: "Hạ tầng sạc",
				minInvestment: "25,000,000 VND",
				dailyReturn: "0.031",
				progress: 85,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-40kw.jpg",
				description: "Quỹ đầu tư phát triển hệ thống trạm sạc DC 40kW",
				features: ["ROI 11.3%/năm", "Thanh khoản cao", "An toàn"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "500,000,000 VND",
				projectScale: "50 trạm sạc"
			},
			{
				id: "DC60",
				name: "Quỹ Phát Triển Trạm Sạc DC 60kW",
				code: "DC60",
				category: "Hạ tầng sạc",
				minInvestment: "50,000,000 VND",
				dailyReturn: "0.033",
				progress: 78,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-60kw.jpg",
				description: "Quỹ đầu tư phát triển trạm sạc DC 60kW",
				features: ["ROI 12.0%/năm", "Thanh khoản tốt", "Ổn định"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "800,000,000 VND",
				projectScale: "75 trạm sạc"
			},
			{
				id: "DC80",
				name: "Quỹ Phát Triển Trạm Sạc DC 80kW",
				code: "DC80",
				category: "Hạ tầng sạc",
				minInvestment: "75,000,000 VND",
				dailyReturn: "0.035",
				progress: 92,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-80kw.jpg",
				description: "Quỹ phát triển hệ thống trạm sạc DC 80kW",
				features: ["ROI 12.8%/năm", "Tăng trưởng ổn định", "Rủi ro thấp"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "1,200,000,000 VND",
				projectScale: "100 trạm sạc"
			},
			{
				id: "DC120",
				name: "Quỹ Phát Triển Trạm Sạc DC 120kW",
				code: "DC120",
				category: "Hạ tầng sạc",
				minInvestment: "100,000,000 VND",
				dailyReturn: "0.037",
				progress: 88,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-120kw.jpg",
				description: "Quỹ đầu tư trạm sạc DC 120kW",
				features: ["ROI 13.5%/năm", "Hiệu suất cao", "Tăng trưởng bền vững"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "1,500,000,000 VND",
				projectScale: "125 trạm sạc"
			},
			{
				id: "DC150",
				name: "Quỹ Phát Triển Trạm Sạc DC 150kW",
				code: "DC150",
				category: "Hạ tầng sạc",
				minInvestment: "150,000,000 VND",
				dailyReturn: "0.039",
				progress: 76,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-150kw.jpg",
				description: "Quỹ phát triển trạm sạc DC 150kW cao cấp",
				features: ["ROI 14.2%/năm", "Công nghệ tiên tiến", "Lợi nhuận cao"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "2,000,000,000 VND",
				projectScale: "150 trạm sạc"
			},
			{
				id: "3D300",
				name: "Quỹ Công Nghệ Trạm Sạc 3D 300kW",
				code: "3D300",
				category: "Công nghệ 3D",
				minInvestment: "5,000,000,000 VND",
				dailyReturn: "0.055",
				progress: 45,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-3d-300kw.jpg",
				description: "Quỹ đầu tư công nghệ trạm sạc 3D 300kW",
				features: ["ROI 20.1%/năm", "Công nghệ 3D", "AI tích hợp"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 548,
				maxInvestment: "50,000,000,000 VND",
				projectScale: "20 trạm sạc 3D"
			},
			{
				id: "TICH",
				name: "Quỹ Mô Hình Tích Lũy VinGroup",
				code: "TICH",
				category: "Tích lũy",
				minInvestment: "10,000,000 VND",
				dailyReturn: "0.025",
				progress: 95,
				image: "/assets/quy-mo-the-tich-luy-vingroup.jpg",
				description: "Quỹ tích lũy dài hạn với VinGroup",
				features: ["ROI 9.1%/năm", "Tích lũy dài hạn", "Ổn định"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "200,000,000 VND",
				projectScale: "Toàn quốc"
			},
			{
				id: "THUONG",
				name: "Quỹ Gói Thương VinFast",
				code: "THUONG",
				category: "Gói Thương",
				minInvestment: "50,000,000 VND",
				dailyReturn: "0.034",
				progress: 82,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-goi-thuong.jpg",
				description: "Gói đầu tư thương mại cho doanh nghiệp",
				features: ["ROI 12.4%/năm", "Dành cho doanh nghiệp", "Hỗ trợ tối đa"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "1,000,000,000 VND",
				projectScale: "200 điểm"
			},
			{
				id: "VIP",
				name: "Quỹ Gói VIP VinFast",
				code: "VIP",
				category: "Gói VIP",
				minInvestment: "1,000,000,000 VND",
				dailyReturn: "0.045",
				progress: 65,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-goi-vip.jpg",
				description: "Gói đầu tư VIP cao cấp với dịch vụ độc quyền",
				features: ["ROI 16.4%/năm", "Dịch vụ VIP", "Lợi nhuận cao"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "10,000,000,000 VND",
				projectScale: "50 điểm VIP"
			},
			{
				id: "VIC01",
				name: "Quỹ Phát Triển Trạm Sạc VinFast VIC01",
				code: "VIC01",
				category: "Gói Thương",
				minInvestment: "100,000,000 VND",
				dailyReturn: "0.034",
				progress: 75,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-vic01.jpg",
				description: "Quỹ đầu tư phát triển hệ thống trạm sạc VinFast",
				features: ["ROI 12.5%/năm", "Thanh khoản cao", "An toàn"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "1,000,000,000 VND",
				projectScale: "50 trạm sạc"
			},
			{
				id: "VIC03",
				name: "Quỹ Phát Triển Trạm Sạc VinFast VIC03",
				code: "VIC03",
				category: "Gói Thương",
				minInvestment: "300,000,000 VND",
				dailyReturn: "0.036",
				progress: 68,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-vic03.jpg",
				description: "Quỹ đầu tư phát triển trạm sạc cho khu vực thương mại",
				features: ["ROI 13.2%/năm", "Thanh khoản tốt", "Ổn định"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "2,000,000,000 VND",
				projectScale: "75 trạm sạc"
			},
			{
				id: "VIC07",
				name: "Quỹ Phát Triển Trạm Sạc VinFast VIC07",
				code: "VIC07",
				category: "Gói Thương",
				minInvestment: "700,000,000 VND",
				dailyReturn: "0.039",
				progress: 82,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-vic07.jpg",
				description: "Quỹ phát triển hệ thống trạm sạc tại trung tâm thương mại",
				features: ["ROI 14.1%/năm", "Tăng trưởng ổn định", "Rủi ro thấp"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "3,500,000,000 VND",
				projectScale: "100 trạm sạc"
			},
			{
				id: "VIC16",
				name: "Quỹ Phát Triển Trạm Sạc VinFast VIC16",
				code: "VIC16",
				category: "Gói VIP",
				minInvestment: "1,600,000,000 VND",
				dailyReturn: "0.042",
				progress: 58,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-vic16.jpg",
				description: "Quỹ VIP phát triển mạng lưới trạm sạc cao cấp",
				features: ["ROI 15.3%/năm", "Mạng lưới cao cấp", "Lợi nhuận ổn định"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 365,
				maxInvestment: "8,000,000,000 VND",
				projectScale: "120 trạm sạc"
			},
			{
				id: "VIC25",
				name: "Quỹ Phát Triển Trạm Sạc VinFast VIC25",
				code: "VIC25",
				category: "Gói VIP",
				minInvestment: "10,000,000,000 VND",
				dailyReturn: "0.06",
				progress: 35,
				image: "/assets/quy-phat-trien-tram-sac-vinfast-vic25.jpg",
				description: "Quỹ VIP cao cấp nhất phát triển hệ thống trạm sạc thông minh",
				features: ["ROI 21.9%/năm", "Hệ thống thông minh", "Lợi nhuận cao nhất"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				duration: 730,
				maxInvestment: "100,000,000,000 VND",
				projectScale: "250 trạm sạc"
			}
		];
		
		console.log("🎯 Setting 14 funds:", allFunds.length);
		setFunds(allFunds);
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-4">Test - Hiển thị 14 Quỹ Đầu Tư VGreen</h1>
					<p className="text-gray-600">Trang test để kiểm tra hiển thị đầy đủ 14 quỹ đầu tư</p>
					<div className="mt-4">
						<span className="text-lg font-semibold text-green-600">
							Hiện có: {funds.length} quỹ đầu tư
						</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{funds.map((fund, index) => (
						<div key={fund.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
							<div className="relative">
								<img
									src={fund.image}
									alt={fund.name}
									className="w-full h-48 object-cover"
									onError={(e: any) => {
										e.target.src = '/assets/default-fund.jpg';
									}}
								/>
								<div className="absolute top-4 right-4">
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">
										#{index + 1}
									</span>
								</div>
								<div className="absolute top-4 left-4">
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
										{fund.code}
									</span>
								</div>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold mb-2 line-clamp-2">{fund.name}</h3>
								<p className="text-gray-600 text-sm mb-4 line-clamp-2">{fund.description}</p>
								
								<div className="space-y-2 mb-4">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Danh mục:</span>
										<span className="font-semibold text-purple-600">{fund.category}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Lợi nhuận/ngày:</span>
										<span className="font-semibold text-green-600">{(parseFloat(fund.dailyReturn) * 100).toFixed(2)}%</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Đầu tư tối thiểu:</span>
										<span className="font-semibold text-blue-600">{fund.minInvestment}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Tiến độ:</span>
										<span className="font-semibold text-orange-600">{fund.progress}%</span>
									</div>
								</div>

								<div className="w-full bg-gray-200 rounded-full h-2 mb-4">
									<div 
										className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
										style={{width: `${fund.progress}%`}}
									></div>
								</div>

								<Link href={`/fund/${fund.id}`}>
									<button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
										Xem chi tiết
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-8">
					<Link href="/" className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
						← Quay lại Dashboard
					</Link>
				</div>
			</div>
		</div>
	);
}
