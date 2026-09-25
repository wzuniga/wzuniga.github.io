import React, { useState } from "react";
import { FeaturedProject, CaseStudy } from "./Project";
import "./Portfolio.scss";
import portfolioDict, { categories } from "./PortfolioDictionary";
import { useLanguage } from "../../i18n/LanguageContext";

const ALL = "All";

function Portfolio() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(ALL);

  const matches = (project) => filter === ALL || project.categories.includes(filter);
  const visible = portfolioDict.filter(matches);
  const featured = visible.filter((project) => project.images);
  const caseStudies = visible.filter((project) => !project.images);

  const countFor = (category) =>
    category === ALL
      ? portfolioDict.length
      : portfolioDict.filter((project) => project.categories.includes(category)).length;

  return (
    <section className="portfolioContainer" id="portfolio">
      <h2 className="portfolio-heading">{t("portfolio.title")}</h2>
      <p className="portfolio-intro">
        {t("portfolio.intro.before")}
        <span>{t("portfolio.intro.highlight")}</span>
        {t("portfolio.intro.after")}
      </p>

      <div className="portfolio-filters" role="group" aria-label={t("portfolio.filter")}>
        {[ALL, ...categories].map((category) => (
          <button
            key={category}
            className={`portfolio-filter ${filter === category ? "is-active" : ""}`}
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
          >
            {category === ALL ? t("portfolio.all") : t(`cat.${category}`)}
            <span className="portfolio-filter__count">{countFor(category)}</span>
          </button>
        ))}
      </div>

      {featured.length > 0 && (
        <div className="portfolio-featured">
          {featured.map((project, index) => (
            <FeaturedProject project={project} index={index} key={project.name.en} />
          ))}
        </div>
      )}

      {caseStudies.length > 0 && (
        <>
          <h3 className="portfolio-subheading">
            {t("portfolio.caseStudies")}
            <span>{t("portfolio.caseStudiesSub")}</span>
          </h3>
          <div className="case-grid">
            {caseStudies.map((project) => (
              <CaseStudy project={project} key={project.name.en} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Portfolio;
