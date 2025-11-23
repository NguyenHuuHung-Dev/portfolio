// src/components/NewsDetailModal.jsx
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom'; // 1. Import ReactDOM
import { X, Calendar, Clock, Share2, Tag, ChevronRight, GripHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const NewsDetailModal = ({ article, onClose }) => {
    const { language } = useLanguage();
    const getText = (obj) => obj[language] || obj['en'];
    const isMobile = window.innerWidth < 768;

    // --- 1. LOGIC KÉO THẢ ---
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0 });

    // Reset vị trí khi đổi bài viết
    useEffect(() => {
        setPosition({ x: 0, y: 0 });
    }, [article]);

    const handleMouseDown = (e) => {
        if (isMobile || e.button !== 0) return;
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const newX = e.clientX - dragStartRef.current.x;
            const newY = e.clientY - dragStartRef.current.y;
            setPosition({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // --- 2. LOGIC UI ---
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    if (!article) return null;

    // 2. Nội dung Modal (JSX cũ)
    const modalContent = (
        <div
            // CONTAINER CHÍNH
            // fixed inset-0 z-[99999]: Đảm bảo luôn nằm trên cùng, đè lên Nav
            // flex items-center justify-center: LUÔN CĂN GIỮA MÀN HÌNH (VIEWPORT)
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-fade-in"></div>

            {/* Modal Box */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white dark:bg-slate-900 
                    w-full max-w-3xl 
                    max-h-[85vh] h-auto
                    rounded-2xl shadow-2xl 
                    flex flex-col relative overflow-hidden 
                    border border-slate-100 dark:border-slate-800 
                    transition-shadow duration-200 
                    animate-zoom-in
                    ${isDragging ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-grabbing' : ''}
                `}
                style={{
                    transform: isMobile ? 'none' : `translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
            >
                {/* HEADER (DRAGGABLE) */}
                <div
                    className={`
                        flex items-center justify-between px-4 py-3 md:px-6 md:py-4 
                        border-b border-slate-100 dark:border-slate-800 
                        bg-white dark:bg-slate-900
                        shrink-0 select-none
                        ${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''}
                    `}
                    onMouseDown={handleMouseDown}
                >
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 pointer-events-none overflow-hidden">
                        <GripHorizontal size={18} className="text-slate-300 mr-1 hidden md:block" />
                        <span className="text-emerald-600 uppercase tracking-wider font-bold whitespace-nowrap text-xs md:text-sm">
                            {article.category}
                        </span>
                        <ChevronRight size={14} className="shrink-0" />
                        <span className="truncate max-w-[150px] md:max-w-xs text-xs md:text-sm">
                            {getText(article.title)}
                        </span>
                    </div>

                    <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={onClose}
                        className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-slate-500 transition-colors cursor-pointer ml-2 shrink-0"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                            {getText(article.title)}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-emerald-500" />
                                {article.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-emerald-500" />
                                {language === 'vi' ? '5 phút đọc' : '5 min read'}
                            </div>
                            <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors ml-auto">
                                <Share2 size={14} />
                                <span className="hidden md:inline">{language === 'vi' ? 'Chia sẻ' : 'Share'}</span>
                            </button>
                        </div>
                    </div>

                    <figure className="mb-6 group">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 relative aspect-video w-full">
                            <img
                                src={article.image}
                                alt={getText(article.title)}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </figure>

                    <article className="prose prose-slate prose-base md:prose-lg dark:prose-invert max-w-none">
                        <p className="lead text-base md:text-xl text-slate-600 dark:text-slate-300 font-medium mb-6 border-l-4 border-emerald-500 pl-4 bg-emerald-50/50 dark:bg-emerald-900/10 py-2 rounded-r-lg">
                            {getText(article.summary)}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: getText(article.content) || `<p>Nội dung đang cập nhật...</p>` }} />
                    </article>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                        <span className="text-sm font-bold text-slate-400 mr-2 flex items-center">
                            <Tag size={14} className="mr-1" /> Tags:
                        </span>
                        {['Tech', 'Innovation', '2025', article.category].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // 3. Sử dụng Portal để render vào body thay vì div cha
    return ReactDOM.createPortal(modalContent, document.body);
};

export default NewsDetailModal;