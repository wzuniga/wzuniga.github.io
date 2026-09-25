import React, { useContext, useState, useEffect } from "react";
import './Home.css';
//import StarrySky from "./components/sky/sky";
//<StarrySky />
import InitialGreeting from "./components/InitialGreeting/InitialGreeting"
import PythonGreeting from "./components/PythonGreeting/PythonGreeting"
import SocialLinks from "./components/SocialLinks/SocialLinks"
import Navigation from "./components/Navigation/Navigation"
import WhereIWorked from "./components/WhereIWorked/WhereIWorked";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer"; // new import
import ModalAlert from "./components/ModalAlert/ModalAlert"; // new import
import { ThemeContext } from './ThemeContext';

function Home({ passInitial, sendTrackBack }) {
  const { theme } = useContext(ThemeContext);
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const containerInitial = document.getElementById('home');
      if (containerInitial) {
        const rect = containerInitial.getBoundingClientRect();
        // Mostrar navegación cuando containerInitial sale de la vista
        setShowNavigation(rect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`generalContainer ${passInitial ? "showHome" : ""} ${theme} ${showNavigation ? "with-fixed-nav" : ""}`}>
      {showNavigation && <Navigation sendTrackBack={sendTrackBack} external={true} />}

      <div className="containerInitial" id="home">
        {/* <div className="announcement">
          <span>🚧 This page is still under construction. Stay tuned for updates! (22/02/25) 🚧 V 1.2.6</span>
        </div> */}
        <PythonGreeting />
        {/* <InitialGreeting /> */}
        <SocialLinks />
      </div>
      <WhereIWorked />
      <Portfolio />
      {/* <ModalAlert /> */}
      <Footer />
      <div className="mailComponent">
        <div className="innerMailComponent">
          <a className="aMailComponent" href="mailto:wzunigah@gmail.com">wzunigah@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
