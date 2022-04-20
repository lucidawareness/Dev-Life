package com.example.restblog.web;


import com.example.restblog.data.Category;
import com.example.restblog.data.Post;
import com.example.restblog.data.PostsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

    private final PostsRepository postRepository;

    private PostsController(PostsRepository postsRepository) {
        this.postRepository = postsRepository;
    }



    @GetMapping
    private List<Post> getAll() {
        return postRepository.findAll();
    }

    @GetMapping("{id}")
    private Post getById(@PathVariable Long id) {
        return postRepository.findById(id).get();
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost) {
        Post postToAdd = new Post(newPost.getTitle(), newPost.getContent(), newPost.getCreatedAt());
        postRepository.save(postToAdd);
        System.out.println("Post created");
    }

    @PutMapping("{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post) {
        Post originalPost = postRepository.findById(id).get();
        originalPost.setTitle(post.getTitle());
        originalPost.setContent(post.getContent());

        postRepository.save(originalPost);

    }

    @DeleteMapping("{id}")
    private void deletePost(@PathVariable Long id) {
        postRepository.delete(postRepository.getById(id));
    }
}