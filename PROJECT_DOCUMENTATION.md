# JOB PORTAL — PROJECT DOCUMENTATION
### B.Sc. (CA & IT) | Industrial Project – II (U16A1PRII)
### Ganpat University, Department of Computer Science

---

---

# PROJECT PROFILE

| Field | Details |
|---|---|
| **Project Title** | Job Portal |
| **Project Type** | Web Application |
| **Technology Used** | MERN Stack (MongoDB, Express.js, React.js, Node.js) |
| **Frontend** | React.js, Tailwind CSS, Redux Toolkit |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Cloud Storage** | Cloudinary (Resume & Profile Photo) |
| **Authentication** | JWT (JSON Web Token) |
| **Email Service** | Nodemailer (Gmail SMTP) |
| **Hosting** | Vercel (Frontend), Render (Backend) |
| **Department** | Department of Computer Science |
| **Program** | B.Sc. (CA & IT) |
| **Subject** | Industrial Project – II (U16A1PRII) |

---

---

# 2. EXISTING SYSTEM

- Job postings and applications are handled **manually or through basic static websites** with **no real-time updates**.

- Users cannot easily **filter or compare job opportunities** based on location, salary, or job type.

- Job seekers struggle to **track application statuses** — whether pending, reviewed, or rejected.

- **Time-consuming process** with manual data entry and **record keeping** using spreadsheets or emails.

- Data storage is **inefficient and prone to errors** with no centralized or secure system.

- No **automated email notifications** are sent to applicants when their application status changes.

- Recruiters manage candidate data through emails, making the process **disorganized and slow**.

- Admin has **no centralized dashboard** to monitor users, companies, jobs, and applications in one place.

---

---

# 3. NEED FOR NEW SYSTEM

- The new system will **reduce the time taken** to search and apply for jobs through a centralized online platform.

- Job seekers can easily **filter and compare job opportunities** based on skills, location, salary, and job type.

- Recruiters can efficiently **post jobs, manage applications**, and update candidate statuses in real time.

- The system provides **OTP-based email verification** during signup to ensure secure and authentic user registration.

- Job seekers can **track their application statuses** — pending, reviewed, accepted, or rejected — directly from their profile.

- **Automated email notifications** are sent to applicants whenever their application status is updated by the recruiter.

- Resumes and profile photos are stored securely using **cloud-based storage (Cloudinary)**, eliminating manual file handling.

- A dedicated **Admin dashboard** allows centralized management of users, companies, jobs, feedback, and announcements.

- The system is **role-based** — Student, Recruiter, and Admin — ensuring each user sees only what is relevant to them.

---

---

# 4. FUNCTIONAL SPECIFICATION

## 4.1 USER OF THE SYSTEM

### (1) Admin :-

- Admin can **login** with secure credentials and access the admin dashboard.
- Admin can **manage Users** — view all registered students and recruiters, and delete accounts if needed.
- Admin can **manage Companies** — view all registered companies and **approve or reject** company requests submitted by recruiters.
- Admin can **manage Jobs** — view all job postings across the platform and delete inappropriate listings.
- Admin can **manage Applications** — view all job applications submitted by students.
- Admin can **manage Feedback** — view feedback submitted by users and delete entries.
- Admin can **post Announcements** — create and manage announcements visible to all users on the platform.
- Admin can **view Dashboard** — see total counts of users, jobs, companies, and applications at a glance.

### (2) Recruiter :-

- Recruiter can **register and login** with OTP-verified email and manage their profile.
- Recruiter can **register multiple companies** and update company details like logo, location, and description.
- Recruiter can **post job openings** under an approved company with details like salary, location, and requirements.
- Recruiter can **edit or delete job postings** anytime from their jobs dashboard.
- Recruiter can **view all applications** received for their job postings and update each applicant's status.
- Recruiter can **send interview details** (date, time, location) directly to the applicant via automated email.

### (3) Student :-

