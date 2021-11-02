import axios from 'axios';

const ROUTESURL_REST_API_URL = 'http://localhost:8080/api/routes'

class RouteURLService {
    getRoutes() {
        // axios.get(ROUTESURL_REST_API_URL);
        return ['https://storage.googleapis.com/strava-kmls/2021_spring_road_trip_10.kmz', 'https://storage.googleapis.com/strava-kmls/PCT_pt_1.kmz', 'https://storage.googleapis.com/strava-kmls/PCT_pt_2.kmz'];
    }
}

export default new RouteURLService();