package com.summerofjake.job.strava.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.summerofjake.job.strava.api.exception.StravaAPIException;
import com.summerofjake.job.strava.api.exception.StravaUnauthorizedException;
import okhttp3.*;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.LinkedHashMap;

public abstract class StravaApi {
    private static final int UNAUTHORIZED_CODE = 401;
    private static final String CLIENT_ID = "73993";
    private static final String CLIENT_SECRET = "a03e053d23dbf54f9484f941362458f61539f0aa";
    private static final String REFRESH_TOKEN = "e11d7df64aa8e44fa4064b9f4aaeafb61b0b942e";
    protected ObjectMapper objectMapper;
    protected static final String STRAVA_BASE_URL = "https://www.strava.com/api/v3/";
    private static final String STRAVA_OAUTH_URL = "https://www.strava.com/oauth/";
    protected String accessToken;
    protected OkHttpClient client;

    public StravaApi() {
        this.client = new OkHttpClient();
        this.objectMapper = new ObjectMapper();
        this.accessToken = retrieveAccessToken();
    }

    public String retrieveAccessToken() {
        String token = null;

        HttpUrl.Builder urlBuilder
                = HttpUrl.parse(STRAVA_OAUTH_URL + "token").newBuilder();
        String url = urlBuilder.build().toString();

        RequestBody formBody = new FormBody.Builder()
                .add("client_id", CLIENT_ID)
                .add("client_secret", CLIENT_SECRET)
                .add("grant_type", "refresh_token")
                .add("refresh_token", REFRESH_TOKEN)
                .add("f", "json")
                .build();

        Request request = new Request.Builder().url(url).post(formBody).build();

        Call call = client.newCall(request);
        ResponseBody responseBody = execute(call);

        try {
            JSONParser parser = new JSONParser(responseBody.string());
            LinkedHashMap map = (LinkedHashMap) parser.parse();
            token = (String) map.get("access_token");
        } catch (Exception e) {
            System.out.println("ParseException of access token call: " + e.getMessage());
        }

        return token;
    }

    public ResponseBody execute(Call call) throws StravaAPIException, StravaUnauthorizedException {
        Response response;
        try {
            response = call.execute();
        } catch (IOException e) {
            throw new StravaAPIException("A network error happened contacting Strava API", e);
        }

        if(response.isSuccessful()) {
            return response.body();
        } else if(response.code() == UNAUTHORIZED_CODE) {
            throw new StravaUnauthorizedException();
        } else {
            throw new StravaAPIException("Response was not successful, response code: " + response.code());
        }
    }
}
