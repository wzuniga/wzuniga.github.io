import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import "./Navigation.scss";
import Pdf from '../../wzunigah.pdf';

function Navigation({ sendTrackBack, external }) {
    return (
        <div className={`navigationContainer ${external ? "navigationContainerExternal" : ""}`}>
            <ul>
                <li onClick={() => sendTrackBack("RESUME")}><a href = {Pdf} target = "_blank" rel="noopener noreferrer"><DownloadIcon />Resume</a></li>
                <li onClick={() => sendTrackBack("PORTFOLIO")}><a href={`${external ? "/" : ""}#portfolio`}>Portfolio</a></li>
                <li onClick={() => sendTrackBack("EXPERIENCE")}><a href={`${external ? "/" : ""}#whereWorked`}>Experience</a></li>
                <li onClick={() => sendTrackBack("GREETING")}><a href={`${external ? "/" : ""}#home`}>Home</a></li>
            </ul>
        </div>
    )
}

export default Navigation;
