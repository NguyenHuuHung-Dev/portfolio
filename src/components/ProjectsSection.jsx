import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Code, Zap, Globe, Database, Smartphone, Layout, Lightbulb, Puzzle, Package, Cloud } from 'lucide-react';
// Thêm đuôi .jsx để trình biên dịch tìm thấy file chính xác
import RevealOnScroll from './RevealOnScroll.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

// --- DỮ LIỆU DỰ ÁN ---
const PROJECTS = [
    {
        id: 1,
        title: { vi: "Nền Tảng E-Commerce Xanh", en: "Green E-Commerce Platform" },
        description: { vi: "Phát triển hệ thống thương mại điện tử chuyên cung cấp thực phẩm hữu cơ, tích hợp quy trình thanh toán an toàn và quản lý đơn hàng thông minh.", en: "Developed an e-commerce system specializing in organic food, integrating secure payment processes and intelligent order management." },
        tech: ["React", "Node.js", "MongoDB", "TailwindCSS"],
        github: "https://github.com/your-username/ecommerce-project",
        demo: "https://your-ecommerce-demo.com",
        image: "https://images.unsplash.com/photo-1472851294608-415522f97d96?auto=format&fit=crop&q=80&w=1200&h=600"
    },
    {
        id: 2,
        title: { vi: "Ứng Dụng Quản Lý Công Việc AI", en: "AI Task Manager App" },
        description: { vi: "Xây dựng ứng dụng di động thông minh giúp người dùng quản lý công việc hiệu quả, tự động ưu tiên và đề xuất lịch trình tối ưu dựa trên phân tích AI.", en: "Built a smart mobile application for efficient task management, featuring AI-driven prioritization and optimized schedule suggestions." },
        tech: ["React Native", "Firebase", "OpenAI API", "TypeScript"],
        github: "https://github.com/your-username/task-manager-ai",
        demo: "https://your-taskmanager-demo.com",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200&h=600"
    },
    {
        id: 3,
        title: { vi: "Dashboard Phân Tích Tài Chính", en: "Financial Analytics Dashboard" },
        description: { vi: "Phát triển bảng điều khiển trực quan để phân tích dữ liệu tài chính cá nhân, hỗ trợ ra quyết định đầu tư với các biểu đồ tương tác và báo cáo real-time.", en: "Developed an intuitive dashboard for personal financial data analysis, supporting investment decisions with interactive charts and real-time reports." },
        tech: ["Vue.js", "D3.js", "Express.js", "PostgreSQL"],
        github: "https://github.com/your-username/finance-dashboard",
        demo: "https://your-finance-dashboard.com",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600"
    },
    {
        id: 4,
        title: { vi: "Hệ Thống Quản Lý Kho", en: "Inventory Management System" },
        description: { vi: "Thiết kế và triển khai một hệ thống quản lý kho hàng toàn diện, giúp theo dõi tồn kho, quản lý nhập xuất và tối ưu hóa chuỗi cung ứng cho doanh nghiệp vừa và nhỏ.", en: "Designed and implemented a comprehensive inventory management system to track stock, manage inbound/outbound logistics, and optimize supply chains for SMEs." },
        tech: ["Angular", "Spring Boot", "MySQL", "Docker"],
        github: "https://github.com/your-username/inventory-system",
        demo: "https://your-inventory-demo.com",
        image: "https://images.unsplash.com/photo-1563206497-6a454d45d3c8?auto=format&fit=crop&q=80&w=1200&h=600"
    }
];

// Icon Mapping
const TECH_ICONS = {
    React: <Zap size={14} />,
    "Node.js": <Code size={14} />,
    MongoDB: <Database size={14} />,
    TailwindCSS: <Layout size={14} />,
    "React Native": <Smartphone size={14} />,
    Firebase: <Cloud size={14} />,
    "OpenAI API": <Lightbulb size={14} />,
    TypeScript: <Code size={14} />,
    "Vue.js": <Globe size={14} />,
    "D3.js": <Puzzle size={14} />,
    "Express.js": <Package size={14} />,
    PostgreSQL: <Database size={14} />,
    Angular: <Zap size={14} />,
    "Spring Boot": <Code size={14} />,
    MySQL: <Database size={14} />,
    Docker: <Package size={14} />
};

