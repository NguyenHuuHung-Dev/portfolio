import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, Heart, Users, Coffee, Gamepad2, Plane, Book, Star, Trophy } from 'lucide-react';

const SKILLS = [
    { name: "JavaScript", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "SQL/NoSQL", level: 75 },
    { name: "Docker/AWS", level: 60 },
];

// Dữ liệu mẫu cho Thành tích
const ACHIEVEMENTS = [
    { year: "2024", title: { vi: "Giải Nhất Hackathon TechDev", en: "1st Place TechDev Hackathon" }, org: "Vietnam Tech Association" },
    { year: "2023", title: { vi: "Chứng chỉ AWS Solutions Architect", en: "AWS Solutions Architect Certified" }, org: "Amazon Web Services" },
    { year: "2024& 2025", title: { vi: "Sinh viên Xuất sắc", en: "Excellent Student Award" }, org: "University of Technology" },
];

// Dữ liệu mẫu cho Sở thích
const HOBBIES = [
    { icon: Book, label: { vi: "Đọc sách công nghệ", en: "Tech Reading" } },
    { icon: Plane, label: { vi: "Du lịch khám phá", en: "Traveling" } },
    { icon: Gamepad2, label: { vi: "Chơi Game chiến thuật", en: "Strategy Games" } },
    { icon: Coffee, label: { vi: "Thưởng thức Cà phê", en: "Coffee Tasting" } },
];

const AboutSection = () => {
    const { t, language } = useLanguage();

    // Hàm helper nhỏ để lấy text theo ngôn ngữ (dùng khi key chưa có trong file translation gốc)
    const getText = (vi, en) => language === 'vi' ? vi : en;

    return (
        <div className="py-20 px-4 bg-white">
            <RevealOnScroll className="max-w-5xl mx-auto">
                {/* --- TITLE SECTION --- */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('about.title')}</h2>
                    <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                </div>

                {/* --- ORIGINAL SECTION (WHO AM I & SKILLS) --- */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-800">{t('about.whoAmI')}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {t('about.description')}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-500 transition-colors cursor-default group">
                                <h4 className="font-bold text-emerald-600 text-3xl mb-1 group-hover:scale-110 transition-transform origin-left">03+</h4>
                                <p className="text-sm text-slate-500">{t('about.yearsExp')}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-500 transition-colors cursor-default group">
                                <h4 className="font-bold text-emerald-600 text-3xl mb-1 group-hover:scale-110 transition-transform origin-left">20+</h4>
                                <p className="text-sm text-slate-500">{t('about.projectsDone')}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">{t('about.skills')}</h3>
                        <div className="space-y-6">
                            {SKILLS.map((skill, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">{skill.name}</span>
                                        <span className="text-slate-500">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-emerald-400"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- NEW SECTION: ACHIEVEMENTS, HOBBIES, RELATIONS --- */}
                <div className="pt-10 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Cột trái: Thành tích */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Trophy className="text-emerald-500" size={24} />
                                {getText("Thành Tích & Giải Thưởng", "Achievements & Awards")}
                            </h3>
                            <div className="space-y-4">
                                {ACHIEVEMENTS.map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
                                        <div className="bg-white px-3 py-1 rounded-lg shadow-sm text-emerald-600 font-bold text-sm whitespace-nowrap mt-1 border border-emerald-100">
                                            {item.year}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                                {getText(item.title.vi, item.title.en)}
                                            </h4>
                                            <p className="text-sm text-slate-500 mt-1">{item.org}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cột phải: Sở thích & Quan hệ */}
                        <div className="space-y-10">

                            {/* Sở thích */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Heart className="text-emerald-500" size={24} />
                                    {getText("Sở Thích Cá Nhân", "Hobbies & Interests")}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {HOBBIES.map((hobby, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-default group">
                                            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-emerald-500 transition-colors">
                                                <hobby.icon size={18} />
                                            </div>
                                            <span className="text-slate-700 font-medium text-sm">{getText(hobby.label.vi, hobby.label.en)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quan hệ / Kết nối */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Users className="text-emerald-500" size={24} />
                                    {getText("Kết Nối & Cộng Đồng", "Connections & Community")}
                                </h3>
                                <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-emerald-100 rounded-full opacity-50 blur-xl"></div>
                                    <p className="text-slate-600 leading-relaxed relative z-10 italic">
                                        "{getText(
                                            "Tôi luôn tin rằng sức mạnh của lập trình không chỉ nằm ở những dòng code, mà còn ở cộng đồng. Tôi là thành viên tích cực của VietDev Community và luôn sẵn sàng chia sẻ kiến thức, kết nối với những người cùng đam mê.",
                                            "I believe the power of programming lies not just in code, but in the community. I'm an active member of the VietDev Community, always ready to share knowledge and connect with fellow enthusiasts."
                                        )}"
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-emerald-100 text-emerald-600">#OpenToWork</span>
                                        <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-emerald-100 text-emerald-600">#Mentoring</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </RevealOnScroll>
        </div>
    );
};

export default AboutSection;