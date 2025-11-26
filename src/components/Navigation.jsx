import React, { useState, useRef, useEffect } from 'react';
import { Home, User, Briefcase, Newspaper, Mail, Menu, X, Sun, Moon, Globe, FileText, Search, Snowflake } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Import các component hiệu ứng
import ChristmasPopup, { CARD_IDS } from './ChristmasPopup';
import WinterSnowfall from './WinterSnowfall';

const Navigation = ({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, theme, toggleTheme }) => {
    const { t, language, setLanguage } = useLanguage();

    // --- State quản lý ---
    const [showNote, setShowNote] = useState(false);
    const [noteContent, setNoteContent] = useState(localStorage.getItem('quickNotes') || '');
    const [searchQuery, setSearchQuery] = useState('');

    // State cho chủ đề mùa đông
    const [isWinterMode, setIsWinterMode] = useState(false);

    // State lưu ID của loại thiệp đang mở (null = không mở)
    const [selectedCardId, setSelectedCardId] = useState(null);

    const noteRef = useRef(null);

    // Xử lý click ra ngoài để đóng Note
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (noteRef.current && !noteRef.current.contains(event.target)) {
                setShowNote(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [noteRef]);

    const navItems = [
        { id: 'home', label: t('nav.home'), icon: Home },
        { id: 'about', label: t('nav.about'), icon: User },
        { id: 'projects', label: t('nav.projects'), icon: Briefcase },
        { id: 'news', label: t('nav.news'), icon: Newspaper },
        { id: 'contact', label: t('nav.contact'), icon: Mail },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'vi' ? 'en' : 'vi');
    };

    // --- XỬ LÝ CLICK QUÀ ---
    // Chọn ngẫu nhiên 1 loại thiệp và hiển thị popup
    const handleGiftClick = () => {
        if (CARD_IDS && CARD_IDS.length > 0) {
            const randomId = CARD_IDS[Math.floor(Math.random() * CARD_IDS.length)];
            setSelectedCardId(randomId);
        }
    };

    // Logic đổi màu nền Nav khi bật Winter Mode
    const navBackgroundClass = isWinterMode
        ? (theme === 'light' ? 'bg-blue-50/90 border-b border-blue-200' : 'bg-slate-900/95 border-b border-blue-900')
        : (theme === 'light' ? 'bg-white/80 border-b border-emerald-100' : 'bg-slate-900/80 border-b border-slate-800');

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 backdrop-blur-lg z-50 transition-all duration-500 ${navBackgroundClass}`}>
                {/* TỐI ƯU MOBILE: Padding nhỏ hơn trên màn hình bé */}
                <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* --- LOGO AREA --- */}
                        <div className="flex items-center cursor-pointer group flex-shrink-0" onClick={() => setActiveTab('home')}>

                            {/* LOGIC ĐỔI LOGO */}
                            {isWinterMode ? (
                                <div className="mr-2 transition-transform group-hover:rotate-12 hover:scale-110 duration-300">
                                    {/* Đảm bảo file ảnh nằm trong thư mục public */}
                                    <img
                                        src="/snowman_logo.png"
                                        alt="Snowman Logo"
                                        className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-full border-2 border-white shadow-md"
                                    />
                                </div>
                            ) : (
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 transition-transform group-hover:rotate-12">
                                    H
                                </div>
                            )}

                            {/* TỐI ƯU MOBILE: Ẩn chữ trên màn hình nhỏ để đỡ chật */}
                            <span className={`hidden sm:block font-bold text-xl transition-colors ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'} group-hover:text-emerald-600`}>
                                Dev<span className="text-emerald-600">Profile</span>
                            </span>
                        </div>

                        {/* --- DESKTOP MENU --- */}
                        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`relative flex items-center space-x-1 text-sm font-medium transition-colors duration-200 group ${activeTab === item.id
                                        ? 'text-emerald-600'
                                        : (theme === 'light' ? 'text-slate-500 hover:text-emerald-500' : 'text-slate-400 hover:text-emerald-500')
                                        }`}
                                >
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                    {/* Gạch chân đỏ khi Winter Mode, xanh khi thường */}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isWinterMode ? 'bg-white-500' : 'bg-emerald-500'} ${activeTab === item.id ? 'w-full' : ''}`}></span>
                                </button>
                            ))}

                            <div className="flex items-center space-x-2 border-l pl-4 border-slate-300 dark:border-slate-700">
                                {/* Search */}
                                <div className={`relative flex items-center rounded-full px-3 py-1.5 transition-colors border ${theme === 'light' ? 'bg-slate-100 border-slate-200 focus-within:bg-white focus-within:border-emerald-500' : 'bg-slate-800 border-slate-700 focus-within:bg-slate-800 focus-within:border-emerald-500'}`}>
                                    <Search size={16} className={theme === 'light' ? 'text-slate-400' : 'text-slate-500'} />
                                    <input
                                        type="text"
                                        placeholder={language === 'vi' ? "Tìm kiếm..." : "Search..."}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`ml-2 w-20 lg:w-24 focus:w-32 lg:focus:w-48 transition-all duration-300 bg-transparent outline-none text-sm ${theme === 'light' ? 'text-slate-600 placeholder-slate-400' : 'text-slate-200 placeholder-slate-500'}`}
                                    />
                                </div>

                                {/* Note */}
                                <div className="relative" ref={noteRef}>
                                    <button onClick={() => setShowNote(!showNote)} className={`p-2 rounded-full transition-colors relative ${theme === 'light' ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-700'}`}>
                                        <FileText size={20} />
                                        {!showNote && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white-500 rounded-full animate-pulse border border-white dark:border-slate-900"></span>}
                                    </button>
                                    {showNote && (
                                        <div className={`absolute right-0 mt-4 w-80 p-5 rounded-2xl shadow-2xl border transform transition-all z-50 ${theme === 'light' ? 'bg-white border-slate-100 text-slate-800' : 'bg-slate-800 border-slate-700 text-white'}`}>
                                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-dashed border-slate-200 dark:border-slate-600">
                                                <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2"> <FileText size={16} /> {t('notes.title')} </h4>
                                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{t('notes.new')}</span>
                                            </div>
                                            <textarea className={`w-full h-32 p-2 text-sm rounded-lg border resize-none focus:ring-2 focus:ring-emerald-500 outline-none ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-600 text-slate-300'}`} value={noteContent} onChange={(e) => { setNoteContent(e.target.value); localStorage.setItem('quickNotes', e.target.value); }} placeholder={t('notes.placeholder')}></textarea>
                                            <div className="mt-2 flex justify-end"><span className="text-xs text-emerald-500 font-medium">{t('notes.saved')}</span></div>
                                        </div>
                                    )}
                                </div>

                                {/* Language & Theme */}
                                <button onClick={toggleLanguage} className={`p-2 rounded-full transition-colors duration-200 flex items-center gap-1 font-medium text-sm ${theme === 'light' ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-700'}`}> <Globe size={18} /> <span>{language === 'vi' ? 'VI' : 'EN'}</span> </button>
                                <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-700'}`}> {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />} </button>

                                {/* WINTER TOGGLE BUTTON (DESKTOP) */}
                                <button
                                    onClick={() => setIsWinterMode(!isWinterMode)}
                                    className={`p-2 rounded-full transition-all duration-300 transform hover:rotate-180 ${isWinterMode ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/30' : (theme === 'light' ? 'text-slate-400 hover:text-cyan-500' : 'text-slate-500 hover:text-cyan-400')}`}
                                    title="Chủ đề mùa đông"
                                >
                                    <Snowflake size={20} className={isWinterMode ? "animate-pulse" : ""} />
                                </button>
                            </div>
                        </div>

                        {/* --- MOBILE MENU BUTTONS (Tối ưu) --- */}
                        <div className="md:hidden flex items-center gap-1 sm:gap-2">
                            {/* Mobile Winter Toggle */}
                            <button onClick={() => setIsWinterMode(!isWinterMode)} className={`p-1.5 sm:p-2 rounded-full ${isWinterMode ? 'text-cyan-500 bg-cyan-50/50' : (theme === 'light' ? 'text-slate-500' : 'text-slate-400')}`}>
                                <Snowflake size={18} />
                            </button>

                            <button onClick={toggleLanguage} className={`p-1.5 sm:p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-300 hover:bg-slate-700'}`}>
                                <span className="font-bold text-xs sm:text-sm">{language === 'vi' ? 'VI' : 'EN'}</span>
                            </button>
                            <button onClick={toggleTheme} className={`p-1.5 sm:p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-300 hover:bg-slate-700'}`}>
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>

                            {/* Burger Menu Button */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`ml-1 p-1.5 sm:p-2 rounded-md ${theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-slate-800'}`}>
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                {mobileMenuOpen && (
                    <div className={`md:hidden absolute top-16 left-0 right-0 border-b shadow-lg z-40 ${theme === 'light' ? 'bg-white border-emerald-100' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="px-4 py-2 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${activeTab === item.id
                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-500'
                                        : (theme === 'light' ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-800')
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                                <button
                                    onClick={() => setShowNote(!showNote)}
                                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${theme === 'light' ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-800'}`}
                                >
                                    <FileText size={20} />
                                    <span>{language === 'vi' ? 'Ghi chú' : 'Notes'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* --- RENDER CÁC HIỆU ỨNG --- */}

            {/* 1. Tuyết rơi + Hộp quà (Chỉ hiện khi bật Winter Mode) */}
            {isWinterMode && (
                <WinterSnowfall onGiftClick={handleGiftClick} />
            )}

            {/* 2. Popup Thiệp Giáng Sinh (Chỉ hiện khi có ID thiệp được chọn) */}
            {selectedCardId && (
                <ChristmasPopup
                    cardId={selectedCardId}
                    onClose={() => setSelectedCardId(null)}
                />
            )}
        </>
    );
};

export default Navigation;