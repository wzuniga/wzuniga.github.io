import React from "react";
import './Home.css';
//import StarrySky from "./components/sky/sky";
//<StarrySky />
import InitialGreeting from "./components/InitialGreeting/InitialGreeting"
import SocialLinks from "./components/SocialLinks/SocialLinks"
import Navigation from "./components/Navigation/Navigation"
import AboutMe from "./components/AboutMe/AboutMe";
import WhereIWorked from "./components/WhereIWorked/WhereIWorked";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer"; // new import
import ModalAlert from "./components/ModalAlert/ModalAlert"; // new import
import SpaceBackground from "./components/SpaceBackground/SpaceBackground";

function Home({ passInitial, sendTrackBack }) {

  return (
    <div className={`generalContainer ${passInitial ? "showHome" : ""}`}>
      <SpaceBackground />
      <Navigation sendTrackBack={sendTrackBack} />

      <div className="containerInitial" id="home">
        {/* <div className="announcement">
          <span>🚧 This page is still under construction. Stay tuned for updates! (22/02/25) 🚧 V 1.2.6</span>
        </div> */}
        <InitialGreeting />
        <SocialLinks />
      </div>
      <AboutMe />
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
