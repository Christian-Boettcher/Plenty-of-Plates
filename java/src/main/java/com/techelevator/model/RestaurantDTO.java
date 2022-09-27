package com.techelevator.model;


public class RestaurantDTO {

    private String restaurantId;

    private String restaurantName;

    private String restaurantImage;

    private boolean upVoted;

    private boolean downVoted;

    private boolean favorite;

    //<editor-fold desc="Constructors, Getters, Setters">
    public RestaurantDTO() {}

    public RestaurantDTO(String restaurantId, String restaurantName, String restaurantImage, boolean upVoted, boolean downVoted, boolean favorite) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantImage = restaurantImage;
        this.upVoted = upVoted;
        this.downVoted = downVoted;
        this.favorite = favorite;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getRestaurantImage() {
        return restaurantImage;
    }

    public void setRestaurantImage(String restaurantImage) {
        this.restaurantImage = restaurantImage;
    }

    public boolean isUpVoted() {
        return upVoted;
    }

    public void setUpVoted(boolean upVoted) {
        this.upVoted = upVoted;
    }

    public boolean isDownVoted() {
        return downVoted;
    }

    public void setDownVoted(boolean downVoted) {
        this.downVoted = downVoted;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    //</editor-fold>

    @Override
    public String toString() {
        return "RestaurantDTO{" +
                "restaurantId='" + restaurantId + '\'' +
                ", restaurantName='" + restaurantName + '\'' +
                ", restaurantImage='" + restaurantImage + '\'' +
                ", upVoted=" + upVoted +
                ", downVoted=" + downVoted +
                ", favorite=" + favorite +
                '}';
    }
}
