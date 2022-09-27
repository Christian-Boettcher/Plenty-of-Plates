package com.techelevator.model;

public class EventDTO {

    private long userId;
    // private String[] restaurantIds;
    private RestaurantDTO[] restaurantDTOs;
    private GuestDTO[] guestDTOs;
    private String title;
    private String date;
    private String deadline;
    private String time;

    //<editor-fold desc="Constructors Getters Setters">
    public EventDTO() {}

//    public EventDTO(long userId, String[] restaurantIds, GuestDTO[] guestDTOs, String title, String date, String deadline, String time) {
//        this.userId = userId;
//        this.restaurantIds = restaurantIds;
//        this.guestDTOs = guestDTOs;
//        this.title = title;
//        this.date = date;
//        this.deadline = deadline;
//        this.time = time;
//    }


    public EventDTO(long userId, RestaurantDTO[] restaurantDTOs, GuestDTO[] guestDTOs, String title, String date, String deadline, String time) {
        this.userId = userId;
        this.restaurantDTOs = restaurantDTOs;
        this.guestDTOs = guestDTOs;
        this.title = title;
        this.date = date;
        this.deadline = deadline;
        this.time = time;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

//    public String[] getRestaurantIds() {
//        return restaurantIds;
//    }
//
//    public void setRestaurantIds(String[] restaurantIds) {
//        this.restaurantIds = restaurantIds;
//    }


    public RestaurantDTO[] getRestaurantDTOs() {
        return restaurantDTOs;
    }

    public void setRestaurantDTOs(RestaurantDTO[] restaurantDTOs) {
        this.restaurantDTOs = restaurantDTOs;
    }

    public GuestDTO[] getGuestDTOs() {
        return guestDTOs;
    }

    public void setGuestDTOs(GuestDTO[] guestDTOs) {
        this.guestDTOs = guestDTOs;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
    //</editor-fold>


}
