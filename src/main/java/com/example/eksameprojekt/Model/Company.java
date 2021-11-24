package com.example.eksameprojekt.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
//@EqualsAndHashCode(exclude = "admin",callSuper = false)
@JsonIdentityInfo(generator= ObjectIdGenerators.UUIDGenerator.class, property="@id")
@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int companyId;
    private String companyName;
    private int companyPhone;
    private int empolyeeCount;

    @OneToOne
    @JoinColumn(name="adminId")
    private Admin admin;


    public int getCompanyId() { return companyId; }
    public void setCompanyId(int companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public int getCompanyPhone() { return companyPhone; }
    public void setCompanyPhone(int companyPhone) { this.companyPhone = companyPhone; }
    public int getEmpolyeeCount() { return empolyeeCount; }
    public void setEmpolyeeCount(int empolyeeCount) { this.empolyeeCount = empolyeeCount; }
    //@JsonBackReference
    public Admin getAdmin() { return admin; }
    public void setAdmin(Admin admin) {
        if(this.admin == null) {
            this.admin = admin;
        }
    }

    @Override
    public String toString() {
        return "Company{" +
                "companyId=" + companyId +
                ", companyName='" + companyName + '\'' +
                ", companyPhone=" + companyPhone +
                ", empolyeeCount=" + empolyeeCount +
                ", admin=" + admin +
                '}';
    }
}
