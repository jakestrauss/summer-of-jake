package com.summerofjake.job.controllers;

import com.summerofjake.job.strava.api.ActivityApi;

import java.util.List;

public class MarkersController {
    private ActivityApi activityApi;
    public MarkersController(ActivityApi activityApi) {
        this.activityApi = activityApi;
    }

    public void getMarkers(List<Long> activityIds) {
        activityApi.getMarkersForActivity(activityIds.get(0).toString());
    }
}
