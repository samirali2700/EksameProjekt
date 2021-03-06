package com.example.eksameprojekt.RestController;

import com.example.eksameprojekt.Model.Admin;
import com.example.eksameprojekt.Model.Company;
import com.example.eksameprojekt.Model.User;
import com.example.eksameprojekt.Repository.AdminRepository;
import com.example.eksameprojekt.Repository.CompanyRepository;
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
    @Autowired
    CompanyRepository companyRepository;

    @PostMapping(value = "/loginFormAdmin", consumes = "application/json")
    public void loginActionAdmin(@RequestBody Admin admin){

    }
    @PostMapping(value = "/loginFormUser", consumes = "application/json")
    public void loginActionUser(@RequestBody User admin){

    }
    @GetMapping("/fetchCompany")
    public List<Company> fetchCompany(){
        return companyRepository.findAll();
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


    //create Company, admin and user

    @PostMapping(value = "/createAdmin", consumes = "application/json")
    public Optional<Admin> createAdmin(@RequestBody Admin admin){
        adminRepository.save(admin);
        return adminRepository.getAdminByUsername(admin.getUsername());
    }
    @PostMapping(value = "/createCompany", consumes = "application/json")
    public Optional<Company> createCompany(@RequestBody Company company){
        companyRepository.save(company);
        return companyRepository.getCompanyId(company.getCompanyName(), company.getCompanyPhone());
    }

    @PostMapping(value = "/saveAdmin", consumes = "application/json")
    public void saveAdmin(@RequestBody Admin admin){
        adminRepository.save(admin);
    }
    @GetMapping("/validateUsername/{username}")
    public int validateUsername(@PathVariable String username){
        return adminRepository.getUsernameMatch(username);
    }



    //Company
    @GetMapping("/setAdminId/{adminId}/{companyId}")
    public void setAdminId(@PathVariable int adminId, @PathVariable int companyId){
        companyRepository.setAdminId(adminId, companyId);
    }



}
