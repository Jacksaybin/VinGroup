import { Link } from "wouter";
import { useState, useEffect } from "react";

interface NavItem {
	icon: string;
	label: string;
	href: string;
	active?: boolean;
}

interface MobileBottomNavProps {
	currentPath?: string;
}

export default function MobileBottomNav({ currentPath = "/" }: MobileBottomNavProps) {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	// Ẩn/hiện nav khi scroll
	useEffect(() => {
		const controlNavBar = () => {
			if (typeof window !== 'undefined') {
				if (window.scrollY > lastScrollY && window.scrollY > 100) {
					// Scrolling down & past threshold
					setIsVisible(false);
				} else {
					// Scrolling up
					setIsVisible(true);
				}
				setLastScrollY(window.scrollY);
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', controlNavBar);
			return () => {
				window.removeEventListener('scroll', controlNavBar);
			};
		}
	}, [lastScrollY]);

	const navItems: NavItem[] = [
		{
			icon: "🏠",
			label: "Trang chủ",
			href: "/",
			active: currentPath === "/"
		},
		{
			icon: "💰",
			label: "Đầu tư",
			href: "/investments",
			active: currentPath === "/investments"
		},
		{
			icon: "📊",
			label: "Portfolio",
			href: "/portfolio",
			active: currentPath === "/portfolio"
		},
		{
			icon: "📰",
			label: "Tin tức",
			href: "/news",
			active: currentPath === "/news"
		},
		{
			icon: "👤",
			label: "Tài khoản",
			href: "/profile",
			active: currentPath === "/profile"
		}
	];

	return (
		<>
			{/* Spacer để tránh content bị che */}
			<div className="h-20 md:hidden" />
			
			{/* Mobile Bottom Navigation */}
			<nav 
				className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden transition-transform duration-300 ${
					isVisible ? 'translate-y-0' : 'translate-y-full'
				}`}
			>
				<div className="grid grid-cols-5 h-16">
					{navItems.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 touch-manipulation ${
								item.active 
									? 'text-blue-600 bg-blue-50' 
									: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
							}`}
						>
							<span className="text-xl">{item.icon}</span>
							<span className="text-xs font-medium">{item.label}</span>
						</Link>
					))}
				</div>
			</nav>
		</>
	);
}
