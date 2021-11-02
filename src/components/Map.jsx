import { GoogleMap, KmlLayer, Marker } from '@react-google-maps/api';
import mapStyles from "./../mapStyles";
import PropTypes from "prop-types";
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
Map.propTypes = {
    loadError: PropTypes.instanceOf(Error),
    isLoaded: PropTypes.bool
};
export default function Map({ loadError, isLoaded }) {
    if (loadError)
        return (<>Error loading maps</>);
    if (!isLoaded)
        return (<>Loading maps</>);
    const testIcon = {
        url: "https://storage.googleapis.com/summer_of_jake_map_pictures/dog_test.jpg",
        scaledSize: new window.google.maps.Size(20, 20)
    };
    return (<div>
        <h1>Summer of Jake Adventure Map</h1>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center} options={mapOptions}>

            <KmlLayer url="https://storage.googleapis.com/strava-kmls/2021_spring_road_trip_10.kmz" options={kmlOptions}/>
            <KmlLayer url="https://storage.googleapis.com/strava-kmls/2021_fall_road_trip_4.kmz" options={kmlOptions}/>
            <KmlLayer url="https://storage.googleapis.com/strava-kmls/PCT_pt_1.kmz" options={kmlOptions}/>
            <KmlLayer url="https://storage.googleapis.com/strava-kmls/PCT_pt_2.kmz" options={kmlOptions}/>
            <KmlLayer url="https://storage.googleapis.com/strava-kmls/Tahoe_Rim_Trail_1.kmz" options={kmlOptions}/>
            <KmlLayer url="https://storage.googleapis.com/strava-kmls/2019_road_trip_1.kmz" options={kmlOptions}/>
            <Marker position={testPicLatLong} icon={testIcon}/>
        </GoogleMap>
        </div>);
}
