package com.summerofjake.server.controller;

import com.summerofjake.server.model.Route;
import com.summerofjake.server.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/")
public class RouteController {

    @Autowired
    private RouteRepository routeRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("routes")
    public List<Route> getRoutes() {
        return this.routeRepository.findAll();
    }
}
