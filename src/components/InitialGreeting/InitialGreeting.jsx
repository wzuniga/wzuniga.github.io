import React from "react";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./InitialGreeting.scss";

function InitialGreeting() {
    const [greetingPosition, setGreetingPosition] = useState(0);
    const [greeting] = useState(["Hello! I'm: ", " ¡Hola! soy: ", "Oi! Eu sou: "]);
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingPosition(prevGreetingPosition => (prevGreetingPosition + 1) % 3)
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Draggable defaultPosition={{ x: -(window.innerWidth / 2) , y: -(window.innerHeight / (isMobile ? 3 : 4))  }}>
            <div className="greeting__container" title="Arrástrame">
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
