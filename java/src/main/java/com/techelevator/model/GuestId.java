package com.techelevator.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class GuestId implements Serializable {

    @Column(name="event_id")
    private Long eventId;

    @Column(name="guest_id")
    private Long guestId;

    public GuestId() {}

    public GuestId(Long eventId, Long guestId) {
        this.eventId = eventId;
        this.guestId = guestId;
    }

    //<editor-fold desc="Getters & Setters">
    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Long getGuestId() {
        return guestId;
    }

    public void setGuestId(Long guestId) {
        this.guestId = guestId;
    }
    //</editor-fold>

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return true;
        GuestId guestId = (GuestId) o;
        return eventId.equals(guestId.eventId) &&
                this.guestId.equals(guestId.guestId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventId, guestId);
    }

}
