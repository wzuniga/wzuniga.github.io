import React, { useState } from "react";
import './Contact.css';
//import StarrySky from "../sky/sky";
import Navigation from "../Navigation/Navigation";
import CustomGoogleMap from "./CustomMaps/CustomGoogleMap";
import MapView from "./CustomMaps/MapView";
import Paragraph from "../Util/Paragraph";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

function Contact() {

  const [showMaps, setShowMaps] = useState(true);

  const changeShowMap = () => {
    setShowMaps(!showMaps);
  };

  return (
    <div>
      <Navigation />
      <Paragraph className={"leftContact"}>
        <div className="contactSection">
          <div className="codeStyle">
            {"<html>"}
            <div style={{ paddingLeft: "40px" }}>
              {"<body>"}
              <div style={{ paddingLeft: "40px" }}>
                {"<h1>"}
                <div style={{ paddingLeft: "40px" }}>
                  <h1 className="h1Contact"> Contact me </h1>
                </div>
                {"</h1>"}
              </div>
              <div style={{ paddingLeft: "40px" }}>
                {"<p>"}

                <Typography className="typoContact">
                  I'm interested in freelance opportunities - especially ambitious or large projects. However,
                  if you have other request or question, don't hesitate to use the form.
                </Typography>
                {"</p>"}
              </div>
              {"</body>"}
            </div>
            {"</html>"}
          </div>



        </div>
        <div className="showMapType">
          <Typography className="typographySwitch">Show OpenStreetMap</Typography>
          <FormControlLabel onChange={changeShowMap} control={<Switch value={showMaps} />} label="Show GoogleMaps" />
        </div>
      </Paragraph>
      <Paragraph className="rigthContact">
        {showMaps ? <MapView /> : <CustomGoogleMap />}
      </Paragraph>
    </div>
  );
}

export default Contact;
