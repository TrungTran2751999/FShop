package com.example.service.user;

import com.example.model.User;
import com.example.model.UserPrinciple;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements IUserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User getById(Long id) {
        return userRepository.getById(id);
    }

    @Override
    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) {
        Optional<User> user = userRepository.findByUserName(userName);
        if(user.isPresent()){
           return UserPrinciple.build(user.get());
        }else{
            throw new UsernameNotFoundException("Not exist User");
        }
    }

    @Override
    public User findByUserName(String userName) {
        return userRepository.findUserByUserName(userName).get();
    }

    @Override
    public boolean existUserByUserName(String userName) {
        return userRepository.existsUserByUserName(userName);
    }

    @Override
    public Optional<User> findByUserNameOptional(String userName) {
        return userRepository.findUserByUserName(userName);
    }
}
