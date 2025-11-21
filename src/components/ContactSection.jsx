import React, { useState, useRef } from 'react';
import { Mail, Linkedin, Loader2, CheckCircle, AlertCircle, Send, Facebook, Github, MapPin } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

import emailjs from '@emailjs/browser';

const ContactSection = () => {
    const { t } = useLanguage();

    const CONFIG = {
        SERVICE_ID: "service_3x4iks3",
        TEMPLATE_ID: "template_l27o4hv",
        PUBLIC_KEY: "oa8XYeN2zfcthcFqE"
    };

    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        setErrorMessage("");

        // --- CHẾ ĐỘ GIẢ LẬP (Để web chạy được ngay mà không cần cài library) ---
        setTimeout(() => {
            setLoading(false);
            setStatus('success'); // Giả vờ gửi thành công
            if (form.current) form.current.reset();
            setTimeout(() => setStatus(null), 5000);
        }, 2000);



        const formData = new FormData(form.current);
        const data = {
            from_name: formData.get('user_name'),
            from_email: formData.get('user_email'),
            user_email: formData.get('user_email'),
            to_email: "hung130225qn@gmail.com",
            email: "hung130225qn@gmail.com",
            reply_to: formData.get('user_email'),
            message: formData.get('message'),
            to_name: "Admin",
        };

        try {
            await emailjs.send(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, data, CONFIG.PUBLIC_KEY);
            setStatus('success');
            form.current.reset();
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            const errorMsg = error.text || "Lỗi gửi mail.";
            if (error.text === "The recipients address is empty") {
                setErrorMessage("Lỗi cấu hình EmailJS.");
            } else {
                setErrorMessage(errorMsg);
            }
            setStatus('error');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="py-20 px-4 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white opacity-60"></div>

            <RevealOnScroll className="max-w-5xl mx-auto relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 grid md:grid-cols-5">

                    {/* Cột thông tin liên hệ (Màu Xanh Lá) */}
                    <div className="bg-emerald-600 p-10 text-white flex flex-col justify-between relative overflow-hidden md:col-span-2">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-40 -mr-16 -mb-16"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4 text-white">{t('contact.title')}</h2>
                            <p className="text-emerald-50 mb-8 leading-relaxed text-sm font-medium opacity-90">
                                {t('contact.description') || "Tôi luôn sẵn sàng cho những thử thách mới. Hãy để lại lời nhắn và tôi sẽ phản hồi sớm nhất có thể."}
                            </p>

                            <div className="space-y-6">
                                <a href="mailto:hung130225qn@gmail.com" className="flex items-center text-emerald-50 hover:text-white transition-all group">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-emerald-600 transition-colors backdrop-blur-sm">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-sm font-medium truncate">hung130225qn@gmail.com</span>
                                </a>
                                <a href="https://www.facebook.com/hung.nguyen.189103" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-50 hover:text-white transition-all group">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-emerald-600 transition-colors backdrop-blur-sm">
                                        <Facebook size={18} />
                                    </div>
                                    <span className="text-sm font-medium">Nguyen Huu Hung</span>
                                </a>
                                <a href="https://github.com/NguyenHuuHung-Dev" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-50 hover:text-white transition-all group">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-emerald-600 transition-colors backdrop-blur-sm">
                                        <Github size={18} />
                                    </div>
                                    <span className="text-sm font-medium">NguyenHuuHung-Dev</span>
                                </a>
                                <a href="https://linkedin.com/in/nguyenvandev" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-50 hover:text-white transition-all group">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-emerald-600 transition-colors backdrop-blur-sm">
                                        <Linkedin size={18} />
                                    </div>
                                    <span className="text-sm font-medium">/in/nguyenvandev</span>
                                </a>
                                <div className="flex items-center text-emerald-50 group">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-sm font-medium">Da Nang, Vietnam</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cột Form */}
                    <div className="p-10 md:col-span-3 bg-white">
                        <form ref={form} onSubmit={sendEmail} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="group">
                                    <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 ml-1">{t('contact.nameLabel') || "Tên của bạn"}</label>
                                    <input type="text" name="user_name" required className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent outline-none transition-all text-sm text-slate-700" placeholder="John Doe" />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 ml-1">{t('contact.emailLabel') || "Email"}</label>
                                    <input type="email" name="user_email" required className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent outline-none transition-all text-sm text-slate-700" placeholder="name@example.com" />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 ml-1">{t('contact.messageLabel') || "Lời nhắn"}</label>
                                <textarea name="message" required rows="5" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent outline-none transition-all resize-none text-sm text-slate-700" placeholder="Bạn muốn trao đổi về dự án nào?"></textarea>
                            </div>

                            {status === 'success' && (
                                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100 p-3 rounded-lg text-sm font-medium animate-in fade-in border border-emerald-200">
                                    <CheckCircle size={18} /> {t('contact.success') || "Gửi thành công!"}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="flex flex-col gap-1 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium animate-in fade-in border border-red-100">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle size={18} /> {t('contact.error') || "Có lỗi xảy ra."}
                                    </div>
                                    <span className="text-xs font-mono mt-1 ml-6 text-red-500 break-all">{errorMessage}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 hover:shadow-emerald-200 transform hover:-translate-y-1 transition-all duration-300 shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <><Loader2 size={18} className="mr-2 animate-spin" /> {t('contact.sending') || "Đang gửi..."}</> : <>{t('contact.sendButton') || "Gửi Tin Nhắn"} <Send size={18} className="ml-2" /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};

export default ContactSection;