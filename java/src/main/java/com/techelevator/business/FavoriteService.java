package com.techelevator.business;


import com.techelevator.dao.FavoriteRepository;
import com.techelevator.model.Favorite;
import com.techelevator.model.FavoriteId;
import com.techelevator.model.RestaurantDTO;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoritesByUserId(long userId) {
        return favoriteRepository.findByFavoriteIdUserId(userId);
    }

    public Favorite getByFavoriteId(long userId, String restaurantId) {
        return favoriteRepository.findByFavoriteIdUserIdAndFavoriteIdRestaurantId(userId, restaurantId);
    }

    /** used to remember which restaurants users have added to or removed from their favorites
     * saving the most pertinent info - ID, name, and picture to our own database allows
     * fast and easy recall */

    public Favorite saveFavorite(User user, RestaurantDTO restaurantDTO) {

        Favorite favorite = favoriteRepository.findByFavoriteIdUserIdAndFavoriteIdRestaurantId(user.getId(), restaurantDTO.getRestaurantId());

        if (favorite == null) {
            favorite = new Favorite();
            favorite.setUser(user);
            favorite.setFavoriteId(new FavoriteId(user.getId(), restaurantDTO.getRestaurantId()));
            favorite.setRestaurantName(restaurantDTO.getRestaurantName());
            favorite.setImageUrl(restaurantDTO.getRestaurantImage());
            favorite.setFavorite(restaurantDTO.isFavorite());
        } else {
            favorite.setFavorite(restaurantDTO.isFavorite());
        }

        return favoriteRepository.save(favorite);
    }

}
