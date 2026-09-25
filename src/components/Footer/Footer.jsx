import React from "react";
import "./Footer.scss";
import Pdf from "../../wzunigah.pdf";
import linkedin from "../SocialLinks/svg/linkedin.svg";
import github from "../SocialLinks/svg/github.svg";
import { useLanguage } from "../../i18n/LanguageContext";

// Class names use the `site-footer` prefix: CoreUI ships its own `.footer`
// component class (light background) that would otherwise override these styles.
function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__prompt">@wzunigah:~$</p>
          <p className="site-footer__name">Walter Zuñiga</p>
          <p className="site-footer__role">{t("footer.role")}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <a href="#home">{t("nav.home")}</a>
          <a href="#about">{t("nav.about")}</a>
          <a href="#whereWorked">{t("nav.experience")}</a>
          <a href="#portfolio">{t("nav.portfolio")}</a>
          <a href={Pdf} target="_blank" rel="noopener noreferrer">{t("nav.resume")}</a>
        </nav>

        <div className="site-footer__social">
          <a href="https://www.linkedin.com/in/wzunigah" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src={linkedin} alt="" />
          </a>
          <a href="https://github.com/wzuniga" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src={github} alt="" />
          </a>
          <a href="mailto:wzunigah@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Walter Zuñiga. {t("footer.rights")}</p>
        <a href="mailto:wzunigah@gmail.com" className="site-footer__mail">wzunigah@gmail.com</a>
        <a href="#home" className="site-footer__top">{t("footer.top")}</a>
      </div>
    </footer>
  );
}

export default Footer;
