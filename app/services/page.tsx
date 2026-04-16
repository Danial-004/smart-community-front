"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';  

export default function ServicesPage() {
  const pathname = usePathname();

  const [activeCategory, setActiveCategory] = useState("Все услуги");

  const categories = ["Все услуги", "Сантехника и Электрика", "Клининг", "Охрана", "Лифты"];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
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