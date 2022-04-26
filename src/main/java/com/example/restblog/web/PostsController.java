package com.example.restblog.web;


import com.example.restblog.data.*;
import com.example.restblog.services.EmailService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
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
    private final EmailService emailService;

    private PostsController(PostsRepository postsRepository, UsersRepository usersRepository, CategoriesRepository categoriesRepository, EmailService emailService) {
        this.postRepository = postsRepository;
        this.userRepository = usersRepository;
        this.categoryRepository = categoriesRepository;
        this.emailService = emailService;
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
    private void createPost(@RequestBody Post newPost, OAuth2Authentication auth) {
        if (auth != null) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email);
            newPost.setAuthor(user);
            List<Category> categories = new ArrayList<>();
            Category jsCat = categoryRepository.findCategoryByName("JS");
            Category javaCat = categoryRepository.findCategoryByName("Java");
            categories.add(jsCat);
            categories.add(javaCat);
            newPost.setCategories(categories);
            postRepository.save(newPost);
            emailService.prepareAndSend(newPost, "New Post!", "");
            System.out.println("Post created");
        }
    }

    @PutMapping("{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post, OAuth2Authentication auth) {
        Post originalPost = postRepository.getById(id);
        if (auth != null) {
            User loggedInUser = userRepository.findByEmail(auth.getName());
            System.out.println(loggedInUser.getRole());

            if (originalPost.getAuthor() == loggedInUser || loggedInUser.getRole().equals(User.Role.ADMIN)) {
                originalPost.setTitle(post.getTitle());
                originalPost.setContent(post.getContent());
                postRepository.save(originalPost);
            } else {
                System.out.println("Unauthorized");
            }
        }
    }

    @DeleteMapping("{id}")
    private void deletePost(@PathVariable Long id, OAuth2Authentication auth) {
        if (auth != null) {
            Post post = postRepository.getById(id);
            User loggedInUser = userRepository.findByEmail(auth.getName());
            if (post.getAuthor() == loggedInUser || loggedInUser.getRole().equals(User.Role.ADMIN)) {
                postRepository.delete(postRepository.getById(id));
            } else {
                System.out.println("Unauthorized");
            }
        }

    }
}