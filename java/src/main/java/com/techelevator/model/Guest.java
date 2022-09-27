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
@Table(name = "event_guests")
public class Guest {

    /* creating a composite key for the join table
    * because JPA requires IDs for all entities */

    @EmbeddedId
    private GuestId guestId;

    @Column(name="guest_name")
    private String guestName;

    @Column(name="voted")
    private boolean voted;

    @JsonIgnore
    @MapsId("eventId")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="event_id")
    private Event event;

    public Guest(GuestId guestId, String guestName, boolean voted) {
        this.guestId = guestId;
        this.guestName = guestName;
        this.voted = voted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Guest guest = (Guest) o;
        return guestId == guest.guestId && voted == guest.voted ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(guestId, voted);
    }

    @Override
    public String toString() {
        return "Guest {" +
                "guestId=" + guestId +
                ", voted=" + voted +
                '}';
    }
}
