import React, { useState, useEffect, useRef } from "react";
import "./WhereIWorked.css";
import workInfoDict from "./WhereIWorkedData";
import Flag from "./Flag";
import { useLanguage } from "../../i18n/LanguageContext";

const isPresent = (value) => value === "present";

// "2026-06" -> months since year 0; "present" -> current month.
function toMonthIndex(value) {
  if (isPresent(value)) {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month - 1;
}

// "2026-06" -> "June 2026" / "Junio de 2026" / "Junho de 2026".
function formatMonth(value, locale, t) {
  if (isPresent(value)) return t("present");
  const [year, month] = value.split("-").map(Number);
  const text = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Inclusive duration, LinkedIn style: "2 yrs 3 mos" / "2 años 3 meses".
function formatDuration(from, to, t) {
  const total = toMonthIndex(to) - toMonthIndex(from) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} ${t(years === 1 ? "duration.yr" : "duration.yrs")}`);
  if (months) parts.push(`${months} ${t(months === 1 ? "duration.mo" : "duration.mos")}`);
  return parts.join(" ");
}

function WhereIWorked() {
  const { t, tr, locale } = useLanguage();
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const tabListRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveTabId(index);
          }
        });
      },
      {
        root: tabListRef.current,
        // Defines a narrow vertical strip in the center for detection
        rootMargin: "0px -45% 0px -45%",
        threshold: 0.1,
      }
    );

    tabs.current.forEach((tab) => {
      if (tab) observer.observe(tab);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  useEffect(() => focusTab(), [tabFocus]);

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <section className="workedContainer" id="whereWorked">
      <h2 className="numbered-heading">{t("experience.title")}</h2>
      <div className="innerBox">
        {/* Tab List */}
        <div
          className="tabList"
          role="tablist"
          aria-label={t("experience.tabs")}
          onKeyDown={onKeyDown}
          ref={tabListRef}
        >
          {workInfoDict.map((job, i) => (
            <button
              key={i}
              className={`tabButton ${activeTabId === i ? "activeTab" : ""}`}
              onClick={() => setActiveTabId(i)}
              onMouseEnter={() => !isMobile && setActiveTabId(i)}
              ref={(el) => (tabs.current[i] = el)}
              id={`tab-${i}`}
              data-index={i}
              role="tab"
              tabIndex={activeTabId === i ? "0" : "-1"}
              aria-selected={activeTabId === i}
              aria-controls={`panel-${i}`}
            >
              <Flag code={job.country} />
              <span>{job.company}</span>
            </button>
          ))}
          <div
            className="tabHighlight"
            style={{
              transform: `translateY(${activeTabId * 42}px)`,
            }}
          />
        </div>
        <div className="mobile-scroll-indicator">
          <span>{t("experience.swipe")}</span>
        </div>

        {/* Tab Content */}
        <div className="tabContent">
          {workInfoDict.map((job, i) => (
            <div
              key={i}
              id={`panel-${i}`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`tab-${i}`}
              hidden={activeTabId !== i}
              className={`tabPanel ${activeTabId === i ? "fadeIn" : ""}`}
            >
              <h3>
                <span>{tr(job.position)}</span>
                <span className="company">
                  &nbsp;@&nbsp;
                  {job.company}
                </span>
              </h3>

              <ul className="jobMeta">
                <li>
                  <Flag code={job.country} />
                  {tr(job.place)}
                </li>
                <li className="range">
                  {formatMonth(job.from, locale, t)} - {formatMonth(job.to, locale, t)}
                </li>
                <li className="duration">{formatDuration(job.from, job.to, t)}</li>
                {isPresent(job.to) && <li className="currentBadge">{t("experience.current")}</li>}
              </ul>

              {job.summary && <p className="jobSummary">{tr(job.summary)}</p>}

              <div className="specifications">
                <ul>
                  {job.specifications.map((spec, index) => (
                    <li key={index}>{tr(spec)}</li>
                  ))}
                </ul>
              </div>

              <div className="technologies">
                <h4 className="tech-heading">{t("experience.technologies")}</h4>
                <ul className="tech-list">
                  {job.tools.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhereIWorked;
