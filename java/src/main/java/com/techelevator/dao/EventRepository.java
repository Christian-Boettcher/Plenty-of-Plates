package com.techelevator.dao;

import com.techelevator.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Event findById(long eventId);

    List<Event> findAllByUserId(long userId);



}
