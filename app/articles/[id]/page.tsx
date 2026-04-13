"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        // Strapi-ден нақты осы мақаланы тартамыз
        const res = await fetch(`https://smart-admin-api.onrender.com/api/articles/${id}?populate=*`, {
          cache: 'no-store'
        });
        const json = await res.json();
        
        if (json.data) {
          setArticle(json.data);
        }
      } catch (err) {
        console.error("Мақаланы тарту қатесі:", err);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-bold">Загрузка статьи...</p>
      </div>
    );
  }

    if (!article) {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <h1 className="text-4xl font-black text-slate-800 mb-4">Мақала табылмады</h1>
            <a href="/articles" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
              ← Назад
            </a>
          </div>
        );
      }

  // Мәтінді абзацтарға бөліп алу (Strapi форматынан)
  let textParagraphs: string[] = [];
  if (typeof article.content === 'string') {
    textParagraphs = article.content.split('\n').filter((p: string) => p.trim() !== '');
  } else if (Array.isArray(article.content)) {
    textParagraphs = article.content.map((block: any) => block.children?.[0]?.text || '').filter((text: string) => text.trim() !== '');
  }

  // Суретті алу (егер сурет жүктелмесе, стандартты сурет тұрады)
  const imageUrl = article.image?.url 
    ? `${article.image.url}` 
    : 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="bg-white min-h-screen font-sans relative pb-20">
      
      {/* ПРЕМИУМ "НАЗАД" КНОПКАСЫ */}
{/* ПРЕМИУМ "НАЗАД" КНОПКАСЫ */}
      <div className="fixed top-6 left-4 md:left-8 z-50">
        <a href="/articles" className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-700 font-bold px-4 py-2.5 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Назад
        </a>
      </div>

      {/* МАҚАЛАНЫҢ СУРЕТІ МЕН ТАҚЫРЫБЫ */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img src={imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-4 pb-12 pt-20">
          <div className="max-w-3xl mx-auto">
            <span className="bg-blue-600 text-white font-black px-3 py-1.5 rounded-md text-xs uppercase tracking-widest mb-4 inline-block">
              {article.type || "База знаний"}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-lg prose-slate prose-headings:font-black prose-a:text-blue-600 max-w-none">
          {textParagraphs.map((paragraph, index) => {
            // 1. Цифрмен басталған тізімдерді әдемілеу
            if (paragraph.match(/^\d+\./)) {
              return (
                <div key={index} className="flex gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-blue-600 font-black text-xl">{paragraph.split('.')[0]}.</span>
                  <p className="text-slate-700 m-0 font-medium">{paragraph.substring(paragraph.indexOf('.') + 1).trim()}</p>
                </div>
              );
            }
            
            // 2. Дефиспен басталған тізімдер
            if (paragraph.startsWith('- ')) {
              return (
                <div key={index} className="flex gap-3 mb-4 pl-4">
                  <span className="text-blue-500 font-bold">•</span>
                  <p className="text-slate-700 m-0 font-medium">{paragraph.substring(2)}</p>
                </div>
              );
            }
            
            // 3. ЕРЕКШЕЛЕУ (Ескертулер)
            if (paragraph.includes('109') || paragraph.includes('102') || paragraph.toLowerCase().includes('штраф')) {
              return (
                <div key={index} className="my-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl">
                  <h4 className="text-red-700 font-bold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Важно: Внимание
                  </h4>
                  <p className="text-red-900 m-0 font-medium">{paragraph}</p>
                </div>
              );
            }
            
            // 4. Қарапайым текст
            if (paragraph.trim() !== '') {
              return <p key={index} className="mb-6 text-slate-700 leading-relaxed text-lg">{paragraph}</p>;
            }
            return null;
          })}
        </div>
      </main>
    </div>
  );
}