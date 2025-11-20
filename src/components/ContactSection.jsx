import React, { useState, useRef } from 'react';
import { Mail, Linkedin, Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';

const ContactSection = () => {
    const { t } = useLanguage();
    // --- CẤU HÌNH EMAILJS ---
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

        // Lấy dữ liệu form
        const formData = new FormData(form.current);
        const data = {
            from_name: formData.get('user_name'),
            from_email: formData.get('user_email'),
            user_email: formData.get('user_email'),

            // Biến quan trọng để fix lỗi "recipients address is empty"
            to_email: "hung130225qn@gmail.com",
            email: "hung130225qn@gmail.com",

            reply_to: formData.get('user_email'),
            message: formData.get('message'),
            to_name: "Admin",
        };

        try {
            await emailjs.send(
                CONFIG.SERVICE_ID,
                CONFIG.TEMPLATE_ID,
                data,
                CONFIG.PUBLIC_KEY
            );

            setStatus('success');
            form.current.reset();
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            const errorMsg = error.text || JSON.stringify(error) || "Lỗi không xác định.";
            if (error.text === "The recipients address is empty") {
                setErrorMessage("Lỗi cấu hình: Vui lòng điền email của bạn vào ô 'To Email' trên EmailJS Dashboard.");
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white opacity-50"></div>

            <RevealOnScroll className="max-w-4xl mx-auto relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 grid md:grid-cols-2">

                    <div className="bg-emerald-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
                        <div>
                            <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
                            <p className="text-emerald-100 mb-8 leading-relaxed">
                                {t('contact.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center hover:text-emerald-200 transition-colors cursor-pointer">
                                    <Mail className="mr-3" /> hung130225qn@gmail.com
                                </div>
                                <div className="flex items-center hover:text-emerald-200 transition-colors cursor-pointer">
                                    <Linkedin className="mr-3" /> /in/nguyenvandev
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10">
                        <form ref={form} onSubmit={sendEmail} className="space-y-5">
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">{t('contact.nameLabel')}</label>
                                <input type="text" name="user_name" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent outline-none transition-all" placeholder={t('contact.namePlaceholder')} />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">{t('contact.emailLabel')}</label>
                                <input type="email" name="user_email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent outline-none transition-all" placeholder={t('contact.emailPlaceholder')} />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">{t('contact.messageLabel')}</label>
                                <textarea name="message" required rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent outline-none transition-all resize-none" placeholder={t('contact.messagePlaceholder')}></textarea>
                            </div>

                            {status === 'success' && (
                                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg text-sm font-medium animate-in fade-in">
                                    <CheckCircle size={18} /> {t('contact.success')}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="flex flex-col gap-1 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium animate-in fade-in">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle size={18} /> {t('contact.error')}
                                    </div>
                                    <span className="text-xs font-mono mt-1 ml-6 text-red-500 break-all">{errorMessage}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-slate-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <><Loader2 size={18} className="mr-2 animate-spin" /> {t('contact.sending')}</> : <>{t('contact.sendButton')} <Send size={18} className="ml-2" /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};

export default ContactSection;
