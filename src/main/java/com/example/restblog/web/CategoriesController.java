package com.example.restblog.web;


import com.example.restblog.data.Category;
import com.example.restblog.data.Post;
import com.example.restblog.data.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.example.restblog.data.User.Role.USER;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {

    @GetMapping
    private Category getPostsByCategory(@RequestParam String categoryName) {
        List<Post> posts = new ArrayList();
        Post post = new Post();
        posts.add(post);

        return new Category(1L, "JS", posts);
//        for (Category category : categories) {
//            if (category.getName().toLowerCase().contains(categoryName.toLowerCase())){
//            }
//        }
    }
}
