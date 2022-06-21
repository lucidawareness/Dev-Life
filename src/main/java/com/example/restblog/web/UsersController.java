package com.example.restblog.web;

import com.example.restblog.data.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.servlet.headers.HeadersSecurityMarker;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UsersRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private UsersController(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    private List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    private User getById(@PathVariable Long id) {
        return userRepository.findById(id).get();
    }

    @GetMapping("/userdata")
    private User getByAuth(OAuth2Authentication auth) {
        return userRepository.findByEmail(auth.getName());
    }

    @GetMapping("/admin")
    private List<User> getUsersAdmin() {
        return userRepository.findAll();
    }

    @PostMapping("/create")
    private void createUser(@RequestBody User user) {
        user.setRole(User.Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @PostMapping("/changeRole/{id}/{role}")
    private ResponseEntity<String> changeRole(@PathVariable Long id, @PathVariable String role, OAuth2Authentication auth) {
        User user = userRepository.getById(id);
        User requestingUser = userRepository.findByEmail(auth.getName());
        if (requestingUser.getRole() != User.Role.ADMIN || requestingUser.getRole() == User.Role.USER) {
            return new ResponseEntity<>("NOT ALLOWED MUST BE ADMIN", HttpStatus.UNAUTHORIZED);
        }

        if (role.equalsIgnoreCase("USER")) {
            user.setRole(User.Role.USER);
        }
        if (role.equalsIgnoreCase("ADMIN")) {
            user.setRole(User.Role.ADMIN);
        }
        userRepository.save(user);
        return new ResponseEntity<>("USER ROLE NOW" + user.getRole(), HttpStatus.OK);
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

    @GetMapping("/updatePassword")
    private void updatePassword(@RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword, OAuth2Authentication auth) {
        User originalUser = userRepository.findByEmail(auth.getName());
        if (passwordEncoder.matches(oldPassword, originalUser.getPassword())) {
            originalUser.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(originalUser);
        } else {
            System.out.println("Wrong Password");
        }

//    todo: add updateEmail
//    todo: add updateUsername
    }
}
