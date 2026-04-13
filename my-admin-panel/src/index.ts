import Parser from 'rss-parser';

export default {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    const parser = new Parser();

    const fetchNews = async () => {
      try {
        console.log('🌐 Google News-тен жаңалықтар іздеп жатырмын...');
        
        // Орысша "ЖКХ Казахстан" сөзін компьютер түсінетін қауіпсіз форматқа айналдырамыз
        const searchQuery = encodeURIComponent('ЖКХ Казахстан');
        const feed = await parser.parseURL(`https://news.google.com/rss/search?q=${searchQuery}&hl=ru&gl=RU&ceid=RU:ru`);

        const topNews = feed.items.slice(0, 5);

        for (const item of topNews) {
          const existingArticles = await strapi.documents('api::article.article').findMany({
            filters: { title: item.title },
          });

          if (existingArticles.length === 0) {
            await strapi.documents('api::article.article').create({
              data: {
                title: item.title,
                type: 'Новость',
                content: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: item.contentSnippet || 'Текст новости недоступен...' }],
                  },
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: `Источник: ${item.link}` }],
                  }
                ],
              },
              status: 'draft', // Черновик болып сақталады
            });
            console.log(`✅ Жаңа черновик қосылды: ${item.title}`);
          }
        }
      } catch (error) {
        console.error('❌ Жаңалық тартуда қате шықты:', error);
      }
    };

    fetchNews();
    setInterval(fetchNews, 60 * 60 * 1000);
  },
};