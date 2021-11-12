package com.summerofjake.job.controllers;

import com.summerofjake.job.strava.api.ActivityApi;
import com.summerofjake.server.model.Route;

import java.util.Arrays;
import java.util.List;

public class GetRoutesController {
    private ActivityApi activityApi;

    public GetRoutesController(ActivityApi activityApi) {
        this.activityApi = activityApi;
    }

    public List<Route> getRoutes() {
        try {
            List<Long> activityIds = activityApi.getLoggedInAthleteActivities();
            System.out.println(Arrays.toString(activityIds.toArray()));
        } catch(Exception e) {
            System.out.println("Get Activities call failed " + e.toString());
        }

        return null;
    }
}
