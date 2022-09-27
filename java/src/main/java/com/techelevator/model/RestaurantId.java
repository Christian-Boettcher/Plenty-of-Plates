package com.techelevator.model;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RestaurantId implements Serializable {

    /* RestaurantId class acts like a composite key
    * because events_restaurants has no primary key
    * and behaves as a join table */

    @Column(name="event_id")
    private Long eventId;

    @Column(name="restaurant_id")
    private String restaurantId;

    public RestaurantId() {}

    public RestaurantId(Long eventId, String restaurantId) {
        this.eventId = eventId;
        this.restaurantId = restaurantId;
    }

    //<editor-fold desc="Getters and Setters">
    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }
    //</editor-fold>

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RestaurantId that = (RestaurantId) o;
        return eventId.equals(that.eventId) && restaurantId.equals(that.restaurantId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventId, restaurantId);
    }

    @Override
    public String toString() {
        return "RestaurantId{" +
                "eventId=" + eventId +
                ", restaurantId='" + restaurantId + '\'' +
                '}';
    }

}