- Student can **register with OTP-based email verification** and login securely to the platform.
- Student can **create and manage their profile** — name, phone, bio, skills, and profile photo.
- Student can **upload and update their resume** stored securely on cloud.
- Student can **search and filter jobs** by location, job type, and salary range.
- Student can **apply for job postings** directly with one click.
- Student can **track all application statuses** — pending, reviewed, accepted, or rejected — from their profile.
- Student can **receive email notifications** when their application status is updated by the recruiter.
- Student can **submit feedback** about the platform through the feedback form.

---

## 4.2 MODULE OF THE SYSTEM

**Register :-**
- Student and Recruiter can register with valid credentials through OTP-based email verification.

**Login :-**
- Student and Recruiter can login using their registered email and password.
- Admin can login using secure admin credentials from a separate login page.

**Manage Profile :-**
- Students can update their name, phone, bio, skills, resume, and profile photo.
- Recruiters can update their name, phone, and profile photo.
- Admin can view and update their own admin profile.

**Manage Users :-**
- Admin can view all registered Students and Recruiters.
- Admin can delete user accounts if required.

**Company Management :-**
- Recruiters can register multiple companies with name, logo, location, and description.
- Admin can approve or reject company registration requests.

**Manage Job Posts :-**
- Recruiters can create, edit, or delete their job postings under an approved company.
- Students can view all active job listings and filter by location, salary, and job type.
- Admin can view or delete any job post from the platform.

**Application Management :-**
- Students can apply for jobs and track their application status from their profile.
- Recruiters can view all received applications and update status — accepted, rejected, or interview scheduled.
- Admin can monitor all job applications across the platform.

**Email Notifications :-**
- Automated emails are sent to students when their application status is updated.
- Interview details including date, time, and location are sent via email by the recruiter.

**Announcements :-**
- Admin can post announcements visible to all users on the platform.

**Feedback :-**
- Students can submit feedback about the platform.
- Admin can view and delete feedback entries.

---

---

# 5. SYSTEM REQUIREMENT

## 5.1 Minimum Software Requirements

### Server Side

| Software | Requirement |
|---|---|
| Operating System | Windows 10 / Ubuntu 20.04 or higher |
| Runtime Environment | Node.js v16 or higher |
| Database | MongoDB Atlas (Cloud) |
| Package Manager | npm v8 or higher |
| Cloud Storage | Cloudinary Account |
| Email Service | Gmail Account with App Password |
| Version Control | Git |

### Client Side

| Software | Requirement |
|---|---|
| Operating System | Windows 7 or higher / macOS / Android / iOS |
| Web Browser | Google Chrome 90+ / Firefox 88+ / Edge 90+ |
| Internet Connection | Required |
| JavaScript | Must be enabled in browser |

---

## 5.2 Minimum Hardware Requirements

### Server Side

| Hardware | Requirement |
|---|---|
| Processor | Intel Core i3 or equivalent (2 GHz or higher) |
| RAM | 4 GB minimum (8 GB recommended) |
| Storage | 10 GB free disk space |
| Network | Broadband Internet Connection (10 Mbps+) |

### Client Side

| Hardware | Requirement |
|---|---|
| Processor | 1 GHz or higher |
| RAM | 2 GB minimum |
| Storage | 500 MB free disk space |
| Display | 1024 x 768 resolution or higher |
| Network | Internet Connection Required |

---

---

# 6. DATA DICTIONARY

---

## TABLE 1 — USERS

| **Table Name :-** | users |
|---|---|
| **Primary Key :-** | _id |
| **Foreign Key :-** | profile.company (Ref – companies (_id)) |
| **Description :-** | Stores registered student, recruiter and admin account details |

