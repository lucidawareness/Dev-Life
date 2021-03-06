package com.example.restblog.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostsRepository extends JpaRepository<Post, Long> {
    Post findByTitle(String title); // select * from posts where title = ?
    Post findFirstByTitle(String title); // select * from posts where title = ? limit 1

//    The following method is equivalent to the built in `getOne` method, there's no need to create this example
//    @Query("from Post a where a.id like ?1")
//    Post getPostById(long id);

//    The following method shows you how to use named parameters in a HQL custom query:
//    @Query("from Post a where a.title like %:term%")
//    List<Post> searchByTitleLike(@Param("term") String term);
}
