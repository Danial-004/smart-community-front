import { NextResponse } from "next/server";

export async function GET() {

  const SERPAPI_KEY = "a1337228972f133ddf9f2ad880f3a9edc02c03ce38da1bbcab4387579bdcf5da"; 
  
  
  const searchQuery = encodeURIComponent("ЖКХ Казахстан OR ОСИ Казахстан OR КСК");
  
  
  const url = `https://serpapi.com/search.json?engine=google_news&q=${searchQuery}&gl=kz&hl=ru&api_key=${SERPAPI_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.news_results || data.news_results.length === 0) {
      return NextResponse.json([]);
    }


    const formattedNews = data.news_results.slice(0, 6).map((item: any, index: number) => ({
      id: index + 1,
      title: item.title,
      // Google News кейде толық текст бермейді, сондықтан дереккөзді (Zakon.kz т.б.) жазамыз
      description: item.snippet || `Источник: ${item.source.name}. Нажмите "Читать далее", чтобы открыть полную статью на сайте источника.`,
      date: item.date || "Недавно",
      category: item.source.name, // Мысалы: "Tengrinews", "Zakon.kz"
      url: item.link // НАҒЫЗ жаңалықтың ссылкасы
    }));

    return NextResponse.json(formattedNews);

  } catch (error) {
    console.error("SerpApi Қатесі:", error);
    return NextResponse.json([]); // Қате болса, бос қайтарады
  }
}