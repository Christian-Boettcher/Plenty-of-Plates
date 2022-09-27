package com.techelevator.controller;

import com.techelevator.business.EventService;
import com.techelevator.business.GuestService;
import com.techelevator.business.RestaurantService;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
public class EventController {

    @Autowired
    EventService eventService;

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    GuestService guestService;


    @GetMapping("/event/user/{userId}")
    public List<Event> getAllEventsByUserId(@PathVariable long userId) {
        return eventService.findAllEventsByUserId(userId);
    }


    @GetMapping("/event/{eventId}")
    public Event getEventByEventId(@PathVariable long eventId) {
        return eventService.findByEventId(eventId);
    }

    /** because our data tables are mapped together, we can save our list of restaurants
     * and guest list directly to each event, and send back that information as one object */

    @PostMapping("/event")
    public Event createEvent(@RequestBody EventDTO eventDTO) {

        Event savedEvent = eventService.createNewEvent(eventDTO);

        List<Restaurant> savedRestaurants = restaurantService.saveRestaurantsToEvent(savedEvent, eventDTO);

        List<Guest> savedGuests = guestService.saveGuestsToEvent(savedEvent, eventDTO);


        savedEvent.setRestaurantList(savedRestaurants);
        savedEvent.setGuestList(savedGuests);

        return savedEvent;
    }


    @GetMapping("/event/{eventId}/guests")
    public List<Guest> getGuestsByEventId(@PathVariable long eventId) {
        return guestService.findAllGuestsByEventId(eventId);
    }


    @GetMapping("/event/{eventId}/restaurants")
    public List<Restaurant> getRestaurantsByEventId(@PathVariable long eventId) {
        return restaurantService.findAllRestaurantsByEventId(eventId);
    }



    @GetMapping("/event/{eventId}/guests/{guestId}")
    public Guest getGuestByGuestId(@PathVariable long eventId, @PathVariable long guestId) {
        return guestService.findByGuestId(eventId, guestId);
    }


    @PostMapping("/vote")
    public void saveGuestVote(@RequestBody VoteDTO voteDTO) {
        Guest guest = guestService.findByGuestId(voteDTO.getEventId(), voteDTO.getGuestId());
        guest.setVoted(true);

        List<Restaurant> votedRestaurants = new ArrayList<>();

        for(RestaurantDTO restaurantDTO : voteDTO.getRestaurantDTOs()) {
            Restaurant restaurant = restaurantService.findByRestaurantId(voteDTO.getEventId(), restaurantDTO.getRestaurantId());
            if(restaurantDTO.isUpVoted()){
                restaurant.setUpVotes(restaurant.getUpVotes() + 1);
            } else if (restaurantDTO.isDownVoted()) {
                restaurant.setDownVotes(restaurant.getDownVotes() + 1);
            }
            votedRestaurants.add(restaurant);
        }

        guestService.updateGuest(guest);
        restaurantService.updateRestaurantVotes(votedRestaurants);

    }


}