| Sr. No | Field Name | Data Type | Constraint | Description | Sample Data |
|---|---|---|---|---|---|
| 1 | _id | ObjectId | Primary Key, Not Null | Unique user identifier | 64ab91f23c |
| 2 | fullname | String | Required, Trim | Full name of user | John Doe |
| 3 | email | String | Required, Unique, Trim | User email address | john@gmail.com |
| 4 | phoneNumber | Number | Required | Contact number | 9876543210 |
| 5 | password | String | Required | Bcrypt hashed password | $2b$10$... |
| 6 | role | String | Required, Enum | User role (student/recruiter/admin) | student |
| 7 | profile.bio | String | Optional | Short bio of user | Web Developer |
| 8 | profile.skills | Array[String] | Optional | List of skills | [React, Node] |
| 9 | profile.resume | String | Optional | Cloudinary resume URL | https://... |
| 10 | profile.resumeOrignalName | String | Optional | Original resume filename | resume.pdf |
| 11 | profile.profilePhoto | String | Default: "" | Cloudinary profile photo URL | https://... |
| 12 | profile.company | ObjectId | Foreign Key | Reference to Company | 65ab12c34 |
| 13 | createdAt | DateTime | Auto (timestamps) | Account creation date | 2025-01-15 |
| 14 | updatedAt | DateTime | Auto (timestamps) | Last updated date | 2025-02-10 |

---

## TABLE 2 — COMPANIES

| **Table Name :-** | companies |
|---|---|
| **Primary Key :-** | _id |
| **Foreign Key :-** | userId (Ref – users (_id)) |
| **Description :-** | Stores company details registered by recruiters, pending admin approval |

| Sr. No | Field Name | Data Type | Constraint | Description | Sample Data |
|---|---|---|---|---|---|
| 1 | _id | ObjectId | Primary Key, Not Null | Unique company identifier | 65ab12c34d |
| 2 | name | String | Required, Unique | Company name | TechCorp Pvt Ltd |
| 3 | description | String | Optional | Company description | IT Services firm |
| 4 | website | String | Optional | Company website URL | https://techcorp.com |
| 5 | location | String | Optional | Company location | Ahmedabad |
| 6 | logo | String | Optional | Cloudinary logo URL | https://... |
| 7 | status | String | Enum, Default: pending | Admin approval status | approved |
| 8 | userId | ObjectId | Required, Foreign Key | Recruiter who owns company | 64ab91f23c |
| 9 | jobs | Array[ObjectId] | Optional | References to Jobs | [652fa89b1] |
| 10 | createdAt | DateTime | Auto (timestamps) | Company registration date | 2025-02-10 |
| 11 | updatedAt | DateTime | Auto (timestamps) | Last updated date | 2025-03-01 |

---

## TABLE 3 — JOBS

| **Table Name :-** | jobs |
|---|---|
| **Primary Key :-** | _id |
| **Foreign Key :-** | company (Ref – companies (_id)), createdBy (Ref – users (_id)) |
| **Description :-** | Stores job details posted by recruiters under approved companies |

| Sr. No | Field Name | Data Type | Constraint | Description | Sample Data |
|---|---|---|---|---|---|
| 1 | _id | ObjectId | Primary Key, Not Null | Unique job identifier | 652fa89b1c |
| 2 | title | String | Required, Trim | Job title | Frontend Developer |
| 3 | description | String | Required, Trim | Job description | Build React apps |
| 4 | requirements | Array[String] | Optional, Trim | Required skills list | [React, CSS] |
| 5 | salary | Number | Required, Min: 0 | Salary offered (per annum) | 500000 |
| 6 | experience | Number | Required, Min: 0 | Years of experience needed | 2 |
| 7 | location | String | Required, Trim | Job location | Ahmedabad |
| 8 | jobType | String | Required | Type of job | Full Time |
| 9 | position | Number | Required | Number of openings | 3 |
| 10 | company | ObjectId | Required, Foreign Key | Reference to Company | 65ab12c34d |
| 11 | createdBy | ObjectId | Required, Foreign Key | Recruiter who posted job | 64ab91f23c |
| 12 | application | Array[ObjectId] | Optional | References to Applications | [66bc34d12] |
| 13 | createdAt | DateTime | Auto (timestamps) | Job post date | 2025-03-01 |
| 14 | updatedAt | DateTime | Auto (timestamps) | Last updated date | 2025-03-05 |

---

