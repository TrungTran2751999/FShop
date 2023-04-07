package com.example.controller;

import com.example.exception.DataInputException;
import com.example.exception.EmailExistsException;
import com.example.model.JwtResponse;
import com.example.model.Role;
import com.example.model.User;
import com.example.model.dto.UserLoginDTO;
import com.example.service.jwt.JwtService;
import com.example.service.role.RoleService;
import com.example.service.user.UserService;
import com.example.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/food-machine/auth")
public class AuthAPI {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private AppUtil appUtil;
    @PostMapping("/register")
    private ResponseEntity<?> register(@RequestBody UserLoginDTO userLoginDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return appUtil.mapErrorToResponse(bindingResult);
        }
        long roleId = userLoginDTO.getRole().getId();
        Optional<Role> optRole = roleService.findById(roleId);
        if(!optRole.isPresent()){
            throw new DataInputException("Invalid role");
        }
        boolean existUserName = userService.existUserByUserName(userLoginDTO.getUsername());
        if(existUserName){
            throw new EmailExistsException("This user have been exists");
        }
        try{
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String toDay = dateFormat.format(new Date());
            userLoginDTO.setId(0L);
            userLoginDTO.setUpdateAt(toDay);
            userLoginDTO.setCreateAt(toDay);
            userService.save(userLoginDTO.toUser());
            return new ResponseEntity<>("Create new user successfully", HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Create new user fail", HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLoginDTO.getUsername(), userLoginDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtService.generateTokenLogin(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userService.findByUserName(userLoginDTO.getUsername());
            JwtResponse jwtResponse = new JwtResponse(
                    jwt,
                    currentUser.getId(),
                    userDetails.getUsername(),
                    currentUser.getPassword(),
                    currentUser.getUserName(),
                    userDetails.getAuthorities()
            );

            ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
                    .httpOnly(false)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 1000)
                    .domain("localhost")
                    .build();
            System.out.println(ResponseEntity
                    .ok()
                    .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                    .body(jwtResponse));
            System.out.println(jwtResponse);
            return ResponseEntity
                    .ok()
                    .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                    .body(jwtResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/check")
    private ResponseEntity<?> checkInfo(@RequestBody UserLoginDTO userLoginDTO){
        Optional<User> optUser = userService.findByUserNameOptional(userLoginDTO.getUsername());
        if(optUser.isPresent()){
            if(Objects.equals(userLoginDTO.getPassword(), optUser.get().getPassword())){
                return new ResponseEntity<>("Success", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
            }
        }else{
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }
}
