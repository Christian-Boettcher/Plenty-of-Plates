package com.techelevator.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "event_restaurants")
public class Restaurant {

    /* RestaurantID object refers to both event_id and restaurant_id */

    @EmbeddedId
    private RestaurantId restaurantId;

    @Column(name="restaurant_name")
    private String name;

    @Column(name="image_url")
    private String image_url;

    @Column(name = "up_votes")
    private int upVotes;

    @Column(name="down_votes")
    private int downVotes;

    @JsonIgnore
    @MapsId("eventId")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="event_id")
    private Event event;

    public Restaurant(RestaurantId restaurantId, int upVotes, int downVotes) {
        this.restaurantId = restaurantId;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Restaurant that = (Restaurant) o;
        return upVotes == that.upVotes && downVotes == that.downVotes && Objects.equals(restaurantId, that.restaurantId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(restaurantId, upVotes, downVotes);
    }
}
