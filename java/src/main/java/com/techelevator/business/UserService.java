package com.techelevator.business;

import com.techelevator.dao.UserRepository;
import com.techelevator.exceptions.EmailAlreadyExistsException;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    /** similar to the initial JDBC set up,
     * users are activated and authorities are set when retrieved from the database*/

    public List<User> findAllUsers() {
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {
            user.setAuthorities(user.getRole());
            user.setActivated(true);
        }
        return allUsers; }

    public User findUserByUserId(long userId) {
        User user = userRepository.findById(userId);
        user.setAuthorities(user.getRole());
        user.setActivated(true);
        return user;
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findByUsername(String username) throws UsernameNotFoundException {
        for (User user : this.findAllUsers()) {
            if( user.getUsername().equalsIgnoreCase(username)) {
                return user;
            }
        }
        throw new UsernameNotFoundException("User " + username + " was not found.");
    }

    /** create method uses JPA's save instead of writing an insert SQL statement
     * to save users in the database table */

    public boolean create(String username, String email, String password, String role) throws EmailAlreadyExistsException {
        boolean userCreated = false;

        User newUser = new User();
        String password_hash = new BCryptPasswordEncoder().encode(password);
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(password_hash);
        newUser.setRole("ROLE_"+role.toUpperCase());

        try {
            userRepository.save(newUser);
            userCreated = true;
        } catch (DataAccessException e) {
            throw new EmailAlreadyExistsException();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return userCreated;
    }

}
