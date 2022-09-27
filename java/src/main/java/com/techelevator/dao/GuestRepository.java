package com.techelevator.dao;

import com.techelevator.model.Guest;
import com.techelevator.model.GuestId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<Guest, GuestId> {

    List<Guest> findByGuestIdEventId(Long eventId);

    Guest findByGuestIdEventIdAndGuestIdGuestId(long eventId, long guestId);

}
