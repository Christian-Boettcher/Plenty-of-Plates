package com.techelevator.model;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FavoriteId implements Serializable {

    @Column(name = "user_id")
    private long userId;

    @Column(name = "restaurant_id")
    private String restaurantId;

    //<editor-fold desc="Constructors Getter & Setters">
    public FavoriteId() {}

    public FavoriteId(long userId, String restaurantId) {
        this.userId = userId;
        this.restaurantId = restaurantId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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
        if (!(o instanceof FavoriteId)) return false;
        FavoriteId that = (FavoriteId) o;
        return getUserId() == that.getUserId() && getRestaurantId().equals(that.getRestaurantId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getRestaurantId());
    }

}
