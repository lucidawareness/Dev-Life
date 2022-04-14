package com.example.restblog.web;

import com.example.restblog.data.Post;
import com.example.restblog.data.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.example.restblog.data.User.Role.USER;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UserController {
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

}
