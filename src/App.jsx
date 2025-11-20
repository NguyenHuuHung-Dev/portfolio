import React, { useState, useEffect } from 'react';
import { Code, Server, Database, Layout, Terminal, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// --- SỬA LỖI IMPORT ---
// Thêm đuôi .jsx vào tất cả các file component để Vite nhận diện chính xác
import Navigation from './components/Navigation.jsx';
// Lưu ý: Dùng { HeroSection } nếu bên file kia là "export const". 
// Nếu bên kia là "export default", hãy bỏ dấu ngoặc nhọn đi.
import { HeroSection } from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

// Component TechStackMarquee (Giữ nguyên)
const TechStackMarquee = () => (
  <div className="py-10 bg-slate-900 overflow-hidden whitespace-nowrap relative">
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
    <div className="inline-block animate-marquee">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="inline-flex items-center mx-4">
          <span className="mx-8 text-slate-400 font-bold text-xl flex items-center gap-2"><Code size={24} /> ReactJS</span>
          <span className="mx-8 text-slate-400 font-bold text-xl flex items-center gap-2"><Server size={24} /> Node.js</span>
          <span className="mx-8 text-slate-400 font-bold text-xl flex items-center gap-2"><Database size={24} /> MongoDB</span>
          <span className="mx-8 text-slate-400 font-bold text-xl flex items-center gap-2"><Layout size={24} /> Tailwind</span>
          <span className="mx-8 text-slate-400 font-bold text-xl flex items-center gap-2"><Terminal size={24} /> TypeScript</span>
          <span className="mx-8 text-slate-400 font-bold text-xl flex items-center gap-2"><Globe size={24} /> Next.js</span>
        </div>
      ))}
    </div>
  </div>
);

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Đảm bảo useLanguage được gọi bên trong Provider (đã được bọc ở component App bên dưới)
  const { t } = useLanguage();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            <TechStackMarquee />
            <ProjectsSection />
            <AboutSection />
            <ContactSection />
          </>
        );
      case 'about': return <AboutSection />;
      case 'projects': return <ProjectsSection />;
      case 'contact': return <ContactSection />;
      case 'news': return <div className="py-32 text-center text-slate-500 dark:text-slate-400">{t('updating') || 'Updating...'}</div>;
      default: return <HeroSection setActiveTab={setActiveTab} />;
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-700 ${theme === 'light' ? 'bg-white text-slate-800' : 'bg-slate-900 text-slate-200'}`}>
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="animate-fade-in">
        {renderContent()}
      </main>

      <Footer setActiveTab={setActiveTab} />

      {/* CSS Global inline */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}