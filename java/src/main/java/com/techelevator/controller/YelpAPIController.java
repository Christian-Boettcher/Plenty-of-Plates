package com.techelevator.controller;

import com.techelevator.business.YelpAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
public class YelpAPIController {

    @Autowired
    private final YelpAPIService yelpAPIService;

    public YelpAPIController(YelpAPIService yelpAPIService) {
        this.yelpAPIService = yelpAPIService;
    }

    @GetMapping("/search/location/{location}")
    public String searchRestaurantsByLocation(@PathVariable String location) {
        return yelpAPIService.searchRestaurantsByLocation(location);
    }

    @GetMapping("/search/restaurant/{restaurantId}")
    public String getRestaurantById(@PathVariable String restaurantId) {
        return yelpAPIService.getRestaurantById(restaurantId);
    }


}
