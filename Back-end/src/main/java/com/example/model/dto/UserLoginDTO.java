package com.example.model.dto;

import com.example.model.Role;
import com.example.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserLoginDTO {
    private long id;
    private String username;
    private String password;
    private Role role;
    private String createAt;
    private String updateAt;
    public User toUser(){
        return new User(id,username, password, role, createAt, updateAt);
    }
    public UserLoginDTO(long id, String username, String password, Role role){
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
    public UserLoginDTO(String username, String password){
        this.username = username;
        this.password = password;
    }
}
