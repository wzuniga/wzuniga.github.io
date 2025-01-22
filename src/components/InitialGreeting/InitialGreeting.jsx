import React from "react";
import { useState, useEffect } from "react";
import "./InitialGreeting.scss";

function InitialGreeting() {
    const [greetingPosition, setGreetingPosition] = useState(0);
    const [greeting] = useState(["Hello! I'm: ", " ¡Hola! soy: ", "Oi! Eu sou: "]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingPosition(prevGreetingPosition => (prevGreetingPosition + 1) % 3)
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="greeting__container">
            <div className="greeting__container__object">{"@wzunigah:~$ {"}</div>
            <div className="greeting__container__text">
                {greeting[greetingPosition]}
            </div>
            <div className="greeting__container__text">
                Walter
            </div>
            <div className="greeting__container__object">{"}"}</div>
        </div>
    );
}

export default InitialGreeting;
