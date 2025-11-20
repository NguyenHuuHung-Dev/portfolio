import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Key, Info, Check, Loader2, AlertCircle } from 'lucide-react';

const App = () => {
    // Cấu hình EmailJS từ bạn
    const CONFIG = {
        SERVICE_ID: "service_3x4iks3",
        TEMPLATE_ID: "template_l27o4hv",
        PUBLIC_KEY: "oa8XYeN2zfcthcFqE"
    };

    const [formData, setFormData] = useState({
        name: 'zing',
        serviceId: CONFIG.SERVICE_ID, // Điền sẵn ID của bạn
        sendTestEmail: false,
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [sdkReady, setSdkReady] = useState(false);

    // Load EmailJS SDK
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        script.async = true;
        script.onload = () => {
            window.emailjs.init(CONFIG.PUBLIC_KEY);
            setSdkReady(true);
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleUpdate = async () => {
        // Nếu không tích chọn gửi email test thì chỉ hiện thông báo cập nhật giả lập
        if (!formData.sendTestEmail) {
            alert("Cập nhật cấu hình thành công (Không gửi email test).");
            return;
        }

        if (!sdkReady) return;

        setLoading(true);
        setStatus(null);

        // Chuẩn bị dữ liệu gửi mail test
        const templateParams = {
            from_name: formData.name,
            from_email: "admin@example.com", // Email giả lập cho bản test
            message: "Đây là email kiểm tra cấu hình từ giao diện Edit Service. Kết nối thành công!",
            to_name: "Admin",
        };

        try {
            await window.emailjs.send(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, templateParams);
            setStatus('success');
            setTimeout(() => setStatus(null), 5000); // Ẩn thông báo sau 5s
        } catch (error) {
            console.error("Lỗi gửi mail:", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">

            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden border border-gray-200 relative">

                {/* Header */}
                <div className="bg-[#3F51B5] px-6 py-4 flex justify-between items-center text-white">
                    <h2 className="text-lg font-medium">Edit Service</h2>
                    <button className="hover:bg-white/10 p-1 rounded transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6">

                    {/* Service Identity Header */}
                    <div className="flex items-start gap-3">
                        {/* Gmail Icon */}
                        <div className="w-10 h-10 bg-white flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-8 h-8">
                                <g>
                                    <path fill="#34A853" d="M18.545 21h-3.818v-9.273l3.818-2.864V21z" />
                                    <path fill="#FBBC04" d="M5.455 11.727V21H1.636A1.636 1.636 0 0 1 0 19.364V8.864l5.455 2.863z" />
                                    <path fill="#4285F4" d="M5.455 11.727L12 16.636l6.545-4.909V4.636L12 9.545 5.455 4.636v7.091z" />
                                    <path fill="#EA4335" d="M0 8.864V5.455c0-2.023 2.309-3.178 3.927-1.964L5.455 4.636v2.864L0 8.864z" />
                                </g>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 leading-none">Gmail</h3>
                            <div className="text-sm text-gray-600 flex items-center mt-1">
                                <span>Personal Service</span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span>500 emails per day</span>
                                <HelpCircle size={14} className="ml-2 text-gray-400 cursor-pointer hover:text-gray-600" />
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5">

                        {/* Name Field */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                            />
                        </div>

                        {/* Service ID Field */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Service ID <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.serviceId}
                                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 bg-gray-50 text-gray-600 focus:outline-none"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1 hover:bg-gray-100 rounded cursor-pointer">
                                    <Key size={16} className="rotate-45" />
                                </div>
                            </div>
                        </div>

                        {/* Gmail Connect Box */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Gmail Connect
                            </label>
                            <div className="border border-gray-300 rounded p-4 flex items-center justify-between bg-white">
                                <span className="text-gray-700">Connected as hung130225qn@gmail.com</span>
                                <button className="border border-gray-300 bg-white text-gray-700 px-4 py-1.5 rounded hover:bg-gray-50 text-sm font-medium transition-colors">
                                    Disconnect
                                </button>
                            </div>
                        </div>

                        {/* Info Alert */}
                        <div className="bg-[#E8F0FE] rounded-md p-4 flex items-start gap-3 border border-blue-100">
                            <Info size={20} className="text-[#1967D2] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#3C4043] leading-tight">
                                Allow "Send email on your behalf" permission during connection.
                                <br />
                                Both Gmail and Google Apps accounts are supported.
                            </p>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center gap-2 pt-1">
                            <div
                                className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${formData.sendTestEmail ? 'bg-[#3F51B5] border-[#3F51B5]' : 'border-gray-400'}`}
                                onClick={() => setFormData({ ...formData, sendTestEmail: !formData.sendTestEmail })}
                            >
                                {formData.sendTestEmail && <Check size={14} className="text-white stroke-[3]" />}
                            </div>
                            <label
                                className="text-gray-700 text-sm cursor-pointer select-none"
                                onClick={() => setFormData({ ...formData, sendTestEmail: !formData.sendTestEmail })}
                            >
                                Send test email to verify configuration
                            </label>
                        </div>

                        {/* Status Messages (Inline) */}
                        {status === 'success' && (
                            <div className="text-green-600 text-sm flex items-center gap-2 bg-green-50 p-2 rounded border border-green-200">
                                <Check size={16} /> Email test đã được gửi thành công!
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="text-red-600 text-sm flex items-center gap-2 bg-red-50 p-2 rounded border border-red-200">
                                <AlertCircle size={16} /> Gửi thất bại. Kiểm tra lại Console log.
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white">
                    <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium transition-colors">
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className={`
              px-4 py-2 rounded text-white text-sm font-medium flex items-center gap-2 transition-colors shadow-sm
              ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-[#3F51B5] hover:bg-[#303F9F]'}
            `}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Check size={16} />
                                Update Service
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default App;