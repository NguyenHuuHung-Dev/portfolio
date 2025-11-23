import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Github, ExternalLink, ChevronLeft, ChevronRight,
    Code, Zap, Globe, Database, Smartphone, Layout,
    Lightbulb, Puzzle, Package, Cloud, Cpu, Terminal, Wifi,
    Send
} from 'lucide-react';

// === IMPORT CONTEXT THỰC TẾ CỦA BẠN ===
import { useLanguage } from '../contexts/LanguageContext';

// === IMPORT COMPONENT KHÁC (Đảm bảo bạn có file này, hoặc dùng thẻ div thường nếu chưa có) ===
import RevealOnScroll from './RevealOnScroll';

// ==========================================
// 1. DỮ LIỆU DỰ ÁN (Local Data)
// ==========================================
// Dữ liệu này nằm tại file này nên ta dùng biến 'language' để chọn hiển thị
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

// ==========================================
// 2. CÁC COMPONENT HIỆU ỨNG NỀN (GIỮ NGUYÊN)
// ==========================================

const FloatingShards = React.memo(() => {
    const shards = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 15 + 5,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        rotate: Math.random() * 360,
        shape: Math.random() > 0.5 ? '50%' : '2px',
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {shards.map((shard) => (
                <div
                    key={shard.id}
                    className="absolute bg-emerald-500/10 backdrop-blur-[1px]"
                    style={{
                        left: `${shard.left}%`,
                        top: `${shard.top}%`,
                        width: `${shard.size}px`,
                        height: `${shard.size}px`,
                        borderRadius: shard.shape,
                        transform: `rotate(${shard.rotate}deg)`,
                        animation: `float-shard ${shard.duration}s infinite ease-in-out alternate`,
                        animationDelay: `-${shard.delay}s`,
                    }}
                />
            ))}
        </div>
    );
});

