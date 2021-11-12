package com.summerofjake.job;

import com.summerofjake.job.activities.GetRoutesActivity;
import com.summerofjake.job.activities.GetRoutesActivityImpl;

public class JobRunner {
    public static void main(String[] args) {
        GetRoutesActivity getRoutesActivity = new GetRoutesActivityImpl();
        getRoutesActivity.getRoutes();
    }
}
