import React, { useContext } from "react";
import './Home.css';
//import StarrySky from "./components/sky/sky";
//<StarrySky />
import InitialGreeting from "./components/InitialGreeting/InitialGreeting"
import SocialLinks from "./components/SocialLinks/SocialLinks"
import Navigation from "./components/Navigation/Navigation"
import WhereIWorked from "./components/WhereIWorked/WhereIWorked";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer"; // new import
import ModalAlert from "./components/ModalAlert/ModalAlert"; // new import
import { ThemeContext } from './ThemeContext';

function Home({ passInitial, sendTrackBack }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`generalContainer ${passInitial ? "showHome" : ""} ${theme}`}>
      <Navigation sendTrackBack={sendTrackBack} />

      <div className="containerInitial" id="home">
        {/* <div className="announcement">
          <span>🚧 This page is still under construction. Stay tuned for updates! (22/02/25) 🚧 V 1.2.6</span>
        </div> */}
        <InitialGreeting />
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
