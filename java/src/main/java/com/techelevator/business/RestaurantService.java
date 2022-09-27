package com.techelevator.business;

import com.techelevator.dao.RestaurantRepository;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;

    private final int INITIAL_VOTES = 0;

    /** remembers which restaurants were selected for an event by storing their
     * ID, name, and picture, and keeps track of how many votes they have received */

    public List<Restaurant> saveRestaurantsToEvent(Event savedEvent, EventDTO eventDTO) {
        List<Restaurant> savedRestaurants = new ArrayList<>();


        for(RestaurantDTO restaurantDTO : eventDTO.getRestaurantDTOs()) {
            Restaurant restaurant = new Restaurant();
            restaurant.setEvent(savedEvent);
            restaurant.setRestaurantId(new RestaurantId(savedEvent.getEventId(), restaurantDTO.getRestaurantId()));
            restaurant.setName(restaurantDTO.getRestaurantName());
            restaurant.setImage_url(restaurantDTO.getRestaurantImage());
            restaurant.setUpVotes(INITIAL_VOTES);
            restaurant.setDownVotes(INITIAL_VOTES);
            savedRestaurants.add(restaurant);
        }

        restaurantRepository.saveAll(savedRestaurants);
        return savedRestaurants;
    }

    public List<Restaurant> findAllRestaurantsByEventId(long eventId) {
        return restaurantRepository.findByRestaurantIdEventId(eventId);
    }

    public Restaurant findByRestaurantId(long eventId, String restaurantId) {
        return restaurantRepository.findByRestaurantIdEventIdAndRestaurantIdRestaurantId(eventId, restaurantId);
    }

    public void updateRestaurantVotes(List<Restaurant> restaurants) {
        restaurantRepository.saveAll(restaurants);
    }
}
