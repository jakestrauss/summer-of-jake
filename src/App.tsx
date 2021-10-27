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
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
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
        options={options}
      >

        <KmlLayer url="https://storage.googleapis.com/strava-kmls/mergedKML_1635298225660.kml" />
      </GoogleMap>
    </div>
  );
}

export default App;
