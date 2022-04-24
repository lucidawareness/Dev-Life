package com.example.restblog.web;


import com.example.restblog.data.CategoriesRepository;
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

    private final CategoriesRepository categoryRepository;
    private final PostsController postController;

    public CategoriesController(CategoriesRepository categoryRepository, PostsController postController) {
        this.categoryRepository = categoryRepository;
        this.postController = postController;
    }

    @GetMapping
    List<Category> getAll(){
        return categoryRepository.findAll();
    }

    @GetMapping("/category")
    private Category getPostsByCategory(@RequestParam String categoryName) {
        return categoryRepository.findCategoryByName(categoryName);
    }
}
