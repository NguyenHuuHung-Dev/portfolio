import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useLanguage } from '../contexts/LanguageContext';

const PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Xanh",
        category: "Web App",
        description: "Nền tảng thương mại điện tử chuyên về thực phẩm organic. Tích hợp thanh toán online và tracking đơn hàng.",
        tech: ["React", "Node.js", "MongoDB", "Tailwind"],
        image: "https://images.unsplash.com/photo-1472851294608-415522f97d96?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Task Manager AI",
        category: "Mobile App",
        description: "Ứng dụng quản lý công việc thông minh, tự động sắp xếp lịch trình dựa trên thói quen người dùng.",
        tech: ["React Native", "Firebase", "OpenAI API"],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Finance Dashboard",
        category: "Data Viz",
        description: "Bảng điều khiển phân tích tài chính cá nhân với biểu đồ trực quan và báo cáo realtime.",
        tech: ["Vue.js", "D3.js", "Express"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    }
];

const ProjectsSection = () => {
    const { t } = useLanguage();

    return (
        <div className="py-20 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('projects.title')}</h2>
                            <p className="text-slate-500">{t('projects.subtitle')}</p>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <RevealOnScroll key={project.id} className={`delay-${index * 100}`}>
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-slate-100">
                                <div className="relative overflow-hidden h-52">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-600 z-20 shadow-sm">
                                        {project.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 pt-2 border-t border-slate-50">
                                        <button className="flex-1 py-2 flex justify-center items-center text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium">
                                            <Github size={18} className="mr-2" /> {t('projects.code')}
                                        </button>
                                        <button className="flex-1 py-2 flex justify-center items-center text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium">
                                            <ExternalLink size={18} className="mr-2" /> {t('projects.demo')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsSection;