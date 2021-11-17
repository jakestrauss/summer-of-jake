package com.summerofjake.job.db.client;

import com.google.gson.Gson;
import com.summerofjake.server.model.Marker;
import okhttp3.*;
import org.apache.tomcat.util.json.JSONParser;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class JpaApi {
    private static final String BASE_JPA_URL = "http://localhost:8080/api/";
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    private OkHttpClient client;
    private Gson gson;

    public JpaApi(){
        this.client = new OkHttpClient.Builder().connectTimeout(100, TimeUnit.SECONDS).build();
        this.gson = new Gson();
    }

    public boolean postMarkers(List<Marker> markerList) throws IOException {
        String markersUrl = BASE_JPA_URL + "postMarkers";

        String markersJsonString = gson.toJson(markerList);
        RequestBody body = RequestBody.create(JSON, markersJsonString);

        Request request = new Request.Builder()
                .url(markersUrl)
                .header("Content-type", String.valueOf(JSON))
                .post(body)
                .build();

        Call call = client.newCall(request);
        ResponseBody responseBody = execute(call);

        try {
            JSONParser parser = new JSONParser(responseBody.string());
            return (boolean)parser.parse();
        } catch (Exception e) {
            System.out.println("Parse Exception of postMarkers response: " + e.getMessage());
        }

        return false;
    }

    public ResponseBody execute(Call call) throws RuntimeException {
        Response response;
        try {
            response = call.execute();
        } catch (IOException e) {
            throw new RuntimeException("A network error happened contacting Jpa Server", e);
        }

        if(response.isSuccessful()) {
            return response.body();
        } else {
            throw new RuntimeException("Response was not successful, response code: " + response.code());
        }
    }
}
