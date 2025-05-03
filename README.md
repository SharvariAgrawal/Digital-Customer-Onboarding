# 🏦 Digital Customer Onboarding – Online Bank Account Opening System (Full Stack)

**DigiCust** is a full-stack web application that enables customers to **open a new bank account online** without visiting a physical branch. Users can securely submit personal details and upload verification documents, which are processed by a Java Spring Boot backend system.

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript, React (form-based UI)
- **Backend**: Java Spring Boot (Maven-based REST API)
- **Database**: MySQL 

---

## 📂 Project Structure
disgicustInfoo / # Backend
digicustinfoo-frontend / # Frontend 

---

## 💡 Project Features

-  Online customer registration form
-  Upload PAN card and ID proof
-  Data saved securely via REST API
-  Confirmation message after submission
- OTP Generation and Verification

---

## 🔁 Application Flow / Data Flow

1. **User Interface (Frontend)**:
   - The user fills in a digital form with details like:
     - First Name, Middle Name, Last Name
     - Email and Phone Number
     - Password
     - PAN Card Number, Aadhar Number
     - Uploads PAN card and Aadhar Proof

2. **Form Submission**:
   - Data is packaged as a POST request (with multipart/form-data for files).
   - Sent to the backend API endpoint via JavaScript.

3. **Backend Processing (Spring Boot)**:
   - Data is received and mapped to an entity class (`UserProfileEntity`).
   - Documents are stored (as `byte[]` or in DB/file system).
   - Flags like `isPanVerified` and `isIdVerified` are stored as `false` initially.
   - Data is persisted to the database.

4. **Response**:
   - Backend responds with a success message.
   - Frontend displays a confirmation or redirection screen.

---

## 📸 Screenshots
![Form UI] (https://raw.githubusercontent.com/SharvariAgrawal/Digital-Customer-Onboarding/7215a3bb9bd5f84521a386eca911f8612ce7f08d/screenshots/Firstpage.png)


