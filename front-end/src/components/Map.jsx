import React, {useEffect, useState} from 'react';
import '../static/Map.css';
import { GoogleMap, KmlLayer, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import mapStyles from './../mapStyles';
import RouteURLService from '../services/RouteURLService';
import MarkerService from '../services/MarkerService';

//Map Constants
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
const hardCodedKmlOptions = {
    suppressInfoWindows: true
};
const kmlInfoWindowOptions = {
    maxWidth: 500
}

export default function Map() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
    });

    //State variables
    const [routes, setRoutes] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);
    const [fall19Window, setFall19Window] = useState(false);
    const [fall19WindowPos, setFall19WindowPos] = useState({ lat: -25.363, lng: 131.044 });
    const [pctOneWindow, setPctOneWindow] = useState(false);
    const [pctOneWindowPos, setPctOneWindowPos] = useState({ lat: -25.363, lng: 131.044 });
    const [pctTwoWindow, setPctTwoWindow] = useState(false);
    const [pctTwoWindowPos, setPctTwoWindowPos] = useState({ lat: -25.363, lng: 131.044 });

    useEffect(() => {
        RouteURLService.getRoutes().then(result => setRoutes(result));
        MarkerService.getMarkers().then(result => setMarkers(result));
    }, []);

    if (loadError)
        return (<>Error loading maps</>);
    if (!isLoaded || !routes)
        return (<>Loading maps</>);
    

    const markerSize = new window.google.maps.Size(20, 20);

    //Click events
    const markerClick = () => {setInfoWindowVisible(true)};
    const markerInfoWindowClose = () => {setInfoWindowVisible(false)};

    const fall19Click = (mapsMouseEvent) => {
        setFall19Window(true);
        setFall19WindowPos(mapsMouseEvent.latLng);
    };
    const fall19Close = () => {setFall19Window(false)};
    const pctOneClick = (mapsMouseEvent) => {
        setPctOneWindow(true);
        setPctOneWindowPos(mapsMouseEvent.latLng);
    };
    const pctTwoClick = (mapsMouseEvent) => {
        setPctTwoWindow(true);
        setPctTwoWindowPos(mapsMouseEvent.latLng);
    };
    const pctOneClose = () => {setPctOneWindow(false)};
    const pctTwoClose = () => {setPctTwoWindow(false)};


    const mapClick = () => {
        fall19Close();
        pctOneClose();
        pctTwoClose();
        markerInfoWindowClose();
    }

    return (
        <div>
            <h1 className="map-title">Summer of Jake</h1>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center} options={mapOptions} onClick={mapClick}>
                {
                    routes.map(route => (<KmlLayer url={route} options={hardCodedKmlOptions} key={`kmlLayer-${route}`}/>
                ))}
                <>
                <KmlLayer key={`fall19Kml`} url="https://storage.googleapis.com/strava-kmls/2019_road_trip_15.kmz" options={hardCodedKmlOptions} onClick={fall19Click} />
                {
                    fall19Window
                    && <InfoWindow key={`fall19InfoWindow`} visible={false} onCloseClick={fall19Close} options={kmlInfoWindowOptions} position={fall19WindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">2019 Road Trip: The Long Way to Seattle</h2>
                            <p className="kml-info-window-body">The summer after I graduated college, I lived out of my Rav4 for 3 months and took my sweet time moving out to Seattle to start my first "real" job.</p>
                            <div class="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/1ZjSy4kVV0w" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }

                <KmlLayer key={`PCT_pt_1`} url="https://storage.googleapis.com/strava-kmls/PCT_pt_1.kmz" options={hardCodedKmlOptions} onClick={pctOneClick} />
                {
                    pctOneWindow
                    && <InfoWindow key={`pctInfoWindowOne`} visible={false} onCloseClick={pctOneClose} options={kmlInfoWindowOptions} position={pctOneWindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">A Slower Method of Travel: 2021 Thru Hike of the Pacific Crest Trail</h2>
                            <p className="kml-info-window-body">After quitting my corporate job in Seattle in March, I spent mid-April to September on the adventure of a lifetime hiking from Mexico to Canada.</p>
                            <div class="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/7RJZMheYyFI" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }
                <KmlLayer key={`PCT_pt_2`} url="https://storage.googleapis.com/strava-kmls/PCT_pt_2.kmz" options={hardCodedKmlOptions} onClick={pctTwoClick} />
                {
                    pctTwoWindow
                    && <InfoWindow key={`pctInfoWindowTwo`} visible={false} onCloseClick={pctTwoClose} options={kmlInfoWindowOptions} position={pctTwoWindowPos}>
                        <div>
                            <h2 className="kml-info-window-title">A Slower Method of Travel: 2021 Thru Hike of the Pacific Crest Trail</h2>
                            <p className="kml-info-window-body">After quitting my corporate job in Seattle in March, I spent mid-April to September on the adventure of a lifetime hiking from Mexico to Canada.</p>
                            <div class="iframe-container" position="relative" width="100%" height="100%" padding-bottom="56.25%">
                                <iframe src="https://www.youtube.com/embed/7RJZMheYyFI" position="absolute" top="0" left="0" width="100%" height="100%" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        </InfoWindow>
                }
                </>
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
                                    && <InfoWindow key={`infoWindow-${marker.latLong}`} visible={false} position={marker.latLong} onCloseClick={markerInfoWindowClose}>
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
