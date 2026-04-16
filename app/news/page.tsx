"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NewsPage() {
  const pathname = usePathname();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          
          {/* ЛОГОТИП */}
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

          {/* КОМПЬЮТЕРГЕ АРНАЛҒАН МЕНЮ (Телефонда жасырынады) */}
          <nav className="hidden lg:flex gap-8 font-semibold text-sm">
            <a href="/" className="text-slate-600 hover:text-blue-600 transition-colors">Главная</a>
            <a href="/news" className="text-slate-600 hover:text-blue-600 transition-colors">Новости</a>
            <a href="/articles" className="text-slate-600 hover:text-blue-600 transition-colors">Статьи</a>
            <a href="/templates" className="text-slate-600 hover:text-blue-600 transition-colors">Шаблоны</a>
            <a href="/services" className="text-slate-600 hover:text-blue-600 transition-colors">Услуги</a>
            <a href="/faq" className="text-slate-600 hover:text-blue-600 transition-colors">FAQ</a>
          </nav>

          {/* ТЕЛЕФОНҒА АРНАЛҒАН БУРГЕР КНОПКА (☰) */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-slate-600 hover:text-blue-600 focus:outline-none p-2"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> // Крестик (X)
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> // 3 сызық (☰)
                )}
              </svg>
            </button>
          </div>
          
          <div className="w-48 hidden lg:block"></div>
        </div>

        {/* ТЕЛЕФОНҒА АРНАЛҒАН АШЫЛАТЫН МЕНЮ (Тек кнопка басылғанда көрінеді) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full left-0">
            <div className="flex flex-col px-4 py-4 space-y-4">
              <a href="/" className="text-slate-700 font-bold hover:text-blue-600">Главная</a>
              <a href="/news" className="text-slate-700 font-bold hover:text-blue-600">Новости</a>
              <a href="/articles" className="text-slate-700 font-bold hover:text-blue-600">Статьи</a>
              <a href="/templates" className="text-slate-700 font-bold hover:text-blue-600">Шаблоны</a>
              <a href="/services" className="text-slate-700 font-bold hover:text-blue-600">Услуги</a>
              <a href="/faq" className="text-slate-700 font-bold hover:text-blue-600">FAQ</a>
            </div>
          </div>
        )}
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