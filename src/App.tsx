import React, { Component } from 'react';
import { GoogleMap, useJsApiLoader, KmlLayer, Marker } from '@react-google-maps/api';
import mapStyles from "./mapStyles";

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 40.644366,
  lng: -39.872822
};
const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};
const kmlOptions = {
  suppressInfoWindows: true
};
const testPicLatLong = {
  lat: 44.285763, 
  lng: -121.536175
};
const testIcon = {
  url: "https://storage.googleapis.com/summer_of_jake_map_pictures/dog_test.jpg"
  // scaledSize: new window.google.maps.Size(30, 30)
};

function App() {
  const {isLoaded, loadError} = useJsApiLoader({
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
        options={mapOptions}
      >

        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/2021_spring_road_trip_10.kmz"
          options={kmlOptions} 
        />
        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/2021_fall_road_trip_4.kmz"
          options={kmlOptions} 
        />
        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/PCT_pt_1.kmz"
          options={kmlOptions} 
        />
        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/PCT_pt_2.kmz"
          options={kmlOptions} 
        />
        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/Tahoe_Rim_Trail_1.kmz"
          options={kmlOptions} 
        />
        <KmlLayer 
          url="https://storage.googleapis.com/strava-kmls/2019_road_trip_1.kmz"
          options={kmlOptions} 
        />
        <Marker
          position={testPicLatLong}
          icon={testIcon}
        />
      </GoogleMap>
    </div>
  );
}

export default App;
