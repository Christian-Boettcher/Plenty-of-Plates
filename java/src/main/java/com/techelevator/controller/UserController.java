package com.techelevator.controller;

import com.techelevator.business.FavoriteService;
import com.techelevator.business.UserService;
import com.techelevator.model.Favorite;
import com.techelevator.model.RestaurantDTO;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FavoriteService favoriteService;

    @GetMapping("/user/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.findUserByEmail(email);
    }

    @GetMapping("/user/id/{userId}")
    public User getUserByUserId(@PathVariable long userId) {
        return userService.findUserByUserId(userId);
    }


    @PostMapping("/user/id/{userId}/favorite")
    public Favorite saveFavorite(@PathVariable long userId, @RequestBody RestaurantDTO restaurantDTO) {
        User user = userService.findUserByUserId(userId);
        return favoriteService.saveFavorite(user, restaurantDTO);
    }

    @GetMapping("/user/id/{userId}/favorite")
    public List<Favorite> getFavoritesByUserId(@PathVariable long userId) {

        return favoriteService.getFavoritesByUserId(userId);
    }


}