const ProjectsSection = () => {
    const { t, language } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const getText = (vi, en) => language === 'vi' ? vi : en;

    const moveProjects = (newIndex) => {
        if (newIndex < 0 || newIndex >= PROJECTS.length || newIndex === activeIndex) return;
        setIsMoving(true);
        setTimeout(() => {
            setActiveIndex(newIndex);
            setIsMoving(false);
        }, 500);
    };

    const handleNext = () => moveProjects(activeIndex + 1);
    const handlePrev = () => moveProjects(activeIndex - 1);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex]);

    // Touch logic
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        if (isLeftSwipe) handleNext();
        if (isRightSwipe) handlePrev();
    };

    return (
        <div className="py-20 px-4 bg-slate-900 relative overflow-hidden min-h-screen flex flex-col items-center">
            {/* Định nghĩa Animation nội bộ để tránh lỗi config */}
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-slow-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
                .animate-spin-slow-reverse {
                    animation: spin-slow-reverse 15s linear infinite;
                }
            `}</style>

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-12">

                {/* --- PHẦN 1: VISUAL CENTER (Vòng tròn Neon & Tiêu đề) --- */}
                <RevealOnScroll>
                    <div className="flex flex-col items-center justify-center relative h-[300px]">
                        {/* Hệ thống vòng tròn Neon tách biệt ở đây */}
                        <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] flex items-center justify-center">
                            {/* Vòng tĩnh */}
                            <div className="absolute inset-0 rounded-full border border-emerald-500/10"></div>
                            <div className="absolute inset-4 rounded-full border border-dashed border-emerald-500/20 animate-[spin_60s_linear_infinite]"></div>

                            {/* Vòng xoay Neon chính */}
                            <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-emerald-400/50 animate-spin-slow blur-[1px]"></div>
                            <div className="absolute inset-8 rounded-full border-b-2 border-r-2 border-cyan-400/50 animate-spin-slow-reverse"></div>

                            {/* Core Glow */}
                            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl animate-pulse"></div>
                        </div>

                        {/* Tiêu đề đặt giữa tâm vòng tròn */}
                        <div className="relative z-10 text-center backdrop-blur-sm bg-slate-900/30 p-6 rounded-full border border-white/5">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight flex flex-col items-center gap-2">
                                <Code className="text-emerald-400 mb-2" size={40} />
                                {t('projects.title')}
                            </h2>
                            <p className="text-emerald-400/80 text-sm font-mono mt-2 tracking-widest uppercase">System Online</p>
                        </div>
                    </div>
                </RevealOnScroll>


                {/* --- PHẦN 2: PROJECT CARDS (Tách biệt phía dưới) --- */}
                <div className="relative w-full">
                    <RevealOnScroll>
                        <div
                            className="relative h-[500px] w-full bg-slate-800/30 rounded-3xl border border-slate-700/50 backdrop-blur-md flex items-center justify-center overflow-hidden"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            {/* Container trượt */}
                            <div
                                className="flex items-center transition-transform duration-500 ease-out will-change-transform h-full"
                                style={{ transform: `translateX(calc(50% - ${activeIndex * (window.innerWidth < 768 ? 320 : 600)}px - ${window.innerWidth < 768 ? 160 : 300}px))` }}
                            >
                                {PROJECTS.map((project, index) => (
                                    <div
                                        key={project.id}
                                        onClick={() => moveProjects(index)}
                                        className={`
                                            relative shrink-0 transition-all duration-500 cursor-pointer px-4
                                            ${window.innerWidth < 768 ? 'w-[320px]' : 'w-[600px]'}
                                            ${index === activeIndex ? 'opacity-100 scale-100 z-20' : 'opacity-40 scale-90 blur-[2px] z-10 hover:opacity-60'}
                                        `}
                                    >
                                        {/* Card Design */}
                                        <div className={`
                                            bg-slate-900 border rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl
                                            ${index === activeIndex ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-slate-700'}
                                        `}>
                                            {/* Image Area */}
                                            <div className="relative h-48 overflow-hidden group">
                                                <img
                                                    src={project.image}
                                                    alt={getText(project.title.vi, project.title.en)}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                                {/* Title nổi trên ảnh */}
                                                <div className="absolute bottom-0 left-0 p-4 w-full">
                                                    <h3 className="text-xl font-bold text-white truncate drop-shadow-md">
                                                        {getText(project.title.vi, project.title.en)}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-5 flex-1 flex flex-col">
                                                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
                                                    {getText(project.description.vi, project.description.en)}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.tech.map((techName, i) => (
                                                        <span key={i} className="flex items-center gap-1 px-2 py-1 bg-slate-800 text-emerald-400 border border-slate-700 text-xs rounded font-mono">
                                                            {TECH_ICONS[techName]}
                                                            {techName}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-3 pt-2 border-t border-slate-800 mt-auto">
                                                    <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg flex items-center justify-center transition-colors">
                                                        <Github size={16} className="mr-2" /> Code
                                                    </a>
                                                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-emerald-900/20">
                                                        <ExternalLink size={16} className="mr-2" /> Demo
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Controls */}
                            <button onClick={handlePrev} disabled={activeIndex === 0} className="absolute left-4 p-3 rounded-full bg-slate-800/80 text-white hover:bg-emerald-600 disabled:opacity-30 backdrop-blur-sm transition-all z-30">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={handleNext} disabled={activeIndex === PROJECTS.length - 1} className="absolute right-4 p-3 rounded-full bg-slate-800/80 text-white hover:bg-emerald-600 disabled:opacity-30 backdrop-blur-sm transition-all z-30">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </RevealOnScroll>

                    {/* Pagination Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {PROJECTS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => moveProjects(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-700'}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectsSection;