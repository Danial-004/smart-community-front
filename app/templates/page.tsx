"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TemplatesPage() {
    const pathname = usePathname();
    const [activeCategory, setActiveCategory] = useState("Все");
    
    // СЕНІҢ ОРИГИНАЛ КАТЕГОРИЯЛАРЫҢ ҚАЙТЫП КЕЛДІ:
    const categories = ["Все", "Создание ОСИ", "Собрания", "Договоры", "Акты и Отчеты"];

    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTemplates() {
            try {
                // Strapi-ден Шаблондарды тартамыз
                const res = await fetch('https://smart-admin-api.onrender.com/api/articles?filters[type][$eq]=Шаблон&populate=*', {
                    cache: 'no-store'
                });
                const json = await res.json();
                
                if (json.data) {
                    const formattedDocs = json.data.map((item: any) => {
                        // Текстті шығарып алу
                        let textContent = "Описание шаблона...";
                        if (typeof item.content === 'string') textContent = item.content;
                        else if (Array.isArray(item.content)) textContent = item.content[0]?.children?.[0]?.text || "Описание шаблона...";

                        // Файлдың бар-жоғын тексеру (Жаңа қосқан documentFile өрісінен)
                        const fileData = item.documentFile;
                        let fileUrl = "#";
                        if (fileData?.url) {
                            // Егер сілтеме "http" деп басталса (Cloudinary болса), сол күйінде аламыз. 
                            // Ал егер басталмаса, алдына Render-дің сілтемесін қосамыз.
                            fileUrl = fileData.url.startsWith('http') 
                                ? fileData.url 
                                : `https://smart-admin-api.onrender.com${fileData.url}`;
                        }
                        const fileExt = fileData?.ext ? fileData.ext.replace('.', '').toUpperCase() : "DOCX";
                        const fileSize = fileData?.size ? Math.round(fileData.size) + " KB" : "Неизвестно";

                        return {
                            id: item.documentId || item.id,
                            title: item.title,
                            // Енді категорияны Strapi-ден алады
                            category: item.docCategory || "Акты и Отчеты", 
                            format: fileExt,
                            size: fileSize,
                            file: fileUrl, // Нағыз файлға сілтеме
                            desc: textContent
                        };
                    });
                    setDocuments(formattedDocs);
                }
            } catch (err) {
                console.error("Шаблондарды тарту қатесі:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTemplates();
    }, []);

    const filteredDocs = activeCategory === "Все"
        ? documents
        : documents.filter(doc => doc.category === activeCategory);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200">
            
            <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="w-48 flex-shrink-0">
                        <a href="/" className="flex items-center gap-3 cursor-pointer group inline-flex">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-xl text-slate-900 leading-none tracking-tight">SMART</span>
                                <span className="font-semibold text-[10px] text-blue-600 uppercase mt-1">Community</span>
                            </div>
                        </a>
                    </div>

          <nav className="hidden lg:flex gap-8 font-semibold text-sm">
            <a href="/" className={`flex items-center gap-2 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> Главная
            </a>
            <a href="/news" className={`flex items-center gap-2 transition-colors ${pathname?.startsWith('/news') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg> Новости
            </a>
            <a href="/articles" className={`flex items-center gap-2 transition-colors ${pathname?.startsWith('/articles') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" /></svg> Статьи
            </a>
            <a href="/templates" className={`flex items-center gap-2 transition-colors ${pathname?.startsWith('/templates') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Шаблоны
            </a>
            <a href="/services" className={`flex items-center gap-2 transition-colors ${pathname?.startsWith('/services') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> Услуги
            </a>
            <a href="/faq" className={`flex items-center gap-2 transition-colors ${pathname?.startsWith('/faq') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> FAQ
            </a>
          </nav>

                    <div className="w-48 hidden lg:block"></div>
                </div>
            </header>
            
            <section className="relative w-full h-80 bg-gray-900 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" alt="Документы ОСИ" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">База шаблонов документов</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">Готовые и юридически проверенные бланки, протоколы и договоры для председателей ОСИ и инициативных групп.</p>
                </div>
            </section>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
                
                <aside className="w-full lg:w-1/4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                        <h2 className="text-xl font-bold mb-6">Категории</h2>
                        <div className="flex flex-col gap-2">
                            {categories.map((cat) => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-left px-4 py-3 rounded-xl font-medium transition ${activeCategory === cat ? "bg-blue-600 text-white shadow-md" : "bg-gray-50 text-gray-600 hover:bg-gray-200"}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 p-5 bg-orange-50 rounded-xl border border-orange-100">
                            <span className="text-2xl mb-2 block">💡</span>
                            <h3 className="font-bold text-orange-800 mb-2">Нужна помощь юриста?</h3>
                            <p className="text-sm text-orange-700 mb-4">Наши партнеры помогут правильно оформить протокол.</p>
                            <a href="/services" className="text-sm font-bold text-orange-600 hover:underline">Найти юриста →</a>
                        </div>
                    </div>
                </aside>

                <div className="w-full lg:w-3/4">
                    {loading ? (
                         <div className="flex justify-center py-20">
                             <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
                         </div>
                    ) : documents.length === 0 ? (
                        <div className="bg-white p-10 text-center rounded-2xl border border-dashed border-gray-300 text-gray-500">
                            Шаблоны еще не добавлены. Зайдите в админ-панель и добавьте статью с типом "Шаблон".
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredDocs.map((doc) => (
                                <div key={doc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between group">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{doc.category}</span>
                                            <span className={`text-xs font-black px-2 py-1 rounded ${doc.format === 'PDF' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{doc.format}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{doc.title}</h3>
                                        <p className="text-sm text-gray-500 mb-6 line-clamp-2">{doc.desc}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-xs text-gray-400 font-medium">Размер: {doc.size}</span>
                                        
                                        {/* НАҒЫЗ СКАЧАТЬ КНОПКАСЫ */}
                                        <a 
                                            href={doc.file} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download 
                                            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition cursor-pointer"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Скачать
                                        </a>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-slate-900 text-white py-8 mt-0">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-6 mb-4">
                        <div className="max-w-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-blue-600 p-1.5 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"></path></svg></div>
                                <span className="font-extrabold text-xl tracking-tight">SMART</span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">Информационно-справочный портал ЖКХ. Найдите ответы и нужные сервисные компании.</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 text-xs text-slate-400">
                            <p className="flex items-center gap-2">📍 Астана, ул. Алихан Бокейхан, 2</p>
                            <p className="flex items-center gap-2">✉️ info@smartcommunity.kz</p>
                            <p className="flex items-center gap-2">📞 +7 (700) 000 00 00</p>
                        </div>
                    </div>
                    <div className="text-center text-slate-500 text-xs">
                        © 2026 Smart Community. Разработано в образовательных целях.
                    </div>
                </div>
            </footer>
        </div>
    );
}