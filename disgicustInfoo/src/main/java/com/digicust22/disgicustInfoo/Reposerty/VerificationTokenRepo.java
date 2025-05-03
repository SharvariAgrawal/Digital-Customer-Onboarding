package com.digicust22.disgicustInfoo.Reposerty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.digicust22.disgicustInfoo.entity.VerificationTokenEntity;

public interface VerificationTokenRepo extends JpaRepository<VerificationTokenEntity, Long> {
	@Query(value="select * from verification_token where user_profile_id = :userProfileId "
			+ "and type = :tokenType and status = 1 ",nativeQuery = true)
	public VerificationTokenEntity  findTokenByTypeStatusAndUserId(@Param("userProfileId") Long userProfileId,
			@Param("tokenType") String tokenType);
}

