package com.example.restblog.web;


import com.example.restblog.data.Category;
import com.example.restblog.data.Post;
import com.example.restblog.data.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import static com.example.restblog.data.User.Role.USER;
import static com.example.restblog.web.PostsController.date;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {

//    Start of test data
    static ArrayList<User> users = new ArrayList<>();
    static ArrayList<Category> categories = new ArrayList<>();
    static ArrayList<Post> posts = new ArrayList<>();

    public static void main(String[] args) {
        User user1 = new User(1, "username1", "email@1.com", "password", date, USER, posts);
        users.add(user1);
        Post post1 = new Post(1L, "Post 1", "gdfgdfdfgfdsg", date, user1, categories);
        posts.add(post1);
        Category cat1 = new Category(1L, "JS", posts);
        categories.add(cat1);
    }

//    End of test data

    @GetMapping
    private Category getPostsByCategory(@RequestParam String categoryName) {
        for (Category category : categories) {
            if (category.getName().contains(categoryName)){
                return category;
            }
        }
        return null;
    }
}
