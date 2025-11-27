import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Image as ImageIcon, Sparkles } from 'lucide-react';

// --- CẤU HÌNH API GEMINI ---
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// --- HƯỚNG DẪN MỚI (QUAN TRỌNG) ---
// Chúng ta dạy Gemini trả về Token đặc biệt thay vì tự bịa link
const SYSTEM_INSTRUCTION = `
Bạn là trợ lý AI của Zing (Full Stack Dev).
Nhiệm vụ: Trả lời câu hỏi và tạo ảnh nếu được yêu cầu.
TÍNH CÁCH: Cục súc, khó ở, hay quạo, trả lời ngắn gọn, không vòng vo sướt mướt. Xưng hô "Tui" và "Ông/Bà" hoặc nói trống không.
Thấy câu hỏi ngớ ngẩn thì cứ chê thẳng.
Tuy nhiên, vẫn phải cung cấp thông tin chính xác.
QUY TẮC TẠO ẢNH (BẮT BUỘC):
Nếu người dùng yêu cầu vẽ/tạo ảnh, bạn KHÔNG ĐƯỢC trả về link ảnh markdown.
Thay vào đó, hãy trả về đúng cú pháp sau:
<<<DRAW: [Mô tả chi tiết bức ảnh bằng tiếng Anh]>>>

Ví dụ:
User: Vẽ con mèo
AI: Chắc chắn rồi! Đây là bức ảnh bạn yêu cầu:
<<<DRAW: a cute fluffy cat sitting on a keyboard, 4k realistic lighting>>>

Lưu ý: Với các câu hỏi lập trình/cá nhân khác, trả lời bình thường tiếng Việt thân thiện.
`;
const GeminiChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'model',
            // Sử dụng <br/> để xuống dòng giữa hai đoạn text
            text: 'Chào bạn! Tui là trợ lý AI của zing. Bạn muốn hỏi về zing về điều gì hay muốn tui vẽ một bức tranh (ví dụ: "Vẽ thành phố tương lai")?'
        },
        {
            id: 2,
            role: 'model',
            text: 'Hỏi vớ vẫn là tui sút cho mấy phát nhá!😊'
        }
    ]);
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // State kéo thả
    const [position, setPosition] = useState({ x: 24, y: 24 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen, image]);

    // --- HÀM XỬ LÝ HIỂN THỊ TIN NHẮN (LOGIC MỚI) ---
    const renderMessageContent = (text) => {
        // Regex tìm cú pháp đặc biệt: <<<DRAW: ...>>>
        const drawRegex = /<<<DRAW:\s*(.*?)>>>/g;
        const parts = text.split(drawRegex);

        // Nếu không tìm thấy lệnh vẽ, trả về text thường
        if (parts.length === 1) return text;

        return parts.map((part, index) => {
            // Các phần lẻ (index 1, 3, 5...) chính là nội dung trong dấu ngoặc (prompt tiếng Anh)
            if (index % 2 === 1) {
                const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(part)}?nologin=true&width=1024&height=1024&seed=${Math.random()}`;
                return (
                    <div key={index} className="my-3 rounded-xl overflow-hidden shadow-md border border-emerald-100 group relative">
                        <img
                            src={imageUrl}
                            alt={part}
                            className="w-full h-auto object-cover min-h-[200px] bg-slate-100 animate-in fade-in duration-700"
                            loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1 opacity-0 group-hover:opacity-100 transition-opacity truncate px-2">
                            Prompt: {part}
                        </div>
                    </div>
                );
            }
            // Phần text thường
            return <span key={index} className="whitespace-pre-wrap">{part}</span>;
        });
    };

    // --- XỬ LÝ ẢNH ĐẦU VÀO ---
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({
                    file: file,
                    base64: reader.result.split(',')[1],
                    preview: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // --- GỬI TIN NHẮN (ĐÃ CẬP NHẬT MEMORY) ---
    const handleSend = async () => {
        if ((!input.trim() && !image) || isLoading) return;

        const timestamp = Date.now();
        // 1. Tạo tin nhắn người dùng mới
        const userMessage = {
            id: timestamp,
            role: 'user',
            text: input,
            image: image?.preview // Chỉ dùng để hiển thị UI
        };

        // Cập nhật UI ngay lập tức
        setMessages(prev => [...prev, userMessage]);

        // Lưu lại giá trị hiện tại để xử lý API
        const currentInput = input;
        const currentImage = image;

        setInput('');
        setImage(null);
        setIsLoading(true);

        try {
            // 2. CHUẨN BỊ LỊCH SỬ CHAT (CONTEXT)
            // Lọc bỏ tin nhắn chào mừng (id 1, 2) và tin nhắn lỗi
            // Chỉ lấy tin nhắn thực tế giữa user và model
            const history = messages
                .filter(msg => msg.id !== 1 && msg.id !== 2 && !msg.text.startsWith('Lỗi:'))
                .map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                    // Lưu ý: Để tiết kiệm token và bandwidth, ta thường chỉ gửi text của lịch sử.
                    // Nếu muốn gửi cả ảnh cũ, cần giữ base64 của ảnh cũ, nhưng sẽ rất nặng.
                }));

            // 3. CHUẨN BỊ TIN NHẮN HIỆN TẠI
            const currentParts = [];
            if (currentInput.trim()) currentParts.push({ text: currentInput });

            // Nếu tin nhắn hiện tại có ảnh, thêm vào
            if (currentImage) {
                currentParts.push({
                    inlineData: { mimeType: currentImage.file.type, data: currentImage.base64 }
                });
            }

            // 4. GỘP LỊCH SỬ + TIN NHẮN HIỆN TẠI
            const contents = [
                ...history,
                { role: 'user', parts: currentParts }
            ];

            // 5. GỌI API
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Sử dụng systemInstruction riêng biệt để định hình tính cách tốt nhất
                    systemInstruction: {
                        parts: [{ text: SYSTEM_INSTRUCTION }]
                    },
                    contents: contents, // Gửi toàn bộ lịch sử
                    generationConfig: {
                        temperature: 1, // Độ sáng tạo (Zing hay quạo thì nên để cao chút)
                        maxOutputTokens: 1000,
                    }
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Lỗi API");

            const botResponseText = data.candidates[0].content.parts[0].text;

            // Cập nhật câu trả lời vào UI
            setMessages(prev => [...prev, { id: timestamp + 1, role: 'model', text: botResponseText }]);

        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, { id: Date.now(), role: 'model', text: `Lỗi: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // --- KÉO THẢ ---
    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        dragStart.current = {
            x: window.innerWidth - e.clientX - position.x,
            y: window.innerHeight - e.clientY - position.y
        };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const newRight = window.innerWidth - e.clientX - dragStart.current.x;
            const newBottom = window.innerHeight - e.clientY - dragStart.current.y;
            setPosition({ x: Math.max(10, newRight), y: Math.max(10, newBottom) });
        };
        const handleMouseUp = () => { setIsDragging(false); };
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleButtonClick = () => {
        if (!isDragging) setIsOpen(!isOpen);
    };

    return (
        <div className="font-sans z-[9999] select-none">
            {/* CỬA SỔ CHAT */}
            {isOpen && (
                <div
                    className="fixed w-[90vw] sm:w-96 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-emerald-900/20 overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-[550px] z-[10000] origin-bottom-right animate-in fade-in slide-in-from-bottom-10 duration-300"
                    style={{ right: `${position.x}px`, bottom: `${position.y + 70}px` }}
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-emerald-600 to-teal-500 p-4 flex justify-between items-center text-white overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="p-2 bg-white/20 rounded-full backdrop-blur-md shadow-inner-white">
                                <Sparkles size={20} className="text-emerald-100 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base">DevProfile AI</h3>
                                <p className="text-[11px] text-emerald-50 flex items-center gap-1.5 font-medium">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                                    </span>
                                    chatbox của zing á
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="relative z-10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-90">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 dark:bg-slate-950/50 space-y-5 custom-scrollbar backdrop-blur-sm">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                                {msg.image && (
                                    <div className="mb-2 max-w-[80%] rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
                                        <img src={msg.image} alt="Uploaded" className="w-full h-auto" />
                                    </div>
                                )}

                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-none shadow-emerald-200/50'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none'
                                    }`}>
                                    {/* Gọi hàm renderMessageContent thay vì hiển thị text trực tiếp */}
                                    {renderMessageContent(msg.text)}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                                    <Loader2 size={18} className="animate-spin text-emerald-600" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Đang load chờ xíu....</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="bg-white dark:bg-slate-900 p-3 border-t border-slate-100 dark:border-slate-800">
                        {image && (
                            <div className="relative inline-block mb-3 animate-in fade-in slide-in-from-bottom-2">
                                <img src={image.preview} alt="Preview" className="h-20 w-20 object-cover rounded-xl border-2 border-emerald-200 shadow-sm" />
                                <button onClick={clearImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm active:scale-90 transition-transform">
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        <div className="flex gap-2 items-end bg-slate-100 dark:bg-slate-800 p-1.5 rounded-[1.5rem] focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
                            <div className="relative shrink-0">
                                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
                                <button onClick={() => fileInputRef.current.click()} className="p-3 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded-full transition-colors active:scale-95" title="Gửi ảnh">
                                    <ImageIcon size={22} />
                                </button>
                            </div>

                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                placeholder={image ? "Mô tả ảnh..." : "Nhập tin nhắn..."}
                                className="flex-1 bg-transparent py-3 px-2 text-sm focus:outline-none text-slate-700 dark:text-slate-200 resize-none max-h-32 custom-scrollbar"
                                rows={1}
                                style={{ minHeight: '44px' }}
                            />

                            <button onClick={handleSend} disabled={isLoading || (!input.trim() && !image)} className="shrink-0 p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-90 flex items-center justify-center">
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="-ml-0.5 mt-0.5" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <div
                ref={buttonRef}
                style={{
                    position: 'fixed',
                    right: `${position.x}px`,
                    bottom: `${position.y}px`,
                    cursor: isDragging ? 'grabbing' : 'pointer',
                    transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseDown={handleMouseDown}
                onClick={handleButtonClick}
                className="group z-[9999]"
            >
                <div className={`absolute -inset-2 rounded-full bg-emerald-500/30 animate-ping opacity-75 ${isOpen || isDragging ? 'hidden' : 'block'}`}></div>
                <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-[0_8px_30px_rgb(16,185,129,0.4)] flex items-center justify-center transform transition-all duration-300 border-[3px] border-white/30 backdrop-blur-md group-hover:scale-110 group-hover:-translate-y-1 active:scale-95`}>
                    {isOpen ? <X size={32} className="animate-in spin-in duration-300 drop-shadow-lg" /> : <Sparkles size={32} fill="currentColor" className="animate-bounce-slow drop-shadow-lg" />}
                </div>
            </div>
        </div>
    );
};

export default GeminiChatWidget;