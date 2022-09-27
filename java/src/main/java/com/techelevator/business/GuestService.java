package com.techelevator.business;

import com.techelevator.dao.GuestRepository;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GuestService {

    @Autowired
    GuestRepository guestRepository;


    public List<Guest> findAllGuestsByEventId(long eventId) {
        return guestRepository.findByGuestIdEventId(eventId);
    }

    /** saves guests to the database with a guest ID and the event they've been invited to
     * and keeps track of whether they voted or not */

    public List<Guest> saveGuestsToEvent(Event savedEvent, EventDTO eventDTO) {
        List<Guest> invitedGuests = new ArrayList<>();

        for(GuestDTO guestDTO : eventDTO.getGuestDTOs()) {
            Guest newGuest = new Guest();
            newGuest.setEvent(savedEvent);
            newGuest.setGuestId(new GuestId(savedEvent.getEventId(), guestDTO.getGuest_id()));
            newGuest.setGuestName(guestDTO.getGuest_name());
            newGuest.setVoted(false);
            invitedGuests.add(newGuest);
        }

        guestRepository.saveAll(invitedGuests);
        return invitedGuests;
    }

    public Guest findByGuestId(long eventId, long guestId) {
        return guestRepository.findByGuestIdEventIdAndGuestIdGuestId(eventId, guestId);
    }

    public void updateGuest(Guest guest) {
        guestRepository.save(guest);
    }
}
