package com.example.restblog.web;


import com.example.restblog.data.Post;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

    @GetMapping
    private List<Post> getAll() {
        ArrayList<Post> posts = new ArrayList<>();
        posts.add(new Post(1L, "Post 1", "gdfgdfdfgfdsg"));
        posts.add(new Post(2L, "Post 2", "dfgrtdggtdf"));
        posts.add(new Post(3L, "Post 3", "ewreeefsfrewwe"));
        return posts;
    }

    @GetMapping("{id}")
    private Post getById(@PathVariable Long id) {
        return new Post(id, "Post#: " + id, "Content");
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost){
        System.out.println(newPost);
    }

    @PutMapping("{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post) {
        System.out.println(id + "updated to " +post);
    }

    @DeleteMapping("{id}")
    private void deletePost(@PathVariable Long id) {
        System.out.println("Deleted post with id# " + id);
    }
}