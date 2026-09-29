import React, { useEffect, useState } from "react";
import './Home.css';
//import StarrySky from "./components/sky/sky";
//<StarrySky />
import InitialGreeting from "./components/InitialGreeting/InitialGreeting"
import SocialLinks from "./components/SocialLinks/SocialLinks"
import Navigation from "./components/Navigation/Navigation"
import AboutMe from "./components/AboutMe/AboutMe";
import WhereIWorked from "./components/WhereIWorked/WhereIWorked";
import Portfolio from "./components/Portfolio/Portfolio";
import LinkedInPosts from "./components/LinkedInPosts/LinkedInPosts";
import Footer from "./components/Footer/Footer"; // new import
import ModalAlert from "./components/ModalAlert/ModalAlert"; // new import
import SpaceBackground from "./components/SpaceBackground/SpaceBackground";
import GravityField from "./components/GravityField/GravityField";

// The greeting stays centered for a few seconds once the page is shown, then
// moves up to make room for the gravity simulation.
const GREETING_HOLD_MS = 6000;

function Home({ passInitial, sendTrackBack }) {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    if (!passInitial) return undefined;
    const id = setTimeout(() => setLifted(true), GREETING_HOLD_MS);
    return () => clearTimeout(id);
  }, [passInitial]);

  return (
    <div className={`generalContainer ${passInitial ? "showHome" : ""}`}>
      <SpaceBackground />
      <Navigation sendTrackBack={sendTrackBack} />

      <div className="containerInitial" id="home">
        {/* <div className="announcement">
          <span>🚧 This page is still under construction. Stay tuned for updates! (22/02/25) 🚧 V 1.2.6</span>
        </div> */}
        <GravityField lifted={lifted} />
        <div className={`heroGreeting ${lifted ? "is-lifted" : ""}`}>
          <InitialGreeting />
        </div>
        <SocialLinks />
      </div>
      <AboutMe />
      <WhereIWorked />
      <Portfolio />
      <LinkedInPosts />
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
