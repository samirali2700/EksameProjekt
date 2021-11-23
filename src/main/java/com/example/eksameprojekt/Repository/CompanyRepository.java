package com.example.eksameprojekt.Repository;

import com.example.eksameprojekt.Model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    @Query(
            value = "SELECT * FROM company WHERE admin_id = ?1",
            nativeQuery = true)
    Optional<Company> getCompanyByAdmin(int adminId);
}
