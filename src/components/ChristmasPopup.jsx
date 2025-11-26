import React, { useMemo } from 'react';
import { X, Gift, Snowflake, Wind, Candy, Cookie } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- 1. ĐỊNH NGHĨA DỮ LIỆU CÁC LOẠI THIỆP ---
const CARDS_DATA = [
    {
        id: 'snowman',
        themeColor: 'cyan', // Tông màu chủ đạo
        bgGradient: 'from-slate-900 via-blue-950 to-slate-900',
        accentColor: 'text-cyan-300',
        iconArea: (
            <div className="flex items-end justify-center gap-4 drop-shadow-2xl filter saturate-125">
                <span className="text-7xl md:text-8xl animate-bounce-slow delay-100">🎄</span>
                <span className="text-8xl md:text-9xl z-10 animate-bounce-slow">⛄</span>
                {/* Dùng ảnh 3D nếu muốn, hoặc icon */}
                <span className="text-6xl md:text-7xl animate-bounce-slow delay-200">❄️</span>
            </div>
        ),
        title: { vi: 'Giáng Sinh An Lành', en: 'Merry Christmas' },
        message: {
            vi: 'Chúc bạn một mùa đông ấm áp, tràn ngập niềm vui bên gia đình và những người thân yêu!',
            en: 'Wishing you a warm winter filled with joy and happiness with your family and loved ones!'
        },
        buttonText: { vi: 'Nhận Lời Chúc', en: 'Receive Wishes' }
    },
    {
        id: 'santa',
        themeColor: 'red',
        bgGradient: 'from-red-950 via-slate-900 to-red-950',
        accentColor: 'text-red-300',
        iconArea: (
            <div className="flex items-end justify-center gap-4 drop-shadow-2xl filter saturate-125">
                <span className="text-7xl md:text-8xl animate-pulse">🎁</span>
                <span className="text-8xl md:text-9xl z-10 animate-bounce-slow">🎅</span>
                <Candy size={60} className="text-red-200 animate-spin-slow" />
            </div>
        ),
        title: { vi: 'Ho Ho Ho! Quà Tới Đây!', en: 'Ho Ho Ho! Gifts are here!' },
        message: {
            vi: 'Ông già Noel đã ghé thăm! Chúc bạn năm mới vạn sự như ý, tỷ sự như mơ.',
            en: 'Santa has visited! Wishing you a new year where all your dreams come true.'
        },
        buttonText: { vi: 'Mở Túi Quà', en: 'Open Santa\'s Bag' }
    },
    {
        id: 'reindeer',
        themeColor: 'emerald',
        bgGradient: 'from-emerald-950 via-slate-900 to-emerald-950',
        accentColor: 'text-emerald-300',
        iconArea: (
            <div className="flex items-end justify-center gap-4 drop-shadow-2xl filter saturate-125">
                <Cookie size={60} className="text-amber-200 animate-bounce-slow delay-300" />
                <span className="text-8xl md:text-9xl z-10 animate-bounce-slow">🦌</span>
                <span className="text-7xl md:text-8xl text-red-500 animate-pulse">🔴</span> {/* Mũi đỏ Rudolph */}
            </div>
        ),
        title: { vi: 'Dẫn Lối Niềm Vui', en: 'Guiding Light of Joy' },
        message: {
            vi: 'Hãy để ánh sáng của hy vọng dẫn lối bạn đến một năm mới thành công rực rỡ!',
            en: 'Let the light of hope guide you to a brilliantly successful new year!'
        },
        buttonText: { vi: 'Bay Lên Nào', en: "Let's Fly" }
    }
];


const ChristmasPopup = ({ onClose, cardId }) => {
    const { language } = useLanguage();

    // Tìm dữ liệu thiệp dựa trên cardId được truyền vào
    // Sử dụng useMemo để không phải tìm lại mỗi khi render nếu cardId không đổi
    const cardData = useMemo(() => {
        return CARDS_DATA.find(c => c.id === cardId) || CARDS_DATA[0]; // Fallback về thiệp đầu tiên nếu lỗi
    }, [cardId]);

    // Các biến dynamic dựa trên theme màu
    const gradientTitle = cardData.themeColor === 'red' ? 'from-white via-red-200 to-white' :
        cardData.themeColor === 'emerald' ? 'from-white via-emerald-200 to-white' :
            'from-white via-blue-100 to-white';

    const buttonGradient = cardData.themeColor === 'red' ? 'from-red-500 to-orange-600 shadow-red-500/50' :
        cardData.themeColor === 'emerald' ? 'from-emerald-500 to-teal-600 shadow-emerald-500/50' :
            'from-cyan-500 to-blue-600 shadow-cyan-500/50';

    return (
        <>
            {/* (Giữ nguyên phần style animations...) */}
            <style>{`
                @keyframes float-scene { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes shine-pass { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }
                @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
                .animate-bounce-slow { animation: bounce 3s infinite; }
                .animate-spin-slow { animation: spin 10s linear infinite; }
            `}</style>

            <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 font-sans">
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-500" onClick={onClose} />

                <div className="relative w-full max-w-lg transform transition-all animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
                    {/* Glow effect background - dynamic color */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${cardData.bgGradient} rounded-[2.5rem] blur-xl opacity-50 animate-pulse`}></div>

                    <div className={`relative overflow-hidden rounded-[2.2rem] bg-gradient-to-b ${cardData.bgGradient} border border-${cardData.themeColor}-200/20 shadow-2xl`}>

                        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all">
                            <X size={20} />
                        </button>

                        <div className="relative z-20 flex flex-col items-center p-8 pb-10 text-center">
                            {/* --- DYNAMIC ICON AREA --- */}
                            <div className="relative mb-8 mt-4" style={{ animation: 'float-scene 4s ease-in-out infinite' }}>
                                {cardData.iconArea}
                                <Snowflake className={`absolute -top-4 -right-8 ${cardData.accentColor} w-8 h-8 animate-spin-slow opacity-60`} />
                                <Wind className="absolute top-10 -left-12 text-white/20 w-12 h-12" />
                            </div>

                            <div className="space-y-2 mb-6">
                                <span className={`inline-block py-1 px-3 rounded-full bg-${cardData.themeColor}-500/20 border border-${cardData.themeColor}-400/30 ${cardData.accentColor} text-xs font-bold tracking-widest uppercase mb-2`}>
                                    Special Gift For You
                                </span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientTitle}`}>
                                        {cardData.title[language]}
                                    </span>
                                </h2>
                            </div>

                            <p className="text-blue-50/90 text-lg mb-8 leading-relaxed max-w-xs mx-auto font-medium">
                                {cardData.message[language]}
                            </p>

                            <button onClick={onClose} className={`group relative overflow-hidden rounded-full bg-gradient-to-r ${buttonGradient} px-10 py-4 text-white font-bold shadow-lg transition-all hover:scale-105 active:scale-95`}>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 h-full z-10 animate-[shine-pass_2.5s_infinite]"></div>
                                <div className="relative z-20 flex items-center gap-2">
                                    <Gift size={20} />
                                    <span>{cardData.buttonText[language]}</span>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Xuất danh sách ID để Navigation sử dụng
export const CARD_IDS = CARDS_DATA.map(c => c.id);
export default ChristmasPopup;