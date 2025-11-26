import React from 'react';
import { X, Gift, Snowflake, Wind } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext'; 

const ChristmasPopup = ({ onClose }) => {
    // const { t, language } = useLanguage(); 
    const language = 'vi';

    return (
        <>
            <style>{`
                @keyframes float-scene {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                @keyframes shine-pass {
                  0% { transform: translateX(-100%) skewX(-15deg); }
                  100% { transform: translateX(200%) skewX(-15deg); }
                }
                @keyframes popIn {
                   0% { transform: scale(0.8); opacity: 0; }
                   100% { transform: scale(1); opacity: 1; }
                }
            `}</style>

            <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 font-sans">
                <div
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500"
                    onClick={onClose}
                />

                <div className="relative w-full max-w-lg transform transition-all animate-[popIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-[2.5rem] blur opacity-75 animate-pulse"></div>

                    <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-slate-900 via-[#0f172a] to-blue-950 border border-blue-200/20 shadow-2xl">

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 text-blue-200/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative z-20 flex flex-col items-center p-8 pb-10 text-center">

                            <div className="relative mb-6 mt-2" style={{ animation: 'float-scene 4s ease-in-out infinite' }}>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-blue-100/10 blur-xl rounded-[100%]"></div>
                                <div className="flex items-end justify-center gap-4 drop-shadow-2xl filter saturate-125">
                                    <div className="relative transform -rotate-6 scale-110 z-10 text-7xl md:text-8xl">🎄</div>
                                    <div className="relative z-20 -mb-2 scale-125 text-7xl md:text-8xl">⛄</div>
                                    {/* Sử dụng hình ảnh 3D màu đỏ ở đây */}
                                    <img src="image_1.png" alt="Gift" className="relative transform rotate-12 z-10 w-20 h-20 md:w-24 md:h-24 object-contain" />
                                </div>
                                <Snowflake className="absolute -top-4 -right-8 text-cyan-200 w-8 h-8 animate-spin-slow opacity-80" />
                                <Wind className="absolute top-10 -left-12 text-blue-300/30 w-12 h-12" />
                            </div>

                            <div className="space-y-1 mb-5">
                                <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-2">
                                    Winter Wonderland
                                </span>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                                        Merry Christmas
                                    </span>
                                </h2>
                            </div>

                            <p className="text-blue-100/80 text-base md:text-lg mb-8 leading-relaxed max-w-xs mx-auto">
                                {language === 'vi'
                                    ? "Cầu chúc cho bạn một mùa Giáng sinh an lành, hạnh phúc bên gia đình và những người thân yêu!"
                                    : "Wishing you a Christmas full of peace, joy, and happiness with your loved ones!"}
                            </p>

                            <button
                                onClick={onClose}
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3.5 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 h-full z-10 animate-[shine-pass_2.5s_infinite]"></div>
                                <div className="relative z-20 flex items-center gap-2">
                                    <Gift size={20} className="text-green-100" />
                                    <span>{language === 'vi' ? "Nhận Lời Chúc" : "Receive Wishes"}</span>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChristmasPopup;