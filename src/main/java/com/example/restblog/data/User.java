package com.example.restblog.data;

import lombok.*;

import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    long id;
    String username;
    String email;
    String password;
    Date createdAt;
    Role role;
    private Collection<Post> posts;

    public enum Role {USER, ADMIN};
}
