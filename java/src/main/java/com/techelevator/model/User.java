package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

   @Id
   @Column(name="user_id")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name="username")
   private String username;

   @Column(name="email")
   private String email;

   @Column(name="password_hash")
   @JsonIgnore
   private String password;

   @Column(name="role")
   private String role;

   //@JsonIgnore
   @Transient
   private boolean activated;

   @Transient
   private Set<Authority> authorities = new HashSet<>();


   /* USER = PARENT, EVENT = CHILD */
   @OneToMany(mappedBy = "userId")
   private List<Event> eventList;

   /* USER = PARENT, FAV = CHILD */
   @OneToMany(mappedBy = "user")
   private List<Favorite> favorites;

   public User(Long id, String username, String email, String password, List<Favorite> favorites) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.activated = true;
      this.favorites = favorites;
   }

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getUsername() {
      return username;
   }

   public void setUsername(String username) {
      this.username = username;
   }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getPassword() {
      return password;
   }

   public void setPassword(String password) {
      this.password = password;
   }

   public boolean isActivated() {
      return activated;
   }

   public void setActivated(boolean activated) {
      this.activated = activated;
   }

   public String getRole() {
      return role;
   }

   public void setRole(String role) {
      this.role = role;
   }

   public List<Event> getEventList() {
      return eventList;
   }

   public void setEventList(List<Event> eventList) {
      this.eventList = eventList;
   }

   public List<Favorite> getFavorites() {
      return favorites;
   }

   public void setFavorites(List<Favorite> favorites) {
      this.favorites = favorites;
   }

   public Set<Authority> getAuthorities() {
      return authorities;
   }

   public void setAuthorities(String authorities) {
      String[] roles = authorities.split(",");
      for(String role : roles) {
         String authority = role.contains("ROLE_") ? role : "ROLE_" + role;
         this.authorities.add(new Authority(authority));
      }
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      User user = (User) o;
      return id == user.id &&
              activated == user.activated &&
              Objects.equals(username, user.username) &&
              Objects.equals(password, user.password) &&
              Objects.equals(authorities, user.authorities);
   }

   @Override
   public int hashCode() {
      return Objects.hash(id, username, password, activated, authorities);
   }

   @Override
   public String toString() {
      return "User{" +
              "id=" + id +
              ", username='" + username + '\'' +
              ", activated=" + activated +
              ", authorities=" + authorities +
              '}';
   }
}
