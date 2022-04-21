package com.example.restblog.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Category, String> {
    Category findCategoryByName(String name);
}