## TABLE 4 — APPLICATIONS

| **Table Name :-** | applications |
|---|---|
| **Primary Key :-** | _id |
| **Foreign Key :-** | job (Ref – jobs (_id)), applicant (Ref – users (_id)) |
| **Description :-** | Stores job applications submitted by students for job postings |

| Sr. No | Field Name | Data Type | Constraint | Description | Sample Data |
|---|---|---|---|---|---|
| 1 | _id | ObjectId | Primary Key, Not Null | Unique application identifier | 66bc34d12e |
| 2 | job | ObjectId | Required, Foreign Key | Reference to Job applied for | 652fa89b1c |
| 3 | applicant | ObjectId | Required, Foreign Key | Reference to Student user | 64ab91f23c |
| 4 | status | String | Enum, Default: pending | Application status | accepted |
| 5 | interviewDate | Date | Default: null | Scheduled interview date | 2025-04-10 |
| 6 | interviewNote | String | Default: "" | Additional interview note | Bring resume |
| 7 | interviewPlace | String | Default: "" | Interview location/venue | Ahmedabad |
| 8 | createdAt | DateTime | Auto (timestamps) | Application submit date | 2025-03-05 |
| 9 | updatedAt | DateTime | Auto (timestamps) | Last updated date | 2025-03-10 |

---

## TABLE 5 — FEEDBACKS

| **Table Name :-** | feedbacks |
|---|---|
| **Primary Key :-** | _id |
| **Foreign Key :-** | user (Ref – users (_id)) |
| **Description :-** | Stores feedback submitted by users about the platform |

| Sr. No | Field Name | Data Type | Constraint | Description | Sample Data |
|---|---|---|---|---|---|
| 1 | _id | ObjectId | Primary Key, Not Null | Unique feedback identifier | 67cd45e23f |
| 2 | user | ObjectId | Required, Foreign Key | Reference to User | 64ab91f23c |
| 3 | name | String | Required | Name of the user | John Doe |
| 4 | feedback | String | Required | Feedback message content | Great platform! |
| 5 | createdAt | DateTime | Auto (timestamps) | Feedback submission date | 2025-03-10 |
| 6 | updatedAt | DateTime | Auto (timestamps) | Last updated date | 2025-03-10 |

---

## TABLE 6 — ANNOUNCEMENTS

| **Table Name :-** | announcements |
|---|---|
| **Primary Key :-** | _id |
| **Foreign Key :-** | createdBy (Ref – users (_id)) |
| **Description :-** | Stores announcements posted by admin for platform users |

| Sr. No | Field Name | Data Type | Constraint | Description | Sample Data |
|---|---|---|---|---|---|
| 1 | _id | ObjectId | Primary Key, Not Null | Unique announcement identifier | 68de56f34g |
| 2 | title | String | Required, Trim | Announcement title | New Feature Added |
| 3 | message | String | Required, Trim | Announcement content/body | Dark mode is live |
| 4 | createdBy | ObjectId | Required, Foreign Key | Admin who posted announcement | 64ab91f23c |
| 5 | targetRole | String | Enum, Default: all | Target audience role | all |
| 6 | createdAt | DateTime | Auto (timestamps) | Announcement posted date | 2025-03-15 |
| 7 | updatedAt | DateTime | Auto (timestamps) | Last updated date | 2025-03-15 |

---

---

# 7. TESTING

## Test Cases

