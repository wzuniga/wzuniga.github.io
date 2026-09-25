import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import "./Navigation.scss";
import Pdf from "../../wzunigah.pdf";
import { LANGUAGES, useLanguage } from "../../i18n/LanguageContext";

function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="langSwitcher" role="group" aria-label={t("nav.language")}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`langSwitcher__option ${lang === l.code ? "is-active" : ""}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.name}
          lang={l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Navigation({ sendTrackBack, external }) {
  const { t } = useLanguage();
  const base = external ? "/" : "";

  return (
    <div className={`navigationContainer ${external ? "navigationContainerExternal" : ""}`}>
      <ul>
        <li onClick={() => sendTrackBack("GREETING")}>
          <a href={`${base}#home`}>{t("nav.home")}</a>
        </li>
        <li className="navHideMobile" onClick={() => sendTrackBack("ABOUT")}>
          <a href={`${base}#about`}>{t("nav.about")}</a>
        </li>
        <li className="navHideMobile" onClick={() => sendTrackBack("EXPERIENCE")}>
          <a href={`${base}#whereWorked`}>{t("nav.experience")}</a>
        </li>
        <li className="navHideMobile" onClick={() => sendTrackBack("PORTFOLIO")}>
          <a href={`${base}#portfolio`}>{t("nav.portfolio")}</a>
        </li>
        <li onClick={() => sendTrackBack("RESUME")}>
          <a href={Pdf} target="_blank" rel="noopener noreferrer">
            <DownloadIcon />{t("nav.resume")}
          </a>
        </li>
        <li className="navLang">
          <LanguageSwitcher />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
