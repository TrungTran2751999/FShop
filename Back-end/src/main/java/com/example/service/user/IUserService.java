package com.example.service.user;

import com.example.model.User;
import com.example.service.IGeneralService;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IUserService extends IGeneralService<User>, UserDetailsService {
    User findByUserName(String userName);
    boolean existUserByUserName(String userName);
    Optional<User> findByUserNameOptional(String userName);
}
