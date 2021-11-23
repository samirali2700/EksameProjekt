package com.example.eksameprojekt.Model;

import javax.persistence.*;

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
    public Admin getAdmin() { return admin; }
    public void setAdmin(Admin admin) { this.admin = admin; }

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
