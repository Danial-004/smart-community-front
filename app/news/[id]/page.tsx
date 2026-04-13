"use client";
import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

export default function SingleNewsPage() {
  const pathname = usePathname();
  const params = useParams(); // URL-ден жаңалықтың ID-ін ұстап аламыз
  const id = params.id;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSingleNews() {
      try {
        // Strapi-ден тек осы ID-ге тиесілі 1 ғана жаңалықты тартамыз
        const res = await fetch(`http://localhost:1337/api/articles/${id}?populate=*`, {
          cache: 'no-store'
        });
        const json = await res.json();
        
        if (json.data) {
          setArticle(json.data);
        }
      } catch (err) {
        console.error("Жаңалықты тарту қатесі:", err);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchSingleNews();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-bold">Загрузка статьи...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-800">Новость не найдена (404)</h1>
      </div>
    );
  }

  // 1. Текстті Blocks форматынан шығарып, абзац-абзацпен бөлу
  let textParagraphs: string[] = [];
  if (typeof article.content === 'string') {
    textParagraphs = article.content.split('\n').filter(p => p.trim() !== '');
  } else if (Array.isArray(article.content)) {
    textParagraphs = article.content.map((block: any) => block.children?.[0]?.text || '').filter(text => text.trim() !== '');
  }

  // 2. Суретті алу
  const imageUrl = article.image?.url 
    ? `http://localhost:1337${article.image.url}` 
    : 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop';

  const publishedDate = new Date(article.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-blue-200">
      
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
          <div className="w-48 hidden lg:block"></div>
        </div>
      </header>

      {/* НЕГІЗГІ МАҚАЛА БЕТІ */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <a href="/news" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:underline">
          <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          Назад к новостям
        </a>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Басты сурет */}
          <div className="w-full h-64 md:h-96 relative">
            <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-blue-700 shadow-md">
              {article.type || "Новость"}
            </div>
          </div>

          {/* Мәтін мен тақырып */}
          <div className="p-8 md:p-12">
            <div className="text-slate-400 text-sm font-bold mb-4">{publishedDate}</div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            <div className="prose prose-lg prose-slate max-w-none">
              {textParagraphs.map((paragraph, index) => {
                
                if (paragraph.includes('Источник: http')) {
                  return (
                    <div key={index} className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg text-sm text-slate-600 break-all">
                      {paragraph}
                    </div>
                  );
                }
                return (
                  <p key={index} className="mb-6 text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-12 text-center text-sm text-slate-400">
        © 2026 Smart Community. Разработано в образовательных целях.
      </footer>
    </div>
  );
}