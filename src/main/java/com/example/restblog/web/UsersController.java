package com.example.restblog.web;

import com.example.restblog.data.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UsersRepository userRepository;

    private UsersController(UsersRepository usersRepository) {
        this.userRepository = usersRepository;
    }

    @GetMapping
    private List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    private User getById(@PathVariable Long id) {
        return userRepository.findById(id).get();
    }

    @PostMapping
    private void createUser(@RequestBody User user) {
        user.setRole(User.Role.USER);
        userRepository.save(user);
        System.out.println("User created!");
    }

    @PutMapping("{id}")
    private void updateUser(@PathVariable Long id, @RequestBody User user) {
        User originalUser = userRepository.findById(id).get();
        originalUser.setUsername(user.getUsername());
        originalUser.setEmail(user.getEmail());
        originalUser.setPassword(user.getPassword());

        userRepository.save(originalUser);

    }

    @DeleteMapping("{id}")
    private void deleteUser(@PathVariable Long id) {
        userRepository.delete(userRepository.getById(id));
    }

    @GetMapping("/username")
    private User getByUsername(@RequestParam String username) {
        return userRepository.findByUsername(username);
    }

    @GetMapping("/email")
    private User geyByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email);
    }

    @GetMapping("{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword) {
        User originalUser = userRepository.findById(id).get();
        if (oldPassword.equals(originalUser.getPassword())) {
            System.out.println("Password changed");
            originalUser.setPassword(newPassword);
            System.out.println(originalUser.getPassword() + " is your new password");
            System.out.println(originalUser);
            userRepository.save(originalUser);
        } else {
            System.out.println("Wrong Password");
//        }
        }

//    todo: add updateEmail
//    todo: add updateUsername
    }
}
