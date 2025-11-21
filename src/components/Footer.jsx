import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = ({ setActiveTab }) => {
    const { t } = useLanguage();

    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4 text-white">
                        <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold">D</div>
                        <span className="font-bold text-xl">DevProfile</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        {t('footer.description')}
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">{t('footer.navigation')}</h4>
                    <ul className="space-y-2 text-sm">
                        <li><button onClick={() => setActiveTab('home')} className="hover:text-emerald-500 transition-colors">{t('nav.home')}</button></li>
                        <li><button onClick={() => setActiveTab('projects')} className="hover:text-emerald-500 transition-colors">{t('nav.projects')}</button></li>
                        <li><button onClick={() => setActiveTab('about')} className="hover:text-emerald-500 transition-colors">{t('nav.about')}</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">{t('footer.connect')}</h4>
                    <div className="flex gap-4">
                        <a href="https://github.com/NguyenHuuHung-Dev" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><Github size={20} /></a>
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><Linkedin size={20} /></a>
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><Mail size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
