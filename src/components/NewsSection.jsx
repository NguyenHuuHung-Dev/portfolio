import React, { useState } from 'react';
import { Calendar, Tag, ArrowRight, Newspaper, Search } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
// Import component Modal (Hãy đảm bảo bạn đã tạo file NewsDetailModal.jsx như hướng dẫn trước)
import NewsDetailModal from './NewsDetailModal.jsx';

// --- DỮ LIỆU TIN TỨC (Đã thêm trường content chứa HTML) ---
const NEWS_DATA = [
    {
        id: 4,
        date: "2025-11-20",
        category: "Promotion",
        image: "https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=800&auto=format&fit=crop",
        title: {
            vi: "Hướng dẫn đăng ký gói ChatGPT GO miễn phí 1 năm",
            en: "Guide to Register for 1-Year Free ChatGPT GO"
        },
        summary: {
            vi: "Yêu cầu tài khoản mới chưa từng đăng ký, sử dụng Android và thanh toán qua MoMo hoặc ShopeePay.",
            en: "Requires a new account, Android device usage, and payment via MoMo or ShopeePay."
        },
        content: {
            vi: `
                <p>Cơ hội tuyệt vời để trải nghiệm sức mạnh của AI. Dưới đây là các bước chi tiết để nhận gói ưu đãi này:</p>
                <h3 class="text-xl font-bold mt-4 mb-2">Điều kiện cần:</h3>
                <ul class="list-disc pl-5 mb-4">
                    <li>Thiết bị sử dụng hệ điều hành Android.</li>
                    <li>Tài khoản Google chưa từng liên kết thanh toán hoặc chưa từng đăng ký gói Plus.</li>
                    <li>Ví điện tử MoMo hoặc ShopeePay đã xác thực.</li>
                </ul>
                <h3 class="text-xl font-bold mt-4 mb-2">Các bước thực hiện:</h3>
                <ol class="list-decimal pl-5 mb-4 space-y-2">
                    <li><strong>Bước 1:</strong> Tải ứng dụng ChatGPT chính chủ từ Google Play Store.</li>
                    <li><strong>Bước 2:</strong> Đăng nhập bằng tài khoản Google mới.</li>
                    <li><strong>Bước 3:</strong> Vào phần Cài đặt > Nâng cấp lên Plus (Upgrade to Plus).</li>
                    <li><strong>Bước 4:</strong> Tại màn hình thanh toán, bạn sẽ thấy mục "Dùng thử miễn phí 1 năm" (1 Year Free Trial). Chọn phương thức thanh toán là MoMo/ShopeePay.</li>
                </ol>
                <p class="italic text-slate-500">Lưu ý: Sau khi đăng ký thành công, hãy nhớ hủy gia hạn tự động trong Google Play để tránh bị trừ tiền sau 1 năm.</p>
            `,
            en: `
                <p>A great opportunity to experience the power of AI. Here are the detailed steps to claim this offer:</p>
                <h3 class="text-xl font-bold mt-4 mb-2">Requirements:</h3>
                <ul class="list-disc pl-5 mb-4">
                    <li>Android device.</li>
                    <li>Google account that has never subscribed to Plus.</li>
                    <li>Verified MoMo or ShopeePay wallet.</li>
                </ul>
                <p>Follow the steps in the app settings to upgrade and select the 1-year free trial option at checkout.</p>
            `
        }
    },
    {
        id: 1,
        date: "2024-03-20",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800&auto=format&fit=crop",
        title: {
            vi: "Tương lai của AI trong phát triển phần mềm",
            en: "The Future of AI in Software Development"
        },
        summary: {
            vi: "Trí tuệ nhân tạo đang thay đổi cách chúng ta viết code như thế nào? Cùng khám phá các công cụ hỗ trợ lập trình mới nhất.",
            en: "How is Artificial Intelligence changing the way we write code? Let's explore the latest coding assistant tools."
        },
        content: {
            vi: `
                <p>Trí tuệ nhân tạo (AI) không còn là một khái niệm xa vời mà đã trở thành trợ thủ đắc lực cho các lập trình viên hiện đại.</p>
                <h3 class="text-xl font-bold mt-4 mb-2">1. Tự động hóa quy trình viết code</h3>
                <p>Các công cụ như <strong>GitHub Copilot</strong> hay <strong>ChatGPT</strong> đang giúp giảm thiểu thời gian viết các đoạn code lặp lại (boilerplate code), cho phép lập trình viên tập trung vào logic nghiệp vụ phức tạp.</p>
                <h3 class="text-xl font-bold mt-4 mb-2">2. Debug và tối ưu hóa</h3>
                <p>AI có khả năng phân tích hàng nghìn dòng lệnh trong vài giây để tìm ra lỗi tiềm ẩn và đề xuất cách tối ưu hiệu năng mà mắt thường có thể bỏ sót.</p>
                <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100 my-4">
                    <strong>Kết luận:</strong> Việc tích hợp AI không thay thế lập trình viên, mà nâng tầm họ trở thành những kiến trúc sư phần mềm thực thụ.
                </div>
            `,
            en: `
                <p>AI has become a powerful assistant for modern developers.</p>
                <h3 class="text-xl font-bold mt-4 mb-2">1. Automation</h3>
                <p>Tools like GitHub Copilot reduce boilerplate code.</p>
                <h3 class="text-xl font-bold mt-4 mb-2">2. Debugging</h3>
                <p>AI can analyze thousands of lines of code in seconds to find potential bugs.</p>
            `
        }
    },
    {
        id: 5,
        date: "2025-11-19",
        category: "Education",
        image: "https://images.unsplash.com/photo-1633419461186-7d40a2e50e80?q=80&w=800&auto=format&fit=crop",
        title: {
            vi: "Nhận bản quyền Microsoft Office 365 miễn phí 1 năm",
            en: "Get Microsoft Office 365 Free for 1 Year"
        },
        summary: {
            vi: "Chương trình hỗ trợ AI for Students. Đăng ký thông qua đường link chính thức của Microsoft Copilot.",
            en: "AI for Students program support. Register via the official Microsoft Copilot link."
        },
        content: {
            vi: "<p>Chương trình đang diễn ra dành cho sinh viên các trường đại học liên kết. Bạn cần sử dụng email đuôi .edu để đăng ký...</p>",
            en: "<p>This program is for students. You need an .edu email to register...</p>"
        }
    },
    {
        id: 6,
        date: "2025-11-18",
        category: "Promotion",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        title: {
            vi: "Cơ hội sở hữu Gemini Pro 18 tháng",
            en: "Opportunity to Own Gemini Pro for 18 Months"
        },
        summary: {
            vi: "Áp dụng cho tài khoản chưa từng nâng cấp lên bản Pro, thanh toán dễ dàng qua ví MoMo hoặc ShopeePay.",
            en: "Applicable for accounts that have never upgraded to Pro, easy payment via MoMo or ShopeePay."
        },
        content: {
            vi: "<p>Google đang tung ra gói kích cầu cho Gemini Advanced. Người dùng đăng ký mới sẽ được hưởng 2 tháng dùng thử + voucher giảm giá 50% cho 16 tháng tiếp theo.</p>",
            en: "<p>Google is launching a stimulus package for Gemini Advanced...</p>"
        }
    },
    {
        id: 2,
        date: "2024-02-15",
        category: "Personal",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        title: {
            vi: "Ra mắt Portfolio giao diện mới",
            en: "Launched New Portfolio Interface"
        },
        summary: {
            vi: "Chính thức cập nhật giao diện với phong cách Neon Cyberpunk, tối ưu hóa trải nghiệm người dùng và hiệu năng.",
            en: "Officially updated the interface with Neon Cyberpunk style, optimizing user experience and performance."
        },
        content: {
            vi: "<p>Phiên bản mới sử dụng React, TailwindCSS và các hiệu ứng animation tối ưu giúp đạt điểm Lighthouse 100/100.</p>",
            en: "<p>The new version uses React, TailwindCSS, and optimized animations to achieve a 100/100 Lighthouse score.</p>"
        }
    },
    {
        id: 3,
        date: "2024-01-10",
        category: "Tutorial",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
        title: {
            vi: "Hướng dẫn tối ưu React Hook",
            en: "React Hook Optimization Guide"
        },
        summary: {
            vi: "Tổng hợp các kỹ thuật sử dụng useMemo và useCallback hiệu quả để tránh render thừa trong ứng dụng lớn.",
            en: "A collection of techniques for effectively using useMemo and useCallback to avoid unnecessary renders in large apps."
        },
        content: {
            vi: "<p>Bài viết này đi sâu vào cách React Reconciliation hoạt động và khi nào thực sự cần dùng useMemo.</p>",
            en: "<p>This article dives deep into how React Reconciliation works and when useMemo is actually needed.</p>"
        }
    }
];

