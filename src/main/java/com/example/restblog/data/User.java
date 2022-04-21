package com.example.restblog.data;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private Date createdAt;
    @Column(nullable = false)
    private Role role;
//    private Collection<Post> posts;

    public enum Role {USER, ADMIN};
    @PrePersist
    void createdAt() {
        this.createdAt  = new Date();
    }

    public User(String username, String email, String password, Date createdAt, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.role = Role.USER;
    }
}
