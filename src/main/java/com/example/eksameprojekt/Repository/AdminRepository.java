package com.example.eksameprojekt.Repository;

import com.example.eksameprojekt.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface AdminRepository extends JpaRepository<Admin,Integer> {


    @Query(
            value = "SELECT * FROM admin WHERE  username = ?1",
            nativeQuery = true)
    Optional<Admin> getAdminByUsername(String username);


    @Query(
            value = "SELECT count(*) FROM admin WHERE username = ?1"
    ,nativeQuery = true)
    int getUsernameMatch(String username);


    @Query(
            value = "SELECT * FROM admin"
            ,nativeQuery = true)
    List<Admin> fetchAll();

}
