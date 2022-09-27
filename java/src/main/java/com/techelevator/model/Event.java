package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="event")
public class Event {

    @Id
    @Column(name="event_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @Column(name="user_id")
    private Long userId;

    @Column(name="title")
    private String title;

    @Column(name="date")
    private LocalDate date;

    @Column(name="time")
    private Timestamp time;

    @Column(name="deadline")
    private LocalDate deadline;

    public Event(Long eventId, Long userId, String title, LocalDate date, Timestamp time, LocalDate deadline) {
        this.eventId = eventId;
        this.userId = userId;
        this.title = title;
        this.date = date;
        this.time = time;
        this.deadline = deadline;
    }


    /* EVENT = CHILD, USER = PARENT */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", insertable = false, updatable = false)
    private User user;

    /* EVENT = PARENT, GUEST = CHILD */
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Guest> guestList;

    /* EVENT = PARENT, RESTAURANT = CHILD */
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Restaurant> restaurantList;
}
