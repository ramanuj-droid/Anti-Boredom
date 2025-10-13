import { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import styles from './Newsitem.module.css';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
// Generate your own free API key from https://newsdata.io/register


function extractArticles(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.articles)) return payload.articles;
  if (Array.isArray(payload.data)) return payload.data;

  for (const v of Object.values(payload)) {
    if (Array.isArray(v)) return v;
  }
  return [];
}

export default function Newspage({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL =
    `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${category}`;

  useEffect(() => {
    let mounted = true;
    async function fetchNews() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const arr = extractArticles(data);
        if (!mounted) return;
        if (arr.length === 0) {
          setError('No articles found from API.');
        } else {
          setArticles(arr);
        }
      } catch (err) {
        console.error('Failed fetching news:', err);
        if (mounted) setError('Failed to fetch news. Check API/key or network.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchNews();
    return () => (mounted = false);
  }, []);

  if (loading)
    return <div className={styles.centerWrap}>Loading latest news…</div>;
  if (error) return <div className={styles.centerWrap}>{error}</div>;

  return (
    <section className={styles.newsGridWrap}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Latest Headlines</h1>
        <p className={styles.pageSub}>From all sources — live feed</p>
      </div>

      <div className={styles.newsGrid}>
        {articles.map((item, idx) => {
          const parsed = {
            id: item.article_id || item.id || item._id || idx,
            title: item.title || item.headline || 'Untitled',
            description: item.description || item.summary || '',
            content: item.content || '',
            imageURL: item.image_url || item.urlToImage || item.thumbnail || '',
            LinkURL: item.link || item.url || item.source_url || '#',
            authors: item.creator || item.authors || [],
            publishedAt: item.pubDate || item.published_at || item.published || '',
            source: item.source_name || item.source || (item.source && item.source.name) || '',
            keywords: item.keywords || item.tags || [],
            country: item.country || [],
          };

          return <Newsitem key={parsed.id + '-' + idx} {...parsed} />;
        })}
      </div>
    </section>
  );
}
