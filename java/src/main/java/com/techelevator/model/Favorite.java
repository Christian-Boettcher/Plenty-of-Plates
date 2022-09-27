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
@Table(name = "users_restaurants")
public class Favorite {

    @EmbeddedId
    private FavoriteId favoriteId;

    @Column(name="restaurant_name")
    private String restaurantName;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="isfavorite")
    private boolean favorite;

    @JsonIgnore
    @MapsId("userId")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", insertable = false, updatable = false)
    private User user;


    public Favorite(FavoriteId favoriteId, String restaurantName, String imageUrl, boolean favorite) {
        this.favoriteId = favoriteId;
        this.restaurantName = restaurantName;
        this.imageUrl = imageUrl;
        this.favorite = favorite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Favorite)) return false;
        Favorite favorite = (Favorite) o;
        return this.isFavorite() == favorite.isFavorite() && getFavoriteId().equals(favorite.getFavoriteId()) && Objects.equals(getRestaurantName(), favorite.getRestaurantName()) && Objects.equals(getImageUrl(), favorite.getImageUrl());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getFavoriteId(), getRestaurantName(), getImageUrl(), this.isFavorite());
    }

    @Override
    public String toString() {
        return "Favorite{" +
                "favoriteId=" + favoriteId +
                ", restaurantName='" + restaurantName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", favorited=" + favorite +
                '}';
    }
}
