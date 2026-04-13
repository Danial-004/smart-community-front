"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Home() {
  
  const pathname = usePathname();
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [activeFaqTab, setActiveFaqTab] = useState("individuals"); // individuals немесе legal
  const [openFaqItem, setOpenFaqItem] = useState<number | null>(null);


  useEffect(() => {
    async function fetchStrapiNews() {
      try {
        const res = await fetch('http://localhost:1337/api/articles?filters[type][$eq]=Новость&populate=*&pagination[limit]=3&sort=createdAt:desc', {
          cache: 'no-store'
        });
        const json = await res.json();
        
        if (json.data) {
          
          const formattedNews = json.data.map((item: any) => {
            let textContent = "Описание статьи...";
            if (typeof item.content === 'string') textContent = item.content;
            else if (Array.isArray(item.content)) textContent = item.content[0]?.children?.[0]?.text || "Описание статьи...";

            return {
              id: item.documentId || item.id,
              title: item.title,
              description: textContent,
              category: "Новость", 
              date: new Date(item.createdAt).toLocaleDateString('ru-RU'),
              url: `/news/${item.documentId || item.id}`
            };
          });
          setNews(formattedNews);
        }
      } catch (err) {
        console.error("Басты бетте жаңалықтарды тарту қатесі:", err);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchStrapiNews();
  }, []);

  useEffect(() => {   
    async function fetchStrapiArticles() {
      try {
        const res = await fetch('http://localhost:1337/api/articles?filters[type][$eq]=Статья&populate=*&pagination[limit]=3&sort=createdAt:desc', {
          cache: 'no-store'
        });
        const json = await res.json();
        if (json.data) {
          const formattedArticles = json.data.map((item: any) => {
            let textContent = "Описание статьи...";
            if (typeof item.content === 'string') textContent = item.content;
            else if (Array.isArray(item.content)) textContent = item.content[0]?.children?.[0]?.text || "Описание статьи...";

            return {
              id: item.documentId || item.id,
              title: item.title,
              description: textContent,
              category: "Статья",
              date: new Date(item.createdAt).toLocaleDateString('ru-RU'),
              url: `/articles/${item.documentId || item.id}`
            };
          });
          setArticles(formattedArticles);
        }
      } catch (err) {
        console.error("Басты бетте статьи тарту қатесі:", err);
      } finally {
        setLoadingArticles(false);
      }
    }
    fetchStrapiArticles();
  }, []);


  const toggleFaq = (id: number) => {
    setOpenFaqItem(openFaqItem === id ? null : id);
  };

  const individualsFAQ = [
    { id: 1, q: "Нужно ли мне платить за регистрацию и использование портала?", a: "Нет, платформа абсолютно бесплатна для жителей. Вы можете читать юридические статьи, узнавать новости и искать сервисные компании без какой-либо абонентской платы." },
    { id: 2, q: "Как оставить заявку, если прорвало трубу или нет света?", a: "Вы можете зайти в раздел «Каталог Услуг», выбрать категорию «Аварийные службы» или «Сантехника» и связаться с проверенными компаниями напрямую без посредников." },
    { id: 3, q: "Как узнать, есть ли у меня долг по коммуналке (РСЖ)?", a: "Задолженность можно проверить в приложениях Halyk Bank или Kaspi.kz в разделе «Платежи -> Коммуналка», введя номер вашего лицевого счета (ЕРЦ/АстанаЭнергоСбыт)." },
    { id: 4, q: "Что делать, если соседи шумят после 23:00?", a: "Согласно закону РК, шуметь запрещено с 22:00 (в будни) и с 23:00 (в выходные). Подробный алгоритм действий и правила вызова участкового описаны в нашей «Базе Знаний»." }
  ];

  
  const legalFAQ = [
    { id: 5, q: "Чем ваша платформа полезна для председателей ОСИ и ПТ?", a: "Мы предоставляем бесплатную базу юридических шаблонов (уставы, протоколы собраний, договоры с подрядчиками) и пошаговые инструкции по управлению домом." },
    { id: 6, q: "Как найти надежную компанию для обслуживания лифтов или уборки?", a: "В нашем B2B-каталоге собраны клининговые, лифтовые и охранные агентства. Вы можете выбрать подрядчика на основе реальных отзывов от других ОСИ." },
    { id: 7, q: "Как добавить нашу сервисную компанию в ваш каталог?", a: "Вы можете заполнить форму обратной связи ниже, указав БИН вашей компании и спектр услуг. После модерации мы добавим вас в открытый справочник." },
    { id: 8, q: "Можно ли сдать подвал ЖК в аренду под коммерцию?", a: "Да, закон это позволяет, но только с согласия более 50% собственников квартир, оформленного официальным протоколом. Шаблон протокола есть в разделе «Шаблоны»." }
  ];

  const currentFaq = activeFaqTab === "individuals" ? individualsFAQ : legalFAQ;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans">
      

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


      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Сол жақ мәтін */}
        <div className="flex-1 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Платформа №1 в Казахстане
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            SMART <br />
            <span className="text-blue-600">COMMUNITY</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
            Единая цифровая база для жителей и ОСИ. Читайте инструкции, скачивайте шаблоны и находите проверенные сервисные компании без регистрации.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/articles" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-1">
              База знаний
            </a>
            <a href="/services" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold transition-all shadow-sm hover:-translate-y-1">
              Каталог услуг
            </a>
          </div>
        </div>

        
        <div className="flex-1 w-full relative flex items-center justify-center lg:justify-end">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-100 rounded-full blur-3xl -z-10"></div>
          
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transform lg:rotate-2 hover:rotate-0 transition duration-500">
            
            
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 bg-white border border-slate-200 px-3 py-1 rounded text-[10px] text-slate-400 w-1/2 font-mono flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                smart-community.kz
              </div>
            </div>

            
            <div className="p-6 bg-slate-50/50">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 h-24 bg-blue-50 rounded-xl border border-blue-100 flex flex-col justify-center items-center hover:bg-blue-100 transition cursor-pointer">
                  <span className="text-blue-600 font-black text-xl mb-1">109</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Авария</span>
                </div>
                <div className="flex-1 h-24 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col justify-center items-center hover:bg-indigo-100 transition cursor-pointer">
                  <span className="text-indigo-600 font-black text-xl mb-1">DOC</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Шаблоны</span>
                </div>
                <div className="flex-1 h-24 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col justify-center items-center hover:bg-emerald-100 transition cursor-pointer">
                  <span className="text-emerald-600 font-black text-xl mb-1">B2B</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Рейтинг</span>
                </div>
              </div>

              <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <div className="w-1/3 h-3 bg-slate-200 rounded-full mb-4"></div>
                <div className="w-full h-2 bg-slate-100 rounded-full mb-3"></div>
                <div className="w-5/6 h-2 bg-slate-100 rounded-full mb-3"></div>
                <div className="w-4/6 h-2 bg-slate-100 rounded-full"></div>
                
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-50">
                  <div className="w-1/4 h-8 bg-blue-600/10 rounded-lg"></div>
                  <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

  
<section className="bg-blue-600 py-12">
  <div className="max-w-5xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:divide-x divide-blue-500/50">
      
      <div className="flex flex-col items-center justify-center">
        <span className="text-4xl md:text-5xl font-black text-white mb-2">150+</span>
        <span className="text-blue-100 text-xs md:text-sm font-semibold uppercase tracking-wider">Статей и ответов</span>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <span className="text-4xl md:text-5xl font-black text-white mb-2">45+</span>
        <span className="text-blue-100 text-xs md:text-sm font-semibold uppercase tracking-wider">Проверенных компаний</span>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <span className="text-4xl md:text-5xl font-black text-white mb-2">24/7</span>
        <span className="text-blue-100 text-xs md:text-sm font-semibold uppercase tracking-wider">Свежие новости</span>
      </div>

    </div>
  </div>
</section>


      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block">Почему выбирают нас</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Преимущества SMART Community</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Мы проанализировали существующие решения на рынке СНГ и создали портал, который действительно решает проблемы, а не создает новые.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Никакой регистрации</h3>
              <p className="text-slate-500 text-sm leading-relaxed">В отличие от аналогов, вам не нужно оставлять ИИН или ждать SMS. Вся база знаний и контакты компаний доступны в 1 клик.</p>
            </div>

            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Бесплатно</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Мы не продаем CRM-системы и не берем абонентскую плату с ОСИ. Скачивайте юридические шаблоны и уставы абсолютно бесплатно.</p>
            </div>

            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live-Агрегатор новостей</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Умная лента автоматически собирает свежие законы и новости ЖКХ со всего Казахстана. Вы всегда в курсе изменений тарифов.</p>
            </div>

            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Честный рейтинг</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Мы оцениваем застройщиков не по красивым фасадам, а по качеству шумоизоляции, труб и работе их управляющих компаний.</p>
            </div>

          </div>
        </div>
      </section>      

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-4xl font-black text-slate-900">Новости</h2>
          <a href="/news" className="text-blue-600 font-bold hover:underline flex items-center gap-1">Все новости <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
        </div>
        {loadingNews ? (
          <div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div></div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <a key={item.id} href={item.url || "#"} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-100 group-hover:bg-blue-600 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-700 transition">{item.category}</span>
                  <span className="text-xs text-slate-400 font-bold">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition line-clamp-3">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">{item.description}</p>
                
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-blue-600 font-bold text-sm flex items-center gap-2">
                    Читать далее <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-3xl p-10 text-center border border-dashed border-slate-300"><p className="text-slate-500">Лента новостей обновляется...</p></div>
        )}
      </section>

      
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-4xl font-black text-slate-900">Статьи</h2>
            <a href="/articles" className="text-blue-600 font-bold hover:underline flex items-center gap-1">Все статьи <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
          </div>
          
          {loadingArticles ? (
            <div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div></div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:border-blue-200 hover:bg-blue-50/50 transition duration-300 flex flex-col justify-between h-[280px]">
                  <div>
                    <span className="bg-white text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 inline-block shadow-sm border border-slate-200">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-3">{article.description}</p>
                  </div>
                  <a href={article.url} className="text-slate-900 font-bold text-sm border-b-2 border-slate-900 self-start pb-0.5 hover:text-blue-600 hover:border-blue-600 transition">
                    Подробнее →
                  </a>
                </div>
              ))}
            </div>
          ) : (
             <div className="bg-slate-50 rounded-3xl p-10 text-center border border-dashed border-slate-300"><p className="text-slate-500">Статьи еще не опубликованы.</p></div>
          )}
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Услуги для вашего дома</h2>
            <p className="text-slate-600 mb-4 max-w-lg text-lg">Открытый каталог сервисных компаний для обслуживания вашего ЖК. Найдите проверенных сантехников, электриков и клининговые службы.</p>
            <p className="text-slate-500 mb-8 max-w-lg text-sm">Вся информация предоставляется в справочных целях для жителей и председателей ОСИ без необходимости регистрации.</p>
            <a href="/services" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/20">Посмотреть справочник</a>
          </div>
          <div className="flex-1 flex flex-col gap-6 w-full">
            <div className="h-40 rounded-3xl overflow-hidden relative shadow-md group">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Сантехника"/>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white"><h3 className="text-xl font-bold">Аварийные службы</h3><p className="text-sm opacity-80">Сантехника и Электрика</p></div>
            </div>
            <div className="h-40 rounded-3xl overflow-hidden relative shadow-md group">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Клининг"/>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white"><h3 className="text-xl font-bold">Клининг</h3><p className="text-sm opacity-80">Уборка подъездов и дворов</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block">Помощь при покупке</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Рейтинг застройщиков Казахстана</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Мы оцениваем компании не только по красоте домов, но и по <b>качеству работы их ОСИ</b>, гарантийному ремонту труб и уровню шумоизоляции.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-orange-500 text-white font-black text-xs px-4 py-2 rounded-bl-2xl z-10">Лидер сервиса</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-blue-600 text-xl">BI</div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">BI Group</h3>
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                    ⭐ 4.8 <span className="text-slate-400 font-normal ml-1">(Много отзывов)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Управляющая компания:</span><span className="font-bold text-green-600">Своя (BI Service)</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Гарантийный ремонт:</span><span className="font-bold text-slate-800">Быстрое реагирование</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Шумоизоляция:</span><span className="font-bold text-slate-800">Средняя (Акустик-блок)</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Тарифы ОСИ:</span><span className="font-bold text-slate-800">Выше среднего</span></div>
              </div>
        
              <a href="https://bi.group/ru" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-800 hover:text-white hover:bg-blue-600 py-3 rounded-xl font-bold transition-all">
                Смотреть проекты компании
              </a>
            </div>

            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-slate-800 text-xl">BZ</div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">BAZIS-A</h3>
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                    ⭐ 4.6 <span className="text-slate-400 font-normal ml-1">(Бизнес класс)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Управляющая компания:</span><span className="font-bold text-slate-800">Базис-Комфорт</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Качество труб/сантехники:</span><span className="font-bold text-green-600">Высокое</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Шумоизоляция:</span><span className="font-bold text-slate-800">Хорошая</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Решение проблем ОСИ:</span><span className="font-bold text-slate-800">Через офис</span></div>
              </div>
              
              <a href="https://bazis.kz/" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-800 hover:text-white hover:bg-blue-600 py-3 rounded-xl font-bold transition-all">
                Смотреть проекты компании
              </a>
            </div>

            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-slate-800 text-xl">SN</div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">Sensata Group</h3>
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                    ⭐ 4.5 <span className="text-slate-400 font-normal ml-1">(Комфорт+)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Управляющая компания:</span><span className="font-bold text-slate-800">Sensata Service</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Гарантийный ремонт:</span><span className="font-bold text-slate-800">По заявке</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Дворы и благоустройство:</span><span className="font-bold text-green-600">Отличные</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Тарифы ОСИ:</span><span className="font-bold text-slate-800">Средние по рынку</span></div>
              </div>
              
              <a href="https://sensata.kz/" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-800 hover:text-white hover:bg-blue-600 py-3 rounded-xl font-bold transition-all">
                Смотреть проекты компании
              </a>
            </div>

          </div>
          
        </div>
      </section>

      

      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">FAQ<span className="text-xl mt-2 block font-medium text-slate-500">Частые вопросы</span></h2>

          <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveFaqTab("individuals")}
              className={`px-8 py-3 rounded-full font-bold transition shadow-sm ${activeFaqTab === "individuals" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Физические лица
            </button>
            <button 
              onClick={() => setActiveFaqTab("legal")}
              className={`px-8 py-3 rounded-full font-bold transition shadow-sm ${activeFaqTab === "legal" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Юридические лица
            </button>
          </div>

          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {currentFaq.map((item) => (
              <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-blue-300">
                <button 
                  onClick={() => toggleFaq(item.id)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                >
                  <span className="text-slate-800 font-bold group-hover:text-blue-600 transition pr-4">{item.q}</span>
                  <span className={`text-2xl text-blue-500 font-light transition-transform ${openFaqItem === item.id ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaqItem === item.id && (
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50 mt-2">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
  
      <section className="bg-slate-50 py-24 border-t border-slate-200 relative overflow-hidden">
        {/* Артқы жұмсақ бұлыңғыр түстер */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-indigo-100/50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Сол жағы: Информация және Контактілер */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 lg:p-14 text-white lg:w-2/5 relative overflow-hidden flex flex-col justify-between">
              {/* Декор */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Остались вопросы?</h3>
                <p className="text-blue-100 mb-10 leading-relaxed text-lg">
                  Заполните форму, и наша служба поддержки свяжется с вами в течение 15 минут для бесплатной консультации.
                </p>
              </div>
              
              <div className="space-y-8 mt-auto">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 text-2xl">
                    📞
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Звоните нам</p>
                    <p className="font-bold text-xl tracking-wide">+7 (700) 000 00 00</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 text-2xl">
                    ✉️
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Пишите нам</p>
                    <p className="font-bold text-lg tracking-wide">info@smartcommunity.kz</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Оң жағы: Таза ақ Форма */}
            <div className="p-10 lg:p-14 lg:w-3/5 bg-white">
              <form 
                className="space-y-6"
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  alert("✅ Ваша заявка успешно отправлена!\n\nНаш менеджер свяжется с вами в ближайшее время."); 
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Ваше имя</label>
                    <input 
                      type="text" 
                      placeholder="Например: Иван Иванов" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Номер телефона</label>
                    <input 
                      type="tel" 
                      placeholder="+7 (___) ___-__-__" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Опишите ваш вопрос</label>
                  <textarea 
                    placeholder="Что вас интересует? (Например: Как добавить нашу компанию в каталог?)" 
                    rows={4} 
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1 flex items-center justify-center gap-3 mt-4"
                >
                  Отправить заявку
                  <svg className="w-5 h-5 transform rotate-45 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
                
                <p className="text-center text-slate-400 text-xs mt-4">
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>  


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