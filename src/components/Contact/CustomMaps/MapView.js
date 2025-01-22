import React from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./VenueMarkers";

import "leaflet/dist/leaflet.css";

const MapView = () => {
  const state = {
    currentLocation: { lat: -16.39883116527174, lng: -71.53692868188723 },
    zoom: 6,
    data: [{
      "description": "Si, aquí vivo",
      "name": "Si, aquí vivo",
      "geometry": [
        -16.39883116527174,
        -71.53692868188723
      ]
    }],
  };

  return (
    <Map
      center={state.currentLocation}
      zoom={state.zoom}
      style={{height: "100%", width: "100%"}}
      animate={true}
    >
      <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={state.data} />
    </Map>
  );
};

export default MapView;
