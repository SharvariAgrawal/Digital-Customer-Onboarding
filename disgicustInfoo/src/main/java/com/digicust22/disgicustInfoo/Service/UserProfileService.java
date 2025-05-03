package com.digicust22.disgicustInfoo.Service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.digicust22.disgicustInfoo.entity.UserProfileEntity;
//userprofileService.java file

@Service
public interface UserProfileService {
  
	 public void saveUserProfileData(UserProfileEntity userProfileData);
		public List<UserProfileEntity>getAllUserProfileInfo();
		
		//public UserProfileEntity getUserProfileEntityById(long id);
	public UserProfileEntity getUserProfileById(long id);
	
	 public void updateUserProfileData(UserProfileEntity userProfileData);
	public void deleteUserById(Long userId);
	
	
public String saveDocuments(Long userId,  Map<String, MultipartFile> files);
	
	public String verifyAndSaveCustData(UserProfileEntity userProfileData);
	public String getLastGeneratedOtp();
	
	//public boolean validateUserToken( int token,String identityData,String tokenType) ;


	 
   

	
	

} 
