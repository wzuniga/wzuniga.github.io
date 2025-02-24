import React from "react";
import "./SocialLinks.scss";
import linkedin from "./svg/linkedin.svg"
import github from "./svg/github.svg"

function SocialLinks() {

    return (
        <div className="social__container">
            <a
                href="https://www.linkedin.com/in/wzunigah"
                target = "_blank"
                rel="noopener noreferrer"
            >
                <img width={50} src={linkedin} alt="linkedin" />
            </a>
            <a
                href="https://github.com/wzuniga"
                target = "_blank"
                rel="noopener noreferrer"
            >
                <img width={50} src={github} alt="github" />
            </a>
        </div>
    );
}

export default SocialLinks;