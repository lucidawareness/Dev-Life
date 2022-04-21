package com.example.restblog.web;


import com.example.restblog.data.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

    private final PostsRepository postRepository;
    private final UsersRepository userRepository;
    private final CategoriesRepository categoryRepository;

    private PostsController(PostsRepository postsRepository, UsersRepository usersRepository, CategoriesRepository categoriesRepository) {
        this.postRepository = postsRepository;
        this.userRepository = usersRepository;
        this.categoryRepository = categoriesRepository;
    }



    @GetMapping
    private List<Post> getAll() {
        return postRepository.findAll();
    }

    @GetMapping("{id}")
    private Optional<Post> getById(@PathVariable Long id) {
        return postRepository.findById(id);
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost) {
        newPost.setAuthor(userRepository.getById(2L));
        List<Category> categories = new ArrayList<>();
        Category jsCat = categoryRepository.findCategoryByName("JS");
        Category javaCat = categoryRepository.findCategoryByName("Java");
        categories.add(jsCat);
        categories.add(javaCat);
        newPost.setCategories(categories);
        postRepository.save(newPost);
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