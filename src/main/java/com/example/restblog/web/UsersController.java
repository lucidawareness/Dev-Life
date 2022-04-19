package com.example.restblog.web;

import com.example.restblog.data.Category;
import com.example.restblog.data.Post;
import com.example.restblog.data.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.*;

import static com.example.restblog.data.User.Role.USER;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {


//    Start of test data
    static Date date = new Date();
    static Collection<Post> posts = null;
    static ArrayList<User> users = new ArrayList<>();
    static ArrayList<Category> categories = new ArrayList<>();


    Post post1 = new Post(1L, "First post", "Hello this is my first post!", date, new User(), categories);
    Post post2 = new Post(2L, "Second post", "Hello this is my second post!", date, new User(), categories);
    Post post3 = new Post(3L, "Third post", "Hello this is my third post!", date, new User(), categories);
    User user1 = new User(1, "username1", "email@1.com", "password", date, USER, posts);

// End of test data
    @GetMapping
    private List<User> getAll() {
        return users;
    }

    @GetMapping("{id}")
    private User getById(@PathVariable Long id) {
        return new User(id, "username" + id, "email@" + id + ".com", "password", date, USER, Arrays.asList(post1, post2, post3));
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

    @GetMapping("/username")
    private User getByUsername(@RequestParam String username) {
        return new User(1, username, "email@.com", "password", date, USER, posts);
    }

    @GetMapping("/email")
    private User geyByEmail(@RequestParam String email) {
        return new User(1, "username", email, "password", date, USER, posts);
    }

    @GetMapping("{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword) {
        User user1 = new User(id, "username", "email", "password", date, USER, posts);
        if (oldPassword.equals(user1.getPassword())) {
            System.out.println("Password changed");
            user1.setPassword(newPassword);
            System.out.println(user1.getPassword() + " is your new password");
            System.out.println(user1);
        } else {
            System.out.println("Wrong Password");
        }
    }

//    todo: add updateEmail
//    todo: add updateUsername

}
