package com.summerofjake.server.model;

import javax.persistence.*;

@Entity
@Table(name = "markers")
public class Marker {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "url", unique = true)
    private String url;

    @Column(name = "lat")
    private double lat;

    @Column(name = "lng")
    private double lng;

    public Marker() {}

    public Marker(String url, double lat, double lng) {
        this.url = url;
        this.lat = lat;
        this.lng = lng;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }
}
