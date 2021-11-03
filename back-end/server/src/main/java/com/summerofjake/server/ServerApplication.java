package com.summerofjake.server;

import com.summerofjake.server.model.Marker;
import com.summerofjake.server.model.Route;
import com.summerofjake.server.repository.MarkerRepository;
import com.summerofjake.server.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
