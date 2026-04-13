"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NewsPage() {
  const pathname = usePathname();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRealNews() {
      try {
        const res = await fetch('https://smart-admin-api.onrender.com/api/articles?filters[type][$eq]=Новость&populate=*', {
           cache: 'no-store'
        });
        const json = await res.json();
        
        if (json.data) {
          const formattedNews = json.data.map((item: any) => {
            
            // 1. Барлық мәтінді жинап алу
            let fullText = "";
            if (typeof item.content === 'string') {
                fullText = item.content;
            } else if (Array.isArray(item.content)) {
                fullText = item.content.map((block: any) => block.children?.[0]?.text || '').join('\n');
            }

            // 2. СИҚЫР ОСЫ ЖЕРДЕ: "Источник" деген ссылканы іздеп табу
            let externalLink = null;
            const sourceMatch = fullText.match(/Источник:\s*(https?:\/\/[^\s]+)/);
            
            if (sourceMatch && sourceMatch[1]) {
                externalLink = sourceMatch[1]; // Гуглдың ссылкасын тауып алдық
                // Карточкада әдемі көрінуі үшін ол ссылканы описаниеден кесіп алып тастаймыз
                fullText = fullText.replace(/Источник:\s*https?:\/\/[^\s]+/, '').trim();
            }

            return {
              id: item.documentId || item.id,
              title: item.title,
              description: fullText || "Описание отсутствует...",
              category: "Новость",
              date: new Date(item.createdAt).toLocaleDateString('ru-RU'),
              
              // 3. Егер ссылка бар болса - соған жібереміз, жоқ болса - ішкі бетке
              url: externalLink ? externalLink : `/news/${item.documentId || item.id}`,
              isExternal: !!externalLink // Бұл сыртқы ссылка ма, әлде ішкі ме?
            };
          });
          
          setNews(formattedNews);
        }
      } catch (err) {
        console.error("Интернеттен тарту қатесі:", err);
      } finally {
        setLoading(false);
      }
    }
    getRealNews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      
      {/* ХЕДЕР */}
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

      {/* НЕГІЗГІ БЕТ */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">НОВОСТИ</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-slate-500 font-medium">Сбор данных...</p>
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <a 
                key={item.id} 
                href={item.url || "#"} 
                target={item.isExternal ? "_blank" : "_self"} // Егер Гуглдікі болса жаңа вкладкадан ашады
                rel={item.isExternal ? "noopener noreferrer" : ""}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{item.category}</span>
                  <span className="text-slate-400 text-xs font-semibold">{item.date}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">{item.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1 line-clamp-4">{item.description}</p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  
                  {/* Текст те ауысады: Гугл болса "в источнике", Өзіңдікі болса "далее" */}
                  <span className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Читать {item.isExternal ? "в источнике" : "далее"} 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>

                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">Нет опубликованных новостей.</p>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-slate-500 text-xs">
            © 2026 Smart Community. Разработано в образовательных целях.
          </div>
        </div>
      </footer>
    </div>
  );
}