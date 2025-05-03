package com.digicust22.disgicustInfoo.ServiceImp;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.digicust22.disgicustInfoo.Reposerty.UserProfileRepo;
import com.digicust22.disgicustInfoo.Reposerty.VerificationTokenRepo;
import com.digicust22.disgicustInfoo.Service.UserProfileService;
import com.digicust22.disgicustInfoo.entity.UserProfileEntity;
import com.digicust22.disgicustInfoo.entity.VerificationTokenEntity;

@Component
public class ServiceImp implements UserProfileService {
    @Autowired
    private UserProfileRepo userProfilerepo;
    
    @Autowired
    private VerificationTokenRepo verificationTokenRepo;

    private String lastGeneratedOtp;

    private String generateOTP() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    @Override
    public void saveUserProfileData(UserProfileEntity userProfileData) {
        userProfilerepo.save(userProfileData);
    }

    @Override
    public List<UserProfileEntity> getAllUserProfileInfo() {
        return userProfilerepo.findAll();
    }

    @Override
    public UserProfileEntity getUserProfileById(long id) {
        return userProfilerepo.findById(id).orElse(null);
    }

    @Override
    public void updateUserProfileData(UserProfileEntity userProfileData) {
        userProfilerepo.save(userProfileData);
    }

    @Override
    public void deleteUserById(Long userId) {
        userProfilerepo.deleteById(userId);
    }

    @Override
    public String saveDocuments(Long userId, Map<String, MultipartFile> files) {
        Optional<UserProfileEntity> userProfileOptional = userProfilerepo.findById(userId);

        if (userProfileOptional.isPresent()) {
            UserProfileEntity custDetails = userProfileOptional.get();
            
            try {
                for (Map.Entry<String, MultipartFile> entry : files.entrySet()) {
                    String documentType = entry.getKey();
                    MultipartFile document = entry.getValue();

                    switch (documentType) {
                    case "aadharDocs":
                        custDetails.setAadharDocs(document.getBytes());
                        break;

                    case "pancardDocs":
                        custDetails.setPanCardDocs(document.getBytes());
                        break;

                    case "addressDocs":
                        custDetails.setAddressVerificationDocs(document.getBytes());
                        break;

                    default:
                        return "Invalid document type";
                    }
                }

                userProfilerepo.save(custDetails);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        return "Docs Uploaded Successfully..!";
    }

    @Override
    public String verifyAndSaveCustData(UserProfileEntity userProfileData) {
        UserProfileEntity userEmail = userProfilerepo.findByEmail(userProfileData.getEmail());
        UserProfileEntity userPhone = userProfilerepo.findByPhone(userProfileData.getPhone());
        UserProfileEntity userPanCard = userProfilerepo.findByPanCard(userProfileData.getPanCard());

        if (userEmail != null || userPhone != null || userPanCard != null) {
            return "Data alredy exists";
        }

        // Generate OTP
        String otp = generateOTP();
        lastGeneratedOtp = otp;
        
        // Save user data
        userProfilerepo.save(userProfileData);
        
        // Create verification token
        VerificationTokenEntity token = new VerificationTokenEntity();
        token.setToken(otp);
        token.setUserData(userProfileData);
        token.setType("REGISTRATION");
        token.setStatus("PENDING");
        token.setExpiryDate(new Date(System.currentTimeMillis() + (5 * 60 * 1000))); // 5 minutes expiry
        
        verificationTokenRepo.save(token);

        return "Otp for mobile no " + userProfileData.getPhone() + " is :" + otp;
    }

    @Override
    public String getLastGeneratedOtp() {
        return lastGeneratedOtp;
    }
}