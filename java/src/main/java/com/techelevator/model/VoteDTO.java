package com.techelevator.model;

public class VoteDTO {

    private long eventId;

    private long guestId;

    private RestaurantDTO[] restaurantDTOs;

    public VoteDTO() {}

    public VoteDTO(long eventId, long guestId, RestaurantDTO[] restaurantDTOs) {
        this.eventId = eventId;
        this.guestId = guestId;
        this.restaurantDTOs = restaurantDTOs;
    }

    public long getEventId() {
        return eventId;
    }

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }

    public long getGuestId() {
        return guestId;
    }

    public void setGuestId(long guestId) {
        this.guestId = guestId;
    }

    public RestaurantDTO[] getRestaurantDTOs() {
        return restaurantDTOs;
    }

    public void setRestaurantDTOs(RestaurantDTO[] restaurantDTOs) {
        this.restaurantDTOs = restaurantDTOs;
    }
}
