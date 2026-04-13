"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ArticlesPage() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState("Все");
  
  // STRAPI-ден келетін мақалаларды сақтайтын стейттер
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Сенің жаңа категорияларың!
  const categories = ["Все", "Инструкция", "Законодательство", "Аварийная ситуация", "Управление ОСИ",];

  // STRAPI-ДЕН МӘЛІМЕТТЕРДІ АЛУ (API FETCH)
  useEffect(() => {
    async function fetchArticles() {
      try {
        
        const res = await fetch('https://smart-admin-api.onrender.com/api/articles?filters[type][$eq]=Статья&populate=*', {
          cache: 'no-store'
        });
        const json = await res.json();
        
        if (json.data) {
          
          const formattedData = json.data.map((item: any) => {
            
            let textContent = "Описание статьи...";
            if (typeof item.content === 'string') textContent = item.content;
            else if (Array.isArray(item.content)) textContent = item.content[0]?.children?.[0]?.text || "Описание статьи...";

            return {
              id: item.documentId || item.id,
              title: item.title || "Без названия",
              content: textContent,
              
              category: item.docCategory || "База знаний", 
             
              date: new Date(item.createdAt).toLocaleDateString('ru-RU') 
            };
          }); // <-- ӨШІП ҚАЛҒАН ЖАҚША ОСЫ
          
          setArticles(formattedData);
        }
      } catch (err) {
        console.error("Статьяларды тарту қатесі:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Базадан фильтрлеу
  const filteredArticles = activeCategory === "Все" 
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      
      {/* 1. ХЕДЕР */}
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

      <section className="bg-slate-900 py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">База Знаний ЖКХ</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Юридические статьи, пошаговые инструкции и алгоритмы действий для жителей.</p>
      </section>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${activeCategory === cat ? "bg-blue-600 text-white border border-blue-600" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"}`}>{cat}</button>
          ))}
        </div>

       
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
             <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600 mb-4"></div>
             <p className="text-slate-500 font-bold">Загрузка статей из базы данных...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <div key={article.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block self-start mb-6 border border-blue-100">{article.category}</span>
                <h2 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">{article.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">{article.content}</p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-slate-400">{article.date}</span>
                  <a href={`/articles/${article.id}`} className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Читать <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">В этой категории пока нет статей.</p>
          </div>
        )}
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