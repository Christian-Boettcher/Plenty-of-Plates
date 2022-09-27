package com.techelevator.dao;

import com.techelevator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /* replaces UserDao */

    List<User> findAll();

    User findById(long id);

    User findByUsername(String username);

    int findIdByUsername(String username);

    User findByEmail(String email);


    // boolean create(String username, String email, String password, String role);
}
