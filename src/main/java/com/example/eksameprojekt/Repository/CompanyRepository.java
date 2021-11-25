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


    @Query(
            value = "SELECT * FROM company WHERE company_name = ?1 AND company_phone = ?2",
            nativeQuery = true)
    Optional<Company> getCompanyId(String companyName, int companyPhone);


    @Query(
            value = "UPDATE company set admin_id = ?1 WHERE company_id = ?2",
            nativeQuery = true)
    void setAdminId(int adminId, int compnayId);
}