const WanderingOrbs = React.memo(() => {
    const orbs = useMemo(() => Array.from({ length: 8 }).map((_, i) => {
        const moveX = Math.random() * 400 - 200;
        const moveY = Math.random() * 400 - 200;
        const color = Math.random() > 0.5 ? 'rgba(16, 185, 129,' : 'rgba(6, 182, 212,';

        return {
            id: i,
            left: Math.random() * 90 + 5,
            top: Math.random() * 90 + 5,
            size: Math.random() * 40 + 20,
            shape: Math.random() > 0.7 ? '2px' : '50%',
            duration: Math.random() * 20 + 25,
            delay: Math.random() * 10,
            bgColor: `${color} 0.15)`,
            boxShadow: `0 0 20px ${color} 0.1)`,
            moveX: `${moveX}px`,
            moveY: `${moveY}px`,
        };
    }), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {orbs.map((orb) => (
                <div
                    key={orb.id}
                    className="absolute backdrop-blur-sm"
                    style={{
                        left: `${orb.left}%`,
                        top: `${orb.top}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        borderRadius: orb.shape,
                        backgroundColor: orb.bgColor,
                        boxShadow: orb.boxShadow,
                        '--wander-x': orb.moveX,
                        '--wander-y': orb.moveY,
                        animation: `wander-random ${orb.duration}s infinite ease-in-out alternate-reverse`,
                        animationDelay: `-${orb.delay}s`,
                    }}
                />
            ))}
        </div>
    );
});

const TumblingWireframes = React.memo(() => {
    const wireframes = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        left: Math.random() * 80 + 10,
        top: Math.random() * 80 + 10,
        size: Math.random() * 50 + 30,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 5,
        BorderColor: Math.random() > 0.5 ? 'rgba(52, 211, 153, 0.3)' : 'rgba(103, 232, 249, 0.3)',
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ perspective: '1000px' }}>
            {wireframes.map((wf) => (
                <div
                    key={wf.id}
                    className="absolute border-2 animate-[tumble-3d_linear_infinite_alternate]"
                    style={{
                        left: `${wf.left}%`,
                        top: `${wf.top}%`,
                        width: `${wf.size}px`,
                        height: `${wf.size}px`,
                        borderColor: wf.BorderColor,
                        animationDuration: `${wf.duration}s`,
                        animationDelay: `-${wf.delay}s`,
                    }}
                />
            ))}
        </div>
    );
});

const FlyingPaperPlane = () => {
    const [isFlying, setIsFlying] = useState(false);
    const planeRef = useRef(null);
    useEffect(() => {
        const triggerFlight = () => {
            if (!isFlying && planeRef.current) {
                const startY = Math.random() * 60 + 20;
                planeRef.current.style.setProperty('--plane-start-y', `${startY}%`);
                planeRef.current.style.setProperty('--plane-end-y', `${startY + (Math.random() * 40 - 20)}%`);
                setIsFlying(true);
                setTimeout(() => setIsFlying(false), 15000);
            }
        };
        const initialTimeout = setTimeout(triggerFlight, 1000);
        const interval = setInterval(() => { if (Math.random() > 0.4) triggerFlight(); }, 8000);
        return () => { clearTimeout(initialTimeout); clearInterval(interval); };
    }, [isFlying]);

    return (
        <div ref={planeRef} className={`absolute left-[-100px] z-10 pointer-events-none text-emerald-400/70 transition-opacity duration-500 ${isFlying ? 'opacity-100 animate-[fly-across-screen_15s_linear_forwards]' : 'opacity-0'}`} style={{ top: 'var(--plane-start-y, 50%)', filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))' }}>
            <div className="transform rotate-90 scale-x-125 relative"><Send size={32} strokeWidth={1.5} /><div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-emerald-500/40 to-transparent blur-[1px] -z-10 origin-top transform -rotate-12 scale-y-0 animate-[jet-stream_15s_linear_forwards]"></div></div>
        </div>
    );
};

const DataStreams = React.memo(() => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-[data-stream_8s_linear_infinite]" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 200 + 100}px`, animationDelay: `${Math.random() * 5}s`, transform: 'rotate(-45deg)' }}></div>
        ))}
    </div>
));


// ==========================================
// 3. MAIN COMPONENT (PROJECTS SECTION)
// ==========================================

const ProjectsSection = () => {
    // KẾT NỐI VỚI CONTEXT THỰC
    const { t, language } = useLanguage();

    const [activeIndex, setActiveIndex] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Hàm helper để lấy nội dung từ mảng PROJECTS dựa trên language từ Context
    const getText = (vi, en) => language === 'vi' ? vi : en;

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };
        const container = containerRef.current;
        if (container) container.addEventListener('mousemove', handleMouseMove);
        return () => { if (container) container.removeEventListener('mousemove', handleMouseMove); };
    }, []);

    const moveProjects = (newIndex) => {
        if (newIndex < 0 || newIndex >= PROJECTS.length || newIndex === activeIndex) return;
        setActiveIndex(newIndex);
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

    const parallaxX = (factor) => (mousePos.x - (window.innerWidth / 2)) * factor;
    const parallaxY = (factor) => (mousePos.y - (window.innerHeight / 2)) * factor;

    return (
        <div ref={containerRef} className="py-20 px-4 bg-slate-900 relative overflow-hidden min-h-screen flex flex-col items-center">

            <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                
                @keyframes float-shard { 
                    0% { transform: translateY(0) rotate(0deg); opacity: 0.1; } 
                    100% { transform: translateY(-30px) rotate(10deg); opacity: 0.3; } 
                }

                @keyframes wander-random {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
                    50% { transform: translate(var(--wander-x), var(--wander-y)) scale(1.1); opacity: 0.25; }
                    100% { transform: translate(calc(var(--wander-x) * -0.5), calc(var(--wander-y) * -0.5)) scale(0.9); opacity: 0.1; }
                }

                @keyframes tumble-3d {
                    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); opacity: 0.1; }
                    50% { opacity: 0.3; }
                    100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg); opacity: 0.1; }
                }

                @keyframes fly-across-screen {
                    0% { transform: translateX(0) translateY(0) rotate(15deg) scale(0.8); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateX(120vw) translateY(calc(var(--plane-end-y) - var(--plane-start-y))) rotate(30deg) scale(1.0); opacity: 0; }
                }
                @keyframes jet-stream {
                     0% { scale: 1 0; opacity: 0;} 10% { scale: 1 1; opacity: 1;} 90% { scale: 1 1; opacity: 1;} 100% { scale: 1 0; opacity: 0;}
                }
                 @keyframes data-stream {
                    0% { transform: translateX(-100%) translateY(-100%) rotate(-45deg); opacity: 0; }
                    20% { opacity: 0.4; } 80% { opacity: 0.4; }
                    100% { transform: translateX(100%) translateY(100%) rotate(-45deg); opacity: 0; }
                }

                .animate-spin-slow { animation: spin-slow 12s linear infinite; }
                .animate-spin-slow-reverse { animation: spin-slow-reverse 15s linear infinite; }
            `}</style>

            {/* --- LAYERS --- */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.12] z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
                style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.06), transparent 40%)` }}
            />

            <FloatingShards />
            <WanderingOrbs />
            <TumblingWireframes />
            <DataStreams />
            <FlyingPaperPlane />

            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[15%] left-[10%] text-slate-700/40 transition-transform duration-100 ease-out"
                    style={{ transform: `translate(${parallaxX(-0.02)}px, ${parallaxY(-0.02)}px) rotate(-15deg)` }}>
                    <Terminal size={64} />
                </div>
                <div className="absolute bottom-[20%] right-[10%] text-slate-700/40 transition-transform duration-100 ease-out"
                    style={{ transform: `translate(${parallaxX(-0.03)}px, ${parallaxY(-0.03)}px) rotate(15deg)` }}>
                    <Cpu size={80} />
                </div>
                <div className="absolute top-[25%] right-[20%] text-emerald-900/30 transition-transform duration-100 ease-out"
                    style={{ transform: `translate(${parallaxX(0.01)}px, ${parallaxY(0.01)}px)` }}>
                    <Wifi size={48} />
                </div>
                <div className="absolute bottom-[10%] left-[15%] text-emerald-900/30 transition-transform duration-100 ease-out"
                    style={{ transform: `translate(${parallaxX(0.02)}px, ${parallaxY(0.02)}px) rotate(-10deg)` }}>
                    <Database size={56} />
                </div>
            </div>

            {/* --- CONTENT --- */}
            <div className="max-w-6xl mx-auto w-full relative z-20 flex flex-col gap-12">
                <RevealOnScroll>
                    <div className="flex flex-col items-center justify-center relative h-[300px]">
                        <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-emerald-500/10"></div>
                            <div className="absolute inset-4 rounded-full border border-dashed border-emerald-500/20 animate-[spin_60s_linear_infinite]"></div>
                            <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-emerald-400/50 animate-spin-slow blur-[1px]"></div>
                            <div className="absolute inset-8 rounded-full border-b-2 border-r-2 border-cyan-400/50 animate-spin-slow-reverse"></div>
                            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl animate-pulse"></div>
                        </div>

                        <div className="relative z-10 text-center backdrop-blur-sm bg-slate-900/30 p-6 rounded-full border border-white/5">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight flex flex-col items-center gap-2">
                                <Code className="text-emerald-400 mb-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" size={40} />
                                {/* Sử dụng t() từ context để lấy tiêu đề từ file json */}
                                {t('projects.title')}
                            </h2>
                            <p className="text-emerald-400/80 text-sm font-mono mt-2 tracking-widest uppercase">System Online</p>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="relative w-full">
                    <RevealOnScroll>
                        <div className="relative h-[500px] w-full bg-slate-800/30 rounded-3xl border border-slate-700/50 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-2xl">
                            <div className="flex items-center transition-transform duration-500 ease-out will-change-transform h-full"
                                style={{ transform: `translateX(calc(50% - ${activeIndex * (window.innerWidth < 768 ? 320 : 600)}px - ${window.innerWidth < 768 ? 160 : 300}px))` }}>
                                {PROJECTS.map((project, index) => (
                                    <div key={project.id} onClick={() => moveProjects(index)}
                                        className={`relative shrink-0 transition-all duration-500 cursor-pointer px-4 ${window.innerWidth < 768 ? 'w-[320px]' : 'w-[600px]'} ${index === activeIndex ? 'opacity-100 scale-100 z-20' : 'opacity-40 scale-90 blur-[2px] z-10 hover:opacity-60'}`}>
                                        <div className={`bg-slate-900 border rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl transition-colors duration-300 ${index === activeIndex ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-slate-700'}`}>
                                            <div className="relative h-48 overflow-hidden group">
                                                {/* Sử dụng getText helper để lấy nội dung từ mảng PROJECTS */}
                                                <img src={project.image} alt={getText(project.title.vi, project.title.en)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 p-4 w-full">
                                                    <h3 className="text-xl font-bold text-white truncate drop-shadow-md">{getText(project.title.vi, project.title.en)}</h3>
                                                </div>
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col">
                                                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">{getText(project.description.vi, project.description.en)}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">{project.tech.map((techName, i) => (<span key={i} className="flex items-center gap-1 px-2 py-1 bg-slate-800 text-emerald-400 border border-slate-700 text-xs rounded font-mono hover:border-emerald-500/50 transition-colors">{TECH_ICONS[techName]}{techName}</span>))}</div>
                                                <div className="flex gap-3 pt-2 border-t border-slate-800 mt-auto">
                                                    <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg flex items-center justify-center transition-colors"><Github size={16} className="mr-2" /> Code</a>
                                                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-emerald-900/20"><ExternalLink size={16} className="mr-2" /> Demo</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handlePrev} disabled={activeIndex === 0} className="absolute left-4 p-3 rounded-full bg-slate-800/80 text-white hover:bg-emerald-600 disabled:opacity-30 backdrop-blur-sm transition-all z-30 hover:scale-110 active:scale-95"><ChevronLeft size={24} /></button>
                            <button onClick={handleNext} disabled={activeIndex === PROJECTS.length - 1} className="absolute right-4 p-3 rounded-full bg-slate-800/80 text-white hover:bg-emerald-600 disabled:opacity-30 backdrop-blur-sm transition-all z-30 hover:scale-110 active:scale-95"><ChevronRight size={24} /></button>
                        </div>
                    </RevealOnScroll>
                    <div className="flex justify-center gap-2 mt-6">{PROJECTS.map((_, idx) => (<button key={idx} onClick={() => moveProjects(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'w-2 bg-slate-700 hover:bg-slate-600'}`} />))}</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsSection;