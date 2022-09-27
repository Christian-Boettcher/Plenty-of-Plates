package com.techelevator.dao;

import com.techelevator.model.Restaurant;
import com.techelevator.model.RestaurantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, RestaurantId> {

 List<Restaurant> findByRestaurantIdEventId(Long eventId);

 Restaurant findByRestaurantIdEventIdAndRestaurantIdRestaurantId(long eventId, String restaurantId);

}
