package com.example.restblog.data;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Post {
    private Long id;
    private String title;
    private String content;
    private Date createdAt;
    private User user;
}
