package com.digicust22.disgicustInfoo.Reposerty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digicust22.disgicustInfoo.entity.UserProfileEntity;
import com.digicust22.disgicustInfoo.entity.VerificationTokenEntity;
@Repository
public interface UserProfileRepo extends JpaRepository<UserProfileEntity , Long> {

	public UserProfileEntity findByEmail(String email);

	public	UserProfileEntity findByPhone(long phone);

	public UserProfileEntity findByPanCard(String panCard);

	public void save(VerificationTokenEntity verificationToken);

}