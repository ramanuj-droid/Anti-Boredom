import styles from './Newsitem.module.css';

function formatDate(pubDate) {
        if (!pubDate) return '';
        // Try to convert "2025-10-13 02:00:00" -> "2025-10-13T02:00:00Z"
        try {
                let iso = pubDate;
                // if space between date and time (common), replace with 'T'
                if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(pubDate)) {
                        iso = pubDate.replace(' ', 'T') + 'Z';
                }
                const d = new Date(iso);
                if (isNaN(d.getTime())) return pubDate;
                // format in user's locale (browser) — it's fine for readability
                return d.toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                });
        } catch {
                return pubDate;
        }
}

export default function Newsitem({
        title,
        description,
        content,
        imageURL,
        LinkURL,
        authors = [],
        publishedAt,
        source,
        keywords = [],
}) {
        const author = Array.isArray(authors) && authors.length ? authors[0] : '';
        const displayImage =
                imageURL && imageURL.length ? imageURL : '/placeholder-news.jpg'; // add placeholder to /public

        return (
                <article className={styles.card} aria-labelledby={`title-${title}`}>
                        <div className={styles.mediaWrap}>
                                <img
                                        src={displayImage}
                                        alt={title}
                                        className={styles.cardImage}
                                        onError={(e) => {
                                                e.currentTarget.src = '/placeholder-news.jpg';
                                        }}
                                />
                        </div>

                        <div className={styles.cardBody}>
                                <h3 id={`title-${title}`} className={styles.cardTitle}>
                                        {title}
                                </h3>

                                <div className={styles.metaRow}>
                                        {author && <span className={styles.metaItem}>By {author}</span>}
                                        {source && <span className={styles.metaItem}>{source}</span>}
                                        {publishedAt && (
                                                <span className={styles.metaItem}>{formatDate(publishedAt)}</span>
                                        )}
                                </div>

                                <p className={styles.cardDesc}>
                                        {description && description.length
                                                ? description
                                                : content && content.length
                                                        ? content.slice(0, 220) + '...'
                                                        : 'No description available.'}
                                </p>

                                <div className={styles.tagsRow}>
                                        {(keywords || []).slice(0, 6).map((kw, i) => (
                                                <span key={i} className={styles.tag}>
                                                        {kw}
                                                </span>
                                        ))}
                                </div>

                                <div className={styles.cardFooter}>
                                        <a
                                                className={styles.readMore}
                                                href={LinkURL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                        >
                                                Read full article
                                        </a>

                                        <div className={styles.smallMeta}>
                                                <button
                                                        className={styles.sourceBtn}
                                                        type="button"
                                                        onClick={() => {
                                                                // lightweight interaction - copy link
                                                                navigator.clipboard?.writeText(LinkURL).then(
                                                                        () => alert('Link copied!'),
                                                                        () => { }
                                                                );
                                                        }}
                                                >
                                                        Copy link
                                                </button>
                                        </div>
                                </div>
                        </div>
                </article>
        );
}
