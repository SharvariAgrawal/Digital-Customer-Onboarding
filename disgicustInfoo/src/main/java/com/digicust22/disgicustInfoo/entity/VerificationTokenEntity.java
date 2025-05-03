package com.digicust22.disgicustInfoo.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "verification_token")
public class VerificationTokenEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(nullable = false)
    private String token;
    
    private Date expiryDate;
    
    private String type;
    
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "userData_id", referencedColumnName = "id")  // Changed to match your table name
    private UserProfileEntity userData;
    
    // Even with @Data, we'll keep these explicit setters to ensure compatibility
    public void setToken(String token) {
        this.token = token;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public void setUserData(UserProfileEntity userData) {
        this.userData = userData;
    }
}