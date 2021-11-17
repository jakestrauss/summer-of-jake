package com.summerofjake.server.controller;

import com.summerofjake.server.model.Marker;
import com.summerofjake.server.repository.MarkerRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;
import java.text.MessageFormat;
import java.util.ArrayList;
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

    @PostMapping(path = "postMarkers",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> postMarkers(@RequestBody List<Marker> markers) {
        if(markers == null || markers.size() == 0) {
            throw new ServiceException("No markers to post!");
        }

        //write each marker to db if it's not already in database
        List<Marker> postedMarkers = new ArrayList<>();
        for(Marker m : markers) {
            try {
                //only write to db if existing marker isn't there
                if(this.markerRepository.findByUrl(m.getUrl()).isEmpty()) {
                    postedMarkers.add(this.markerRepository.saveAndFlush(m));
                } else {
                    System.out.println("Marker with photo url " + m.getUrl() + " not written to db because it's already present");
                }
            } catch (Exception e) {
                System.out.println("Marker with photo url " + m.getUrl() + " not written to db because of exception:");
                System.out.println(e.getLocalizedMessage());
            }
        }

        if(postedMarkers.size() == markers.size()) {
            return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
        } else {
            System.out.println("Not all markers posted to database. "
                            + postedMarkers.size() + " markers posted when "
                            +  markers.size() + " were available to post");
        }

        if (postedMarkers.size() > 0) {
            return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Boolean.FALSE, HttpStatus.OK);
        }
    }
}
