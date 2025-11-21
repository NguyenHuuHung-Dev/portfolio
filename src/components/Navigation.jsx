import React, { useState, useRef, useEffect } from 'react';
import { Home, User, Briefcase, Newspaper, Mail, Menu, X, Sun, Moon, Globe, FileText, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation = ({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, theme, toggleTheme }) => {
    const { t, language, setLanguage } = useLanguage();
    const [showNote, setShowNote] = useState(false);
    const [noteContent, setNoteContent] = useState(localStorage.getItem('quickNotes') || '');
    const [searchQuery, setSearchQuery] = useState('');
    const noteRef = useRef(null);

    // Click outside to close Note
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

    return (
        <nav className={`fixed top-0 left-0 right-0 backdrop-blur-lg z-50 transition-all duration-300 ${theme === 'light' ? 'bg-white/80 border-b border-emerald-100' : 'bg-slate-900/80 border-b border-slate-800'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 transition-transform group-hover:rotate-12">
                            H
                        </div>
                        <span className={`font-bold text-xl group-hover:text-emerald-600 transition-colors ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Dev<span className="text-emerald-600">Profile</span></span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`relative flex items-center space-x-1 text-sm font-medium transition-colors duration-200 group ${activeTab === item.id ? 'text-emerald-600' : (theme === 'light' ? 'text-slate-500 hover:text-emerald-500' : 'text-slate-400 hover:text-emerald-500')
                                    }`}
                            >
                                <item.icon size={16} />
                                <span>{item.label}</span>
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full ${activeTab === item.id ? 'w-full' : ''}`}></span>
                            </button>
                        ))}

                        <div className="flex items-center space-x-2 border-l pl-4 border-slate-300 dark:border-slate-700">
                            {/* Search Bar */}
                            <div className={`relative flex items-center rounded-full px-3 py-1.5 transition-colors border ${theme === 'light' ? 'bg-slate-100 border-slate-200 focus-within:bg-white focus-within:border-emerald-500' : 'bg-slate-800 border-slate-700 focus-within:bg-slate-800 focus-within:border-emerald-500'}`}>
                                <Search size={16} className={theme === 'light' ? 'text-slate-400' : 'text-slate-500'} />
                                <input
                                    type="text"
                                    placeholder={language === 'vi' ? "Tìm kiếm..." : "Search..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`ml-2 w-24 focus:w-48 transition-all duration-300 bg-transparent outline-none text-sm ${theme === 'light' ? 'text-slate-600 placeholder-slate-400' : 'text-slate-200 placeholder-slate-500'}`}
                                />
                            </div>

                            {/* Note Button */}
                            <div className="relative" ref={noteRef}>
                                <button
                                    onClick={() => setShowNote(!showNote)}
                                    className={`p-2 rounded-full transition-colors relative ${theme === 'light' ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-700'}`}
                                    title={language === 'vi' ? "Ghi chú" : "Notes"}
                                >
                                    <FileText size={20} />
                                    {!showNote && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-white dark:border-slate-900"></span>}
                                </button>

                                {/* Popup Note */}
                                {showNote && (
                                    <div className={`absolute right-0 mt-4 w-80 p-5 rounded-2xl shadow-2xl border transform transition-all z-50 ${theme === 'light' ? 'bg-white border-slate-100 text-slate-800' : 'bg-slate-800 border-slate-700 text-white'
                                        }`}>
                                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-dashed border-slate-200 dark:border-slate-600">
                                            <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                                                <FileText size={16} /> {t('notes.title')}
                                            </h4>
                                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{t('notes.new')}</span>
                                        </div>
                                        <textarea
                                            className={`w-full h-32 p-2 text-sm rounded-lg border resize-none focus:ring-2 focus:ring-emerald-500 outline-none ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-600 text-slate-300'}`}
                                            placeholder={t('notes.placeholder')}
                                            value={noteContent}
                                            onChange={(e) => {
                                                setNoteContent(e.target.value);
                                                localStorage.setItem('quickNotes', e.target.value);
                                            }}
                                        ></textarea>
                                        <div className="mt-2 flex justify-end">
                                            <span className="text-xs text-emerald-500 font-medium">{t('notes.saved')}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button onClick={toggleLanguage} className={`p-2 rounded-full transition-colors duration-200 flex items-center gap-1 font-medium text-sm ${theme === 'light' ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-700'}`}>
                                <Globe size={18} />
                                <span>{language === 'vi' ? 'VI' : 'EN'}</span>
                            </button>

                            <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-700'}`}>
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={toggleLanguage} className={`p-2 mr-1 rounded-full transition-colors duration-200 ${theme === 'light' ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-300 hover:bg-slate-700'}`}>
                            <span className="font-bold text-sm">{language === 'vi' ? 'VI' : 'EN'}</span>
                        </button>
                        <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-300 hover:bg-slate-700'}`}>
                            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                        </button>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`ml-2 p-2 ${theme === 'light' ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-300 hover:text-emerald-500'}`}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={`md:hidden absolute top-16 left-0 right-0 border-b shadow-lg ${theme === 'light' ? 'bg-white border-emerald-100' : 'bg-slate-900 border-slate-800'}`}>
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
    );
};

export default Navigation;
