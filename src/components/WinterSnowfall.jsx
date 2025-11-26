import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Snowflake } from 'lucide-react';

// 1. THÊM ẢNH HỘP QUÀ MỚI VÀO ĐÂY
// Đảm bảo bạn đã bỏ ảnh vào thư mục public và dùng dấu / ở đầu
const GIFT_IMAGES = [
    "/image_1.png",
    "/image_2.png",
    "/image_3.png",
    "/image_4.png"
];

const WinterSnowfall = ({ onGiftClick }) => {
    const [snowflakes, setSnowflakes] = useState([]);
    const [fallingGifts, setFallingGifts] = useState([]);

    // --- Logic tạo tuyết (Giữ nguyên hoặc chỉnh nếu muốn) ---
    useEffect(() => {
        const flakes = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: Math.random() * 5 + 10 + 's',
            animationDelay: Math.random() * -15 + 's',
            size: Math.random() * 1 + 0.5 + 'rem',
            opacity: Math.random() * 0.6 + 0.4,
        }));
        setSnowflakes(flakes);
    }, []);

    // --- Logic tạo hộp quà ---
    const spawnGift = useCallback(() => {
        const id = Date.now();
        const newGift = {
            id: id,
            left: Math.random() * 80 + 10,
            animationDuration: Math.random() * 3 + 6 + 's',
            imageSrc: GIFT_IMAGES[Math.floor(Math.random() * GIFT_IMAGES.length)], // Nó sẽ tự chọn ngẫu nhiên trong 3 ảnh
            rotationDuration: Math.random() * 4 + 4 + 's'
        };

        setFallingGifts(prev => [...prev, newGift]);

        // Xóa quà sau khi rơi xong để nhẹ máy
        setTimeout(() => {
            setFallingGifts(prev => prev.filter(g => g.id !== id));
        }, parseInt(newGift.animationDuration) * 1000 + 1000);

    }, []);

    // 2. CHỈNH SỬA TỐC ĐỘ RA QUÀ TẠI ĐÂY
    useEffect(() => {
        const interval = setInterval(() => {
            // Logic cũ: > 0.5 (50% cơ hội)
            // Logic mới: > 0.2 (80% cơ hội xuất hiện mỗi lần kiểm tra) -> Quà ra nhiều hơn
            if (Math.random() > 0.2) {
                spawnGift();
            }
        }, Math.random() * 1000 + 500); // Kiểm tra mỗi 0.5s đến 1.5s (Nhanh hơn nhiều so với cũ là 2-5s)

        return () => clearInterval(interval);
    }, [spawnGift]);

    return ReactDOM.createPortal(
        <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden font-sans">
            <style>{`
                @keyframes snow-fall-screen {
                    0% { transform: translateY(-10vh) translateX(0); }
                    100% { transform: translateY(110vh) translateX(5px); }
                }
                @keyframes gift-fall-screen {
                    0% { transform: translateY(-20vh); }
                    100% { transform: translateY(120vh); }
                }
                @keyframes spin-gift {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
            `}</style>

            {/* Render Snowflakes */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute text-white/60 animate-spin-slow drop-shadow-sm"
                    style={{
                        left: `${flake.left}%`,
                        top: `-5vh`,
                        fontSize: flake.size,
                        opacity: flake.opacity,
                        animation: `snow-fall-screen ${flake.animationDuration} linear infinite, spin ${Math.random() * 10 + 5}s linear infinite`,
                        animationDelay: flake.animationDelay,
                    }}
                >
                    <Snowflake />
                </div>
            ))}

            {/* Render Falling Gifts */}
            {fallingGifts.map((gift) => (
                <div
                    key={gift.id}
                    className="absolute z-[9999] cursor-pointer pointer-events-auto transition-transform hover:scale-110"
                    style={{
                        left: `${gift.left}%`,
                        top: '-20vh',
                        animation: `gift-fall-screen ${gift.animationDuration} linear forwards`,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onGiftClick();
                        setFallingGifts(prev => prev.filter(g => g.id !== gift.id));
                    }}
                >
                    <img
                        src={gift.imageSrc}
                        alt="Gift"
                        className="w-16 h-16 md:w-20 md:h-20 drop-shadow-xl object-contain"
                        style={{ animation: `spin-gift ${gift.rotationDuration} linear infinite` }}
                    />
                </div>
            ))}
        </div>,
        document.body
    );
};

export default WinterSnowfall;