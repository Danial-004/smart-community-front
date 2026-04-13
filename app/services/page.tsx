"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';  

export default function ServicesPage() {
  const pathname = usePathname();

  const [activeCategory, setActiveCategory] = useState("Все услуги");

  const categories = ["Все услуги", "Сантехника и Электрика", "Клининг", "Охрана", "Лифты"];

  
  const companies = [
    { id: 1, name: "Astana Prof Plumbing", category: "Сантехника и Электрика", rating: "4.9", reviews: 128, phone: "+7 701 000 00 01", desc: "Аварийный выезд 24/7. Обслуживание подвалов и теплоузлов ЖК." },
    { id: 2, name: "Smart Clean Service", category: "Клининг", rating: "4.7", reviews: 85, phone: "+7 702 000 00 02", desc: "Уборка подъездов, паркингов и придомовой территории. Зимний вывоз снега." },
    { id: 3, name: "Qazaq Security Systems", category: "Охрана", rating: "4.8", reviews: 210, phone: "+7 707 000 00 03", desc: "Монтаж видеонаблюдения, шлагбаумов и пультовая охрана дворов." },
    { id: 4, name: "Электро-Мастер НС", category: "Сантехника и Электрика", rating: "4.6", reviews: 64, phone: "+7 705 000 00 04", desc: "Замена проводки, освещение дворов и паркингов. Допуск до 1000В." },
    { id: 5, name: "Elevator Service KZ", category: "Лифты", rating: "4.9", reviews: 320, phone: "+7 777 000 00 05", desc: "Техническое обслуживание и ремонт пассажирских и грузовых лифтов." },
    { id: 6, name: "Кристалл Клининг", category: "Клининг", rating: "4.5", reviews: 42, phone: "+7 708 000 00 06", desc: "Эконом-уборка подъездов для небольших домов. Влажная уборка 3 раза в неделю." }
  ];

  const filteredCompanies = activeCategory === "Все услуги" 
    ? companies 
    : companies.filter(c => c.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">

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

      
      <section className="bg-slate-900 py-20 text-center px-4 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Справочник сервисных компаний</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Открытая база проверенных подрядчиков для обслуживания вашего ЖК. Найдите лучших мастеров без посредников и комиссий.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Фильтр */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeCategory === cat 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map(company => (
            <div key={company.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-black text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                  {company.name.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-500 font-black">
                    ⭐ {company.rating}
                  </div>
                  <span className="text-xs text-slate-400">{company.reviews} отзывов</span>
                </div>
              </div>

              <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">{company.category}</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{company.name}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                {company.desc}
              </p>

              <div className="pt-6 border-t border-slate-100">
                <a href={`tel:${company.phone.replace(/[^0-9+]/g, '')}`} className="w-full bg-slate-50 hover:bg-blue-600 text-slate-900 hover:text-white border border-slate-200 hover:border-blue-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group-hover:shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {company.phone}
                </a>
              </div>
            </div>
          ))}
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