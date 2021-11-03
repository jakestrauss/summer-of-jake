package com.summerofjake.server.controller;

import com.summerofjake.server.model.Marker;
import com.summerofjake.server.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/")
public class MarkerController {

    @Autowired
    private MarkerRepository markerRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("markers")
    public List<Marker> getMarkers() {
        return this.markerRepository.findAll();
    }
}
