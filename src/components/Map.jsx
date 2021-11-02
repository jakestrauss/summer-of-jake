import React, {useEffect, useState} from 'react';
import { GoogleMap, KmlLayer, Marker, useJsApiLoader } from '@react-google-maps/api';
import mapStyles from './../mapStyles';
import RouteURLService from '../services/RouteURLService';
import MarkerService from '../services/MarkerService';

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

export default function Map() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
    });

    const [routes, setRoutes] = useState(0);
    const [markers, setMarkers] = useState(1);
    useEffect(() => {
        setRoutes(RouteURLService.getRoutes())
        setMarkers(MarkerService.getMarkers())
    });

    if (loadError)
        return (<>Error loading maps</>);
    if (!isLoaded)
        return (<>Loading maps</>);
    const markerSize = new window.google.maps.Size(20, 20);

    return (
        <div>
            <h1>Summer of Jake Adventure Map</h1>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center} options={mapOptions}>
                {
                    routes.map(route => (<KmlLayer url={route} options={kmlOptions}/>
                ))}
                {
                    markers.map(marker => {
                        const localIcon = {
                            url: marker.url,
                            scaledSize: markerSize
                        }
                        return(<Marker position={marker.latLong} icon={localIcon}/>)
                    })
                }
            </GoogleMap>
        </div>
    );
}