const NewsSection = () => {
    const { t, language } = useLanguage();
    const [filter, setFilter] = useState('All');

    // --- STATE QUẢN LÝ MODAL (POPUP) ---
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Helper lấy text theo ngôn ngữ
    const getText = (obj) => obj[language] || obj['en'];

    // Lấy danh sách category duy nhất để tạo nút lọc
    const categories = ['All', ...new Set(NEWS_DATA.map(item => item.category))];

    // Lọc bài viết
    const filteredNews = filter === 'All'
        ? NEWS_DATA
        : NEWS_DATA.filter(item => item.category === filter);

    // Hàm mở bài viết chi tiết
    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    // Hàm đóng modal
    const handleCloseModal = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="py-24 px-4 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Newspaper className="text-emerald-600" size={32} />
                            <h2 className="text-4xl font-bold text-slate-900">{t('nav.news')}</h2>
                        </div>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            {language === 'vi'
                                ? "Cập nhật những tin tức công nghệ, bài viết chia sẻ và hành trình phát triển của tôi."
                                : "Updates on technology news, sharing articles, and my development journey."}
                        </p>
                        <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mt-6"></div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                    ? 'bg-emerald-600 text-white shadow-md transform -translate-y-1'
                                    : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* News List */}
                <div className="space-y-6">
                    {filteredNews.map((item, index) => (
                        <RevealOnScroll key={item.id} className={`delay-${index * 100}`}>
                            <div
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 flex flex-col md:flex-row h-full md:h-60 cursor-pointer"
                                onClick={() => handleReadMore(item)} // Click vào thẻ để mở
                            >
                                {/* Image (Left side) */}
                                <div className="relative w-full md:w-2/5 h-48 md:h-full overflow-hidden shrink-0">
                                    <img
                                        src={item.image}
                                        alt={getText(item.title)}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm flex items-center gap-1">
                                        <Tag size={12} />
                                        {item.category}
                                    </div>
                                </div>

                                {/* Content (Right side) */}
                                <div className="p-6 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-2 font-medium">
                                            <Calendar size={14} />
                                            {item.date}
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                            {getText(item.title)}
                                        </h3>

                                        <p className="text-slate-600 text-sm line-clamp-2 md:line-clamp-3 mb-4">
                                            {getText(item.summary)}
                                        </p>
                                    </div>

                                    <div className="flex justify-end md:justify-start">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Ngăn sự kiện click bị trùng
                                                handleReadMore(item);
                                            }}
                                            className="flex items-center text-emerald-600 font-bold text-sm group/btn hover:underline"
                                        >
                                            {language === 'vi' ? "Đọc tiếp" : "Read More"}
                                            <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Empty State */}
                {filteredNews.length === 0 && (
                    <div className="text-center py-20 opacity-60">
                        <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <p>{language === 'vi' ? "Không tìm thấy bài viết nào." : "No articles found."}</p>
                    </div>
                )}
            </div>

            {/* --- MODAL HIỂN THỊ CHI TIẾT --- */}
            {selectedArticle && (
                <NewsDetailModal
                    article={selectedArticle}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default NewsSection;