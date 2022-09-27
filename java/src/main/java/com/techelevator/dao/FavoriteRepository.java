package com.techelevator.dao;

import com.techelevator.model.Favorite;
import com.techelevator.model.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

    List<Favorite> findByFavoriteIdUserId(long userId);

    Favorite findByFavoriteIdUserIdAndFavoriteIdRestaurantId(long userId, String restaurantId);

}
