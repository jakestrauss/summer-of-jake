package com.summerofjake.job.strava.api;

import com.summerofjake.server.model.Marker;
import okhttp3.Call;
import okhttp3.HttpUrl;
import okhttp3.Request;
import okhttp3.ResponseBody;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;


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

        try {
            JSONParser parser = new JSONParser(responseBody.string());
            LinkedHashMap requestMap = (LinkedHashMap) parser.parse();
            LinkedHashMap photosMap = (LinkedHashMap) requestMap.get("photos");
            if(photosMap != null && !photosMap.isEmpty()) {
                photoUrl = (String)((LinkedHashMap)((LinkedHashMap)photosMap.get("primary")).get("urls")).get("600");
                System.out.println(photoUrl);
            }
        } catch (Exception e) {
            System.out.println("Parsing exception: " + e.getMessage());
        }

        return null;
    }
}
