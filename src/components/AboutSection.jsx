import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { useLanguage } from '../contexts/LanguageContext';

const SKILLS = [
    { name: "JavaScript", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "SQL/NoSQL", level: 75 },
    { name: "Docker/AWS", level: 60 },
];

const AboutSection = () => {
    const { t } = useLanguage();

    return (
        <div className="py-20 px-4 bg-white">
            <RevealOnScroll className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('about.title')}</h2>
                    <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
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
            </RevealOnScroll>
        </div>
    );
};

export default AboutSection;
