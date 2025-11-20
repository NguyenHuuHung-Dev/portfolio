import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Cpu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import profilePic from '../assets/images/profile.jpeg';

// --- SỬA DÒNG NÀY ---
// Thêm chữ "export" vào trước const để thành Named Export
export const HeroSection = ({ setActiveTab }) => {
    const { t } = useLanguage();
    const [text, setText] = useState('');
    const fullText = t('hero.roles') || ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver"];
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [delta, setDelta] = useState(150);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);
        return () => clearInterval(ticker);
    }, [text, delta, loopNum, fullText]);

    const tick = () => {
        let i = loopNum % fullText.length;
        let fullString = fullText[i];
        let updatedText = isDeleting
            ? fullString.substring(0, text.length - 1)
            : fullString.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) setDelta(50);

        if (!isDeleting && updatedText === fullString) {
            setIsDeleting(true);
            setDelta(2000);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(150);
        }
    };

    return (
        <div className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden min-h-screen flex items-center">
            <div className="absolute top-20 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-20 right-80 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-2 animate-bounce-slow">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                        {t('hero.available')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        {t('hero.greeting')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 whitespace-nowrap">
                            {t('hero.name')}
                        </span>
                    </h1>
                    <div className="h-8">
                        <span className="text-xl md:text-2xl text-slate-600 font-medium">
                            {t('hero.iam')} <span className="text-emerald-600 font-bold border-r-2 border-emerald-600 pr-1 animate-pulse">{text}</span>
                        </span>
                    </div>
                    <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                        {t('hero.quote1')}<br />
                        {t('hero.quote2')}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all duration-300 flex items-center"
                        >
                            {t('hero.viewProjects')} <ChevronRight size={20} className="ml-2" />
                        </button>
                        <button
                            onClick={() => setActiveTab('contact')}
                            className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 hover:scale-105 transition-all duration-300"
                        >
                            {t('hero.contact')}
                        </button>
                    </div>
                </div>

                <div className="relative hidden md:block">
                    <div className="relative w-full aspect-square max-w-md mx-auto transform hover:scale-105 transition-duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-30 animate-pulse"></div>
                        <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform rotate-3 hover:rotate-0 transition-all duration-500">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                                    console.warn("Không tìm thấy ảnh local, đang dùng ảnh online thay thế.");
                                }}
                            />
                        </div>
                        <div className="absolute top-10 -right-4 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2 animate-float">
                            <Code className="text-emerald-500" size={20} />
                            <span className="font-bold text-slate-700">{t('hero.reactExpert')}</span>
                        </div>
                        <div className="absolute bottom-10 -left-4 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2 animate-float animation-delay-2000">
                            <Cpu className="text-teal-500" size={20} />
                            <span className="font-bold text-slate-700">{t('hero.cleanCode')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SỬA DÒNG NÀY ---
// Xóa dòng export default ở đây đi vì đã export ở trên rồi