import React from "react";
import './Home.css';
//import StarrySky from "./components/sky/sky";
//<StarrySky />
import InitialGreeting from "./components/InitialGreeting/InitialGreeting"
import SocialLinks from "./components/SocialLinks/SocialLinks"
import Navigation from "./components/Navigation/Navigation"
import WhereIWorked from "./components/WhereIWorked/WhereIWorked";
import Portfolio from "./components/Portfolio/Portfolio";

function Home({ passInitial, sendTrackBack }) {
  return (
    <div className={`generalContainer ${passInitial ? "showHome" : ""}`}>
      <Navigation sendTrackBack={sendTrackBack}/>
      
      <div className="containerInitial" id="home">
        <div className="announcement">
          <span>🚧 This page is still under construction. Stay tuned for updates! 🚧 V 1.2.4</span>
        </div>
        <InitialGreeting />
        <SocialLinks />
      </div>
      <WhereIWorked />
      <Portfolio />
      <div className="mailComponent">
        <div className="innerMailComponent">
          <a className="aMailComponent" href="mailto:wzunigah@gmail.com">wzunigah@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
