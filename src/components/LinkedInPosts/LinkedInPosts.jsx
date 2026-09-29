import React from "react";
import "./LinkedInPosts.scss";
import posts, { LINKEDIN_PROFILE, LINKEDIN_ACTIVITY, SERIES_LENGTH } from "./postsData";
import CoverArt from "../Portfolio/CoverArt";
import { useLanguage } from "../../i18n/LanguageContext";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

function formatDate(iso, locale) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
}

function PostCard({ post }) {
  const { t, tr, locale } = useLanguage();
  const title = tr(post.title);

  return (
    <article className="li-post">
      <a className="li-post__cover" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`${t("posts.read")}: ${title}`}>
        <CoverArt kind={post.cover} />
        <span className={`li-post__badge ${post.part ? "" : "li-post__badge--alt"}`}>
          {post.part ? t("posts.series", { part: post.part, total: SERIES_LENGTH }) : t("posts.security")}
        </span>
      </a>

      <div className="li-post__body">
        <time className="li-post__date" dateTime={post.date}>{formatDate(post.date, locale)}</time>
        <h3 className="li-post__title">{title}</h3>
        <p className="li-post__summary">{tr(post.summary)}</p>
        <ul className="li-post__takeaways">
          {post.takeaways.map((item) => (
            <li key={item.en}>{tr(item)}</li>
          ))}
        </ul>
        <ul className="li-post__tags">
          {post.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>

        <div className="li-post__footer">
          <span className="li-post__stats">
            <span title={t("posts.reactions", { count: post.reactions })}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 21h4V9H2v12zm20-11a2 2 0 0 0-2-2h-6.3l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 6.59 7.59C6.22 7.95 6 8.45 6 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
              <span className="visually-hidden">{t("posts.reactions", { count: post.reactions })}</span>
              <span aria-hidden="true">{post.reactions}</span>
            </span>
            {post.comments > 0 && (
              <span title={t("posts.comments", { count: post.comments })}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="visually-hidden">{t("posts.comments", { count: post.comments })}</span>
                <span aria-hidden="true">{post.comments}</span>
              </span>
            )}
          </span>
          <a className="li-post__link" href={post.url} target="_blank" rel="noopener noreferrer">
            {t("posts.read")} ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function LinkedInPosts() {
  const { t } = useLanguage();
  const series = posts.filter((post) => post.part).sort((a, b) => a.part - b.part);
  const others = posts.filter((post) => !post.part);

  return (
    <section className="postsContainer" id="posts">
      <h2 className="numbered-heading">{t("posts.title")}</h2>
      <p className="posts-intro">{t("posts.intro")}</p>

      <h3 className="posts-series">{t("posts.seriesName")}</h3>
      <div className="posts-grid posts-grid--series">
        {series.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>

      <div className="posts-grid posts-grid--single">
        {others.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>

      <div className="posts-cta">
        <a className="posts-cta__primary" href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
          {t("posts.follow")}
        </a>
        <a className="posts-cta__secondary" href={LINKEDIN_ACTIVITY} target="_blank" rel="noopener noreferrer">
          {t("posts.all")} ↗
        </a>
      </div>
    </section>
  );
}

export default LinkedInPosts;
