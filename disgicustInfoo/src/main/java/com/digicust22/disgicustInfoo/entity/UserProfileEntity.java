package com.digicust22.disgicustInfoo.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="userData")
public class UserProfileEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String firstName;  
	
	private String middleName;
	
	private String lastName;
	
	
	
	@Column(unique = true, length = 100)
	private String email;
	
	@Column(unique = true)
	private long phone;
	
	@Column(unique = true)
	private String panCard;
	
	@JsonProperty ("isEmailVerified")
	private boolean isEmailVerified;
	
	@JsonProperty ("isPhoneVerified")
	private boolean isPhoneVerified;
	
	@JsonProperty ("isPanVerified")
	private boolean isPanVerified;
	
	private boolean status;
	
	@Lob
	@Column(name="aadhar_card_docs", columnDefinition = "LONGBLOB")
	private byte[] aadharDocs;
	
	@Lob
	@Column(name="pan_card_docs",columnDefinition = "LONGBLOB")
	private byte[] panCardDocs;
	
	
	
	
	@Lob
	@Column(name="address_verification_docs",columnDefinition = "LONGBLOB")
	private byte[] addressVerificationDocs;
		
}


