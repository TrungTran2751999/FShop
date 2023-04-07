package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;

    @ManyToOne(targetEntity = Role.class)
    @JoinColumn(name = "role_id",referencedColumnName = "id")
    private Role role;

    @Column(columnDefinition = "datetime",nullable = false)
    private String creatAt;

    @Column(columnDefinition = "datetime",nullable = false)
    private String updateAt;
}
