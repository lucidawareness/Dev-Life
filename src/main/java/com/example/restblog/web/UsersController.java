package com.example.restblog.web;

import com.example.restblog.data.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.example.restblog.data.User.Role.USER;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {
        Date date = new Date();

    @GetMapping
    private List<User> getAll() {
        ArrayList<User> users = new ArrayList<>();
        users.add(new User(1, "username1", "email@1.com", "password", date, USER));
        return users;
    }

    @GetMapping("{id}")
    private User getById(@PathVariable Long id) {
        return new User(id, "username"+id, "email@"+id +".com", "password", date, USER);
    }

    @PostMapping
    private void createUser(@RequestBody User user) {
        System.out.println(user);
    }

    @PutMapping("{id}")
    private void updateUser(@PathVariable Long id, @RequestBody User user) {
        System.out.println(id + " updated to " + user);
    }

    @DeleteMapping("{id}")
    private void deleteUser(@PathVariable Long id) {
        System.out.println("Deleted user with id# " + id);
    }

    @GetMapping("/username/{username}")
    private User getByUsername(@PathVariable String username) {
        return new User(1, username, "email@.com", "password", date, USER);
    }

    @GetMapping("/email/{email}")
    private User geyByEmail(@PathVariable String email) {
        return new User(1, "username", email, "password", date, USER);
    }

    @GetMapping("{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @RequestParam String newPassword) {
        User user1 = new User(1, "username", "email", "password", date, USER);
        if (oldPassword.equalsIgnoreCase(user1.getPassword())) {
            System.out.println("Password changed");
            user1.setPassword(newPassword);
            System.out.println(user1.getPassword() + " is your new password");
            System.out.println(user1);
        } else {
            System.out.println("Wrong Password");
        }
    }

}
