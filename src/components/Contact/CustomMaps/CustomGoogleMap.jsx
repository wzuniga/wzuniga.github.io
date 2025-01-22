import React from "react";
import GoogleMaps from "simple-react-google-maps";


function CustomGoogleMap() {

  return (
    <>
      <GoogleMaps
        apiKey={"AIzaSyA4Yh3B9y2tkpmolYDKssnOUTS92Wu6Bt8"}
        style={{height: "100%", width: "100%"}}
        zoom={6}
        center={{lat: -16.39883116527174, lng: -71.53692868188723}}
        markers={{lat: -16.39883116527174, lng: -71.53692868188723}} //optional
        
      />
    </>
  );
}

export default CustomGoogleMap;
