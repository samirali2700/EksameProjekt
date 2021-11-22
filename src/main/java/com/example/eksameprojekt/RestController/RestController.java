package com.example.eksameprojekt.RestController;

import com.example.eksameprojekt.Model.Admin;
import com.example.eksameprojekt.Model.User;
import com.example.eksameprojekt.Repository.AdminRepository;
import com.example.eksameprojekt.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@org.springframework.web.bind.annotation.RestController
public class RestController {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/loginFormAdmin", consumes = "application/json")
    public void loginActionAdmin(@RequestBody Admin admin){

    }
    @PostMapping(value = "/loginFormUser", consumes = "application/json")
    public void loginActionUser(@RequestBody User admin){

    }

    //Fetch Admin & user
    @GetMapping("/fetchAdmin")
    public List<Admin> fetchAdmin(){
        return adminRepository.findAll();
    }
    @GetMapping("/fetchUser")
    public List<User> fetchUser(){
        return userRepository.findAll();
    }

    //fetch Admin & user by ID
    @GetMapping("/fetchAdmin/{id}")
    public Optional<Admin> fetchAdmin(@PathVariable int id){
        return adminRepository.findById(id);
    }
    @GetMapping("/fetchUser/{id}")
    public Optional<User> fetchUser(@PathVariable int id){
        return userRepository.findById(id);
    }
}
