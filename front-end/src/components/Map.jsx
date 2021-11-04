import React, {useEffect, useState} from 'react';
import { GoogleMap, KmlLayer, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
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

    const [routes, setRoutes] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);

    useEffect(() => {
        RouteURLService.getRoutes().then(result => setRoutes(result));
        MarkerService.getMarkers().then(result => setMarkers(result));
    }, []);

    if (loadError)
        return (<>Error loading maps</>);
    if (!isLoaded || !routes)
        return (<>Loading maps</>);
    const markerSize = new window.google.maps.Size(20, 20);
    const markerClick = () => {setInfoWindowVisible(true)};
    const infoWindowClose = () => {setInfoWindowVisible(false)};

    return (
        <div>
            <h1>Summer of Jake Adventure Map</h1>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center} options={mapOptions}>
                {
                    routes.map(route => (<KmlLayer url={route} options={kmlOptions} key={`kmlLayer-${route}`}/>
                ))}
                {
                    markers.map(marker => {
                        const localIcon = {
                            url: marker.url,
                            scaledSize: markerSize
                        }
                        return(
                            <>
                                <Marker position={marker.latLong} icon={localIcon} key={`marker-${marker.latLong}`} onClick={markerClick}>
                                </Marker>
                                {infoWindowVisible 
                                    && <InfoWindow key={`infoWindow-${marker.latLong}`} visible={false} position={marker.latLong} onCloseClick={infoWindowClose}>
                                        <div><img src={marker.url} alt="Marker"></img></div>
                                    </InfoWindow>
                                }
                            </>   
                        )
                    })
                }
            </GoogleMap>
        </div>
    );
}
