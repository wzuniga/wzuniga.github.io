import React, { useContext } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import "./Navigation.scss";
import Pdf from "../../wzunigah.pdf";
import { ThemeContext } from "../../ThemeContext";
import ThemeToggleSwitch from "../ThemeToggleSwitch/ThemeToggleSwitch"; // new import

function Navigation({ sendTrackBack, external }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`navigationContainer ${external ? "navigationContainerExternal" : ""}`}>
      <ul>
        <li>
          <ThemeToggleSwitch />
        </li>
        <li onClick={() => sendTrackBack("GREETING")}>
          <a href={`${external ? "/" : ""}#home`}>Home</a>
        </li>
        <li onClick={() => sendTrackBack("EXPERIENCE")}>
          <a href={`${external ? "/" : ""}#whereWorked`}>Experience</a>
        </li>
        <li onClick={() => sendTrackBack("PORTFOLIO")}>
          <a href={`${external ? "/" : ""}#portfolio`}>Portfolio</a>
        </li>
        <li onClick={() => sendTrackBack("RESUME")}>
          <a href={Pdf} target="_blank" rel="noopener noreferrer">
            <DownloadIcon />Resume
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
