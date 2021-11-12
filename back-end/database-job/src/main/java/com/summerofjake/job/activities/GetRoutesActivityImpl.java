package com.summerofjake.job.activities;

import com.summerofjake.job.controllers.GetRoutesController;
import com.summerofjake.job.strava.api.ActivityApi;
import com.summerofjake.server.model.Route;

import java.util.List;

public class GetRoutesActivityImpl implements GetRoutesActivity {

    public GetRoutesActivityImpl() {
    }

    public void getRoutes() {
        ActivityApi activityApi = new ActivityApi();
        GetRoutesController getRoutesController = new GetRoutesController(activityApi);

        List<Route> routes = getRoutesController.getRoutes();
    }
}
