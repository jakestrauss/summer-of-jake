package com.summerofjake.job.strava.api;

import com.google.common.collect.ImmutableList;
import com.summerofjake.server.model.Marker;
import okhttp3.Call;
import okhttp3.HttpUrl;
import okhttp3.Request;
import okhttp3.ResponseBody;
import org.apache.tomcat.util.json.JSONParser;


import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class ActivityApi extends StravaApi {

    public ActivityApi() {
        super();
    }

    public List<Long> getLoggedInAthleteActivities() {

        HttpUrl.Builder urlBuilder
                = HttpUrl.parse(STRAVA_BASE_URL + "athlete/activities").newBuilder();
        urlBuilder.addQueryParameter("access_token", accessToken);
        String url = urlBuilder.build().toString();

        Request request = new Request.Builder().url(url).build();

        Call call = client.newCall(request);
        ResponseBody responseBody = execute(call);

        List<Long> activityIds = new ArrayList<>();

        try {
            JSONParser parser = new JSONParser(responseBody.string());
            ArrayList jsonArray = (ArrayList) parser.parse();

            for(Object jsonObject : jsonArray) {
                activityIds.add(((BigInteger)((LinkedHashMap)jsonObject).get("id")).longValue());
            }

        } catch (Exception e) {
            System.out.println("To string exception: " + e.getMessage());
        }
        return activityIds;
    }

    public List<Marker> getMarkersForActivity(String activityId) {
        HttpUrl.Builder urlBuilder
                = HttpUrl.parse(STRAVA_BASE_URL + "activities/" + activityId).newBuilder();
        urlBuilder.addQueryParameter("access_token", accessToken);
        String url = urlBuilder.build().toString();

        Request request = new Request.Builder().url(url).build();

        Call call = client.newCall(request);
        ResponseBody responseBody = execute(call);

        String photoUrl = null;
        ArrayList<BigDecimal> latLng = new ArrayList<>();

        try {
            JSONParser parser = new JSONParser(responseBody.string());
            LinkedHashMap requestMap = (LinkedHashMap) parser.parse();
            LinkedHashMap photosMap = (LinkedHashMap) requestMap.get("photos");

            if(photosMap != null && !photosMap.isEmpty() && photosMap.get("primary") != null) {
                photoUrl = (String)((LinkedHashMap)((LinkedHashMap)photosMap.get("primary")).get("urls")).get("600");
            } else {
                //no photo for this activity, return null
                return null;
            }

            //Currently no geo-location data of photo accessible from Strava API, so must use start lat/lng
            latLng = (ArrayList)requestMap.get("start_latlng");
        } catch (Exception e) {
            System.out.println("Parsing exception: " + e.getMessage());
        }

        //Currently only one photo marker per route, as this is all Strava's API currently provides
        return ImmutableList.of(new Marker(photoUrl, latLng.get(0).doubleValue(), latLng.get(1).doubleValue()));
    }
}
