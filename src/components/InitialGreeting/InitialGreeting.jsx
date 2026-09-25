import React from "react";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./InitialGreeting.scss";
import { useLanguage } from "../../i18n/LanguageContext";

// The greeting cycles through all three languages, starting with the selected one.
const GREETING_ORDER = ["en", "es", "pt"];

function InitialGreeting() {
    const { lang, t } = useLanguage();
    const [greetingPosition, setGreetingPosition] = useState(GREETING_ORDER.indexOf(lang));
    const [greeting] = useState(["Hello! I'm: ", " ¡Hola! soy: ", "Oi! Eu sou: "]);
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        setGreetingPosition(GREETING_ORDER.indexOf(lang));
    }, [lang]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingPosition(prevGreetingPosition => (prevGreetingPosition + 1) % 3)
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Draggable defaultPosition={{ x: -(window.innerWidth / 2) , y: -(window.innerHeight / (isMobile ? 3 : 4))  }}>
            <div className="greeting__container" title={t("greeting.drag")}>
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>
                <div className="greeting__container__object">{"@wzunigah:~$ {"}</div>
                <div className="greeting__container__text">
                    {greeting[greetingPosition]}
                </div>
                <div className="greeting__container__text">
                    Walter
                </div>
                <div className="greeting__container__object">{"}"}</div>
            </div>
        </Draggable>
    );
}

export default InitialGreeting;
