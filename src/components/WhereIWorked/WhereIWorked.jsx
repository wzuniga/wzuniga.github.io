import React, { useState, useEffect, useRef } from "react";
import "./WhereIWorked.css";
import workInfoDict from "./WhereIWorkedData";

function WhereIWorked() {
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
      <h2 className="numbered-heading">Where I've worked</h2>
      <div className="innerBox">
        {/* Tab List */}
        <div
          className="tabList"
          role="tablist"
          aria-label="Job tabs"
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
          <span>Swipe ➜</span>
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
                <span>{job.position}</span>
                <span className="company">
                  &nbsp;@&nbsp;
                  {job.company}
                </span>
              </h3>
              <p className="range">{job.from} - {job.to}</p>

              <div className="specifications">
                <ul>
                  {job.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="technologies">
                <h4 className="tech-heading">Technologies:</h4>
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
