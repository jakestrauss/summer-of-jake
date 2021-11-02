import axios from 'axios';

const ROUTESURL_REST_API_URL = 'http://localhost:8080/api/routes'

class MarkerService {
    getMarkers() {
        return [
            {
                latLong: {
                    lat: 44.285763,
                    lng: -121.536175
                },
                url: 'https://storage.googleapis.com/summer_of_jake_map_pictures/dog_test.jpg'
            },
            {
                latLong: {
                    lat: 39.329299,
                    lng: -111.542582
                },
                url: 'https://storage.googleapis.com/summer_of_jake_map_pictures/dog_test.jpg'
            }
        ]
    }
}

export default new MarkerService();