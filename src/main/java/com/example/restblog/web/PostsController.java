package com.example.restblog.web;


import com.example.restblog.data.Category;
import com.example.restblog.data.Post;
import com.example.restblog.data.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.example.restblog.data.User.Role.USER;
import static com.example.restblog.web.UsersController.posts;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

//    Start of test data
    static Date date = new Date();
    User user1 = new User(1, "username1", "email@1.com", "password", date, USER, posts);

    public static void main(String[] args) {

    }
// End of test data

    @GetMapping
    private List<Post> getAll() {
        ArrayList<Category> categories = new ArrayList<>();
        Category cat1 = new Category(1L, "JS", posts);
        Category cat2 = new Category(2L, "Java", posts);
        categories.add(cat1);
        categories.add(cat2);
        ArrayList<Post> posts = new ArrayList<>();
        posts.add(new Post(1L, "Post 1", "gdfgdfdfgfdsg", date, user1, categories));
        posts.add(new Post(2L, "Post 2", "dfgrtdggtdf", date, user1, categories));
        posts.add(new Post(3L, "Post 3", "ewreeefsfrewwe", date, user1, categories));
        return posts;
    }

    @GetMapping("{id}")
    private Post getById(@PathVariable Long id) {
        ArrayList<Category> categories = new ArrayList<>();
        return new Post(id, "Post#: " + id, "Content", date, user1, categories);
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost) {
        System.out.println(newPost);
    }

    @PutMapping("{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post) {
        System.out.println(id + "updated to " + post);
    }

    @DeleteMapping("{id}")
    private void deletePost(@PathVariable Long id) {
        System.out.println("Deleted post with id# " + id);
    }
}