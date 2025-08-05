import { useCallback, useRef, TouchEvent } from 'react';

interface SwipeHandlerProps {
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
	threshold?: number;
	children: React.ReactNode;
	className?: string;
}

export default function SwipeHandler({
	onSwipeLeft,
	onSwipeRight,
	onSwipeUp,
	onSwipeDown,
	threshold = 50,
	children,
	className = ""
}: SwipeHandlerProps) {
	const startPos = useRef<{ x: number; y: number } | null>(null);

	const handleTouchStart = useCallback((e: TouchEvent) => {
		const touch = e.touches[0];
		startPos.current = {
			x: touch.clientX,
			y: touch.clientY
		};
	}, []);

	const handleTouchEnd = useCallback((e: TouchEvent) => {
		if (!startPos.current) return;

		const touch = e.changedTouches[0];
		const deltaX = touch.clientX - startPos.current.x;
		const deltaY = touch.clientY - startPos.current.y;

		// Horizontal swipe
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			if (Math.abs(deltaX) > threshold) {
				if (deltaX > 0) {
					onSwipeRight?.();
				} else {
					onSwipeLeft?.();
				}
			}
		}
		// Vertical swipe
		else {
			if (Math.abs(deltaY) > threshold) {
				if (deltaY > 0) {
					onSwipeDown?.();
				} else {
					onSwipeUp?.();
				}
			}
		}

		startPos.current = null;
	}, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);

	return (
		<div
			className={className}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			{children}
		</div>
	);
}
