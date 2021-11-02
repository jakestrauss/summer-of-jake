import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from "./components/Map";
function App() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
    });
    return (
        <Map isLoaded={isLoaded} loadError={loadError}/>
    );
}
export default App;
