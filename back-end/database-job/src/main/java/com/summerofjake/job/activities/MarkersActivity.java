package com.summerofjake.job.activities;

import java.util.List;

/**
 * Activity to get and populate all photo markers in database
 */
public interface MarkersActivity {
    public void getMarkers(List<Long> activityIds);
}