| No | Test Case | Input | Result | Pass / Fail |
|---|---|---|---|---|
| 1 | Required Field Validation (Signup) | Submit form with empty fullname | Display "Full name is required" | Pass |
| 2 | Required Field Validation (Signup) | Submit form with empty email | Display "Email is required" | Pass |
| 3 | Email Format Validation | Enter "abc" as email | Display "Invalid email" | Pass |
| 4 | Phone Number Validation | Enter 7-digit number | Display "Must be 10 digits" | Pass |
| 5 | Password Length Validation | Enter password less than 6 chars | Display "Minimum 6 characters" | Pass |
| 6 | OTP Validation (Signup) | Enter wrong 6-digit OTP | Display "Invalid OTP" | Pass |
| 7 | OTP Expiry Validation | Enter OTP after 10 minutes | Display "OTP expired" | Pass |
| 8 | Duplicate Email Validation | Register with existing email | Display "User already exists" | Pass |
| 9 | Login Invalid Credentials | Enter wrong password | Display "Invalid email or password" | Pass |
| 10 | Login Role Mismatch | Login as student with recruiter role | Display "Access denied: incorrect role" | Pass |
| 11 | File Size Validation (Resume) | Upload file greater than 10 MB | Display "File size exceeds 10 MB" | Pass |
| 12 | File Type Validation (Resume) | Upload non-PDF file | Only PDF files accepted | Pass |
| 13 | File Type Validation (Photo) | Upload non-image file | Only image files allowed | Pass |
| 14 | Apply Job (Not Logged In) | Try to apply without login | Redirect to login page | Pass |
| 15 | Forgot Password — Email Not Found | Enter unregistered email | Display "No account found with this email" | Pass |
| 16 | Reset Password Mismatch | Enter different confirm password | Display "Passwords do not match" | Pass |
| 17 | Admin Login Wrong Credentials | Enter wrong admin password | Display "Invalid email or password" | Pass |
| 18 | Company Registration (No Name) | Submit company form without name | Display required field error | Pass |
| 19 | Job Post Without Company | Post job without approved company | Cannot post without approved company | Pass |
| 20 | Duplicate Job Application | Apply to same job twice | Display "Already applied" | Pass |

---

---

# 8. FUTURE ENHANCEMENT

- **AI-based Job Recommendation** — Suggest jobs to students based on their skills and profile using machine learning algorithms.

- **Resume Builder** — Allow students to create and download a professional resume directly from the platform.

- **Real-time Chat** — Enable direct messaging between recruiters and applicants for faster communication.

- **Video Interview Integration** — Integrate video calling feature for conducting online interviews within the platform.

- **Mobile Application** — Develop Android and iOS mobile apps for better accessibility on smartphones.

- **Social Login** — Allow users to register and login using Google or LinkedIn accounts.

- **Job Alerts via SMS** — Send SMS notifications to students when new matching jobs are posted.

- **Advanced Analytics Dashboard** — Provide recruiters with detailed analytics on job post views, application rates, and candidate profiles.

- **Multi-language Support** — Add support for regional languages like Gujarati and Hindi for wider accessibility.

- **Subscription Plans for Recruiters** — Introduce premium plans for recruiters to post featured jobs and access advanced filters.

---

---

# 9. BIBLIOGRAPHY

| Sr. No | Reference | Source |
|---|---|---|
| 1 | React.js Official Documentation | https://react.dev |
| 2 | Node.js Official Documentation | https://nodejs.org/en/docs |
| 3 | Express.js Official Documentation | https://expressjs.com |
| 4 | MongoDB Official Documentation | https://www.mongodb.com/docs |
| 5 | Mongoose ODM Documentation | https://mongoosejs.com/docs |
| 6 | Tailwind CSS Documentation | https://tailwindcss.com/docs |
| 7 | Redux Toolkit Documentation | https://redux-toolkit.js.org |
| 8 | Cloudinary Documentation | https://cloudinary.com/documentation |
| 9 | Nodemailer Documentation | https://nodemailer.com/about |
| 10 | JWT (jsonwebtoken) Documentation | https://www.npmjs.com/package/jsonwebtoken |
| 11 | Bcrypt.js Documentation | https://www.npmjs.com/package/bcrypt |
| 12 | Vercel Deployment Guide | https://vercel.com/docs |
| 13 | Render Deployment Guide | https://render.com/docs |
| 14 | W3Schools Web Development Reference | https://www.w3schools.com |
| 15 | Stack Overflow Community | https://stackoverflow.com |

---

*Job Portal — Project Documentation | B.Sc. (CA & IT) | Ganpat University | Department of Computer Science*
