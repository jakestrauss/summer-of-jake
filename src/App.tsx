import React, { Component } from 'react';
import { GoogleMap, useLoadScript, KmlLayer } from '@react-google-maps/api';
import mapStyles from "./mapStyles";

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 40.644366,
  lng: -39.872822
};
const maOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}
const kmlOptions = {
  suppressInfoWindows: true
}

function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
  })

  if (loadError) return (<>Error loading maps</>);
  if (!isLoaded) return (<>Loading maps</>);

  return (
    <div>
      <h1>Summer of Jake Adventure Map</h1>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={3}
        center={center}
        options={maOptions}
      >

        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/2019_road_trip_final.kmz"
          options={kmlOptions} 
        />
        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/2021_spring_road_trip_7.kmz"
          options={kmlOptions} 
        />
        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/2021_fall_road_trip_3.kmz"
          options={kmlOptions} 
        />
      </GoogleMap>
    </div>
  );
}

export default App;
