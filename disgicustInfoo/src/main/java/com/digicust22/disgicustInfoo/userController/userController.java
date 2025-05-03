package com.digicust22.disgicustInfoo.userController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.digicust22.disgicustInfoo.Service.UserProfileService;
import com.digicust22.disgicustInfoo.entity.UserProfileEntity;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class userController {

    @Autowired
    private UserProfileService userProfileService;

    // 🔹 1. Test Endpoint
    @GetMapping("/abc")
    public String saveUserProfileData() {
        return "save information";
    }

    // 🔹 2. Save New User
    @PostMapping("/hello")
    public String saveUserProfileData(
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName,
        @RequestParam("email") String email,
        @RequestParam("mobile") long phone,
        @RequestParam("password") String password,
        @RequestParam("aadharNumber") String aadharNumber,
        @RequestParam("panNumber") String panNumber,
        @RequestParam("aadharDocument") MultipartFile aadharDocument,
        @RequestParam("panDocument") MultipartFile panDocument
    ) {
        // Save all fields and documents
        return "done";
    }

    // 🔹 3. Fetch All Users
    @GetMapping("/hello2")
    public List<UserProfileEntity> getAllUserProfile() {
        return userProfileService.getAllUserProfileInfo();
    }

    // 🔹 4. Get User by ID
    @GetMapping("/hello3/{id}")
    public UserProfileEntity getUserProfileEntityById(@PathVariable long id) {
        return userProfileService.getUserProfileById(id);
    }

    // 🔹 5. Update User
    @PutMapping("/update")
    public String updateUserProfileData(@RequestBody UserProfileEntity userProfileData) {
        userProfileService.updateUserProfileData(userProfileData);
        return "update done";
    }

    // 🔹 6. Delete User
    @DeleteMapping("/delete-user")
    public ResponseEntity<String> deleteUser(@RequestParam Long userId) {
        userProfileService.deleteUserById(userId);
        return new ResponseEntity<>("User Deleted Successfully..!", HttpStatus.OK);
    }

    // 🔹 7. Upload Documents
    @PutMapping("/file/upload")
    public ResponseEntity<String> uploadUserDocuments(@RequestParam Long userId,
                                                      @RequestParam Map<String, MultipartFile> files) {
        userProfileService.saveDocuments(userId, files);
        return new ResponseEntity<>("User Data Uploaded Successfully..!", HttpStatus.OK);
    }

    // 🔹 8. Verify and Save User
    @PostMapping("/verify-user")
    public String verifyAndSaveCustData(@RequestBody UserProfileEntity userProfileData) {
        return userProfileService.verifyAndSaveCustData(userProfileData);
    }

    // ✅ 9. Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Replace this logic with actual DB check in real scenarios
        if ("demo@example.com".equals(username) && "password".equals(password)) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // 🔹 10. Get Latest OTP
    @GetMapping("/latest-otp")
    public ResponseEntity<String> getLatestOtp() {
        String otp = userProfileService.getLastGeneratedOtp();
        if (otp != null) {
            return ResponseEntity.ok("Latest OTP is: " + otp);
        }
        return ResponseEntity.notFound().build();
    }
}