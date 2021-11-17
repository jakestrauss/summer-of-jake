package com.summerofjake.job;

import com.summerofjake.job.activities.GetActivityIdsActivity;
import com.summerofjake.job.activities.MarkersActivity;
import com.summerofjake.job.activities.MarkersActivityImpl;
import com.summerofjake.job.strava.api.ActivityApi;

import java.util.List;

public class JobRunner {
    public static void main(String[] args) {
        ActivityApi activityApi = new ActivityApi();
        GetActivityIdsActivity getActivityIdsActivity = new GetActivityIdsActivity(activityApi);
        List<Long> activityIds = getActivityIdsActivity.getActivityIds();

        MarkersActivity markersActivity = new MarkersActivityImpl(activityApi);
        markersActivity.getMarkers(activityIds);
    }
}