"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function FAQPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("residents");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  
  const residentsFAQ = [
    { id: 1, q: "Кто должен менять лампочки в подъезде?", a: "Замена лампочек на лестничных площадках входит в обязанности обслуживающей компании (КСК/ОСИ). Вы платите за это в квитанции в графе 'РСЖ'." },
    { id: 2, q: "Куда жаловаться, если протекает крыша?", a: "Сначала необходимо письменно обратиться к председателю ОСИ для составления акта. Если ОСИ бездействует — в жилищную инспекцию вашего района." },
    { id: 3, q: "Могу ли я не платить за уборку двора, если у меня нет машины?", a: "Нет. Территория двора является общим имуществом (кондоминиумом). Расходы на ее содержание делятся на всех собственников пропорционально площади их квартир." },
    { id: 4, q: "Как узнать, есть ли у меня долг по коммуналке?", a: "Вы можете проверить задолженность через мобильные приложения вашего банка (Kaspi, Halyk) в разделе 'Платежи -> Коммуналка', введя номер лицевого счета." }
  ];

  const osiFAQ = [
    { id: 5, q: "Обязательно ли открывать два счета в банке для ОСИ?", a: "Да, по закону РК 'О жилищных отношениях' ОСИ обязано открыть два счета: текущий (для ежедневных расходов) и сберегательный (для капитального ремонта)." },
    { id: 6, q: "Как правильно провести собрание жильцов?", a: "О собрании необходимо уведомить за 10 дней. Для кворума нужно присутствие более 50% собственников. Решения принимаются большинством голосов от присутствующих." },
    { id: 7, q: "Можно ли сдать подвал в аренду под магазин?", a: "Да, но только если за это проголосует более 50% собственников квартир на общем собрании. Доходы от аренды должны идти на нужды дома." }
  ];

  const currentQuestions = activeTab === "residents" ? residentsFAQ : osiFAQ;

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

      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 text-center">Частые вопросы</h1>
        <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">Ответы на самые популярные вопросы о сфере ЖКХ, правах жильцов и обязанностях ОСИ.</p>

        
        <div className="flex justify-center gap-4 mb-12 bg-slate-100 p-1 rounded-full max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab("residents")}
            className={`flex-1 py-3 rounded-full font-bold text-sm transition ${activeTab === "residents" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Для жителей
          </button>
          <button 
            onClick={() => setActiveTab("osi")}
            className={`flex-1 py-3 rounded-full font-bold text-sm transition ${activeTab === "osi" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Для ОСИ (Юр. лица)
          </button>
        </div>

        
        <div className="space-y-4 mb-16">
          {currentQuestions.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm hover:border-blue-300">
              <button 
                onClick={() => toggleQuestion(item.id)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-slate-900 text-lg pr-4">{item.q}</span>
                <span className={`text-blue-600 text-2xl transition-transform ${openQuestion === item.id ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              
              {openQuestion === item.id && (
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                  {item.a}
                </div>
              )}
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