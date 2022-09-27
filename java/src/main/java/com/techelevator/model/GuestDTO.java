package com.techelevator.model;


public class GuestDTO {


    private long guest_id;

    private String guest_name;


    //<editor-fold desc="Constructors, Getters, Setters">
    public GuestDTO() {}

    public GuestDTO(String guest_name, long guest_id) {
        this.guest_name = guest_name;
        this.guest_id = guest_id;
    }

    public String getGuest_name() {
        return guest_name;
    }

    public void setGuest_name(String guest_name) {
        this.guest_name = guest_name;
    }

    public long getGuest_id() {
        return guest_id;
    }

    public void setGuest_id(long guest_id) {
        this.guest_id = guest_id;
    }

    //</editor-fold>

}
