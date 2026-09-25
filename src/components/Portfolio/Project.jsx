import React from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "./Project.scss";
import Flag from "../WhereIWorked/Flag";
import CoverArt from "./CoverArt";
import { useLanguage } from "../../i18n/LanguageContext";

// [from, to] -> "2021 – 2022"; `to === null` means present; [year] -> "2020".
function formatPeriod(period, t) {
  if (!period) return null;
  if (period.length === 1) return String(period[0]);
  return `${period[0]} – ${period[1] ?? t("present")}`;
}

function ProjectMeta({ project }) {
  const { t } = useLanguage();
  if (!project.company && !project.country && !project.period) return null;
  return (
    <p className="project-meta">
      {project.country && <Flag code={project.country} />}
      {project.company && <span>{project.company}</span>}
      {project.period && <span className="project-meta__period">{formatPeriod(project.period, t)}</span>}
    </p>
  );
}

function Tools({ tools }) {
  const { t } = useLanguage();
  return (
    <ul className="project-tools" aria-label={t("portfolio.stack")}>
      {tools.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
  );
}

// Large card with a screenshot gallery, alternating sides.
export function FeaturedProject({ project, index }) {
  const { t, tr } = useLanguage();
  const isEven = index % 2 === 0;
  const name = tr(project.name);
  const categoryLabel = project.categories.map((c) => t(`cat.${c}`)).join(" · ");

  return (
    <article className={`project-card ${isEven ? "project-card--even" : "project-card--odd"}`}>
      <div className="project-card__content">
        <p className="project-card__category">{categoryLabel}</p>
        <h3 className="project-card__title">{name}</h3>
        <ProjectMeta project={project} />
        <p className="project-card__summary">{tr(project.summary)}</p>
        <ul className="project-card__specs">
          {project.specifications.map((value) => (
            <li key={value.en}>{tr(value)}</li>
          ))}
        </ul>
        <Tools tools={project.tools} />
      </div>

      <div className="project-card__gallery">
        <CCarousel controls indicators dark interval={false}>
          {project.images.map((image, i) => (
            <CCarouselItem key={`img-${i}`}>
              <CImage
                className="d-block w-100 project-card__image"
                src={image.img}
                alt={t("portfolio.screenshotAlt", { name, index: i + 1, count: project.images.length })}
                loading="lazy"
              />
            </CCarouselItem>
          ))}
        </CCarousel>
        <span className="project-card__count">{t("portfolio.screenshots", { count: project.images.length })}</span>
      </div>
    </article>
  );
}

// Compact card with a generated cover, for confidential work and research.
export function CaseStudy({ project }) {
  const { t, tr } = useLanguage();
  const categoryLabel = project.categories.map((c) => t(`cat.${c}`)).join(" · ");

  return (
    <article className="case-card">
      <div className="case-card__cover">
        <CoverArt kind={project.cover} />
        {project.confidential && (
          <span className="case-card__badge" title={t("portfolio.confidentialHint")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {t("portfolio.confidential")}
          </span>
        )}
      </div>
      <div className="case-card__body">
        <p className="project-card__category">{categoryLabel}</p>
        <h3 className="case-card__title">{tr(project.name)}</h3>
        <ProjectMeta project={project} />
        <p className="case-card__summary">{tr(project.summary)}</p>
        <ul className="case-card__specs">
          {project.specifications.map((value) => (
            <li key={value.en}>{tr(value)}</li>
          ))}
        </ul>
        <Tools tools={project.tools} />
      </div>
    </article>
  );
}
