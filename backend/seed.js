import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Hash passwords
    const hashedPassword = await bcrypt.hash("Test@123", 10);

    // Create test users
    const testUsers = [
      {
        fullname: "Raj Kumar",
        email: "raj@example.com",
        phoneNumber: 9876543210,
        password: hashedPassword,
        role: "student",
        profile: {
          bio: "Aspiring software engineer",
          skills: ["JavaScript", "React", "Node.js"],
          profilePhoto: "https://via.placeholder.com/150",
        },
      },
      {
        fullname: "Priya Singh",
        email: "priya@example.com",
        phoneNumber: 9876543211,
        password: hashedPassword,
        role: "student",
        profile: {
          bio: "Full stack developer",
          skills: ["Python", "Django", "PostgreSQL"],
          profilePhoto: "https://via.placeholder.com/150",
        },
      },
      {
        fullname: "Amit Patel",
        email: "amit@example.com",
        phoneNumber: 9876543212,
        password: hashedPassword,
        role: "recruiter",
        profile: {
          bio: "HR Manager at Tech Company",
          profilePhoto: "https://via.placeholder.com/150",
        },
      },
      {
        fullname: "Admin User",
        email: "admin@example.com",
        phoneNumber: 9876543213,
        password: hashedPassword,
        role: "recruiter",
        profile: {
          bio: "Administrator",
          profilePhoto: "https://via.placeholder.com/150",
        },
      },
    ];

    const createdUsers = await User.insertMany(testUsers);
    console.log("✅ Created " + createdUsers.length + " test users");

    // Create test companies
    const testCompanies = [
      {
        name: "Tech Innovations Inc",
        description: "Leading software development company",
        website: "https://techinnovations.com",
        location: "Bangalore, India",
        logo: "https://via.placeholder.com/200",
        userId: createdUsers[2]._id, // Amit Patel
      },
      {
        name: "Digital Solutions Ltd",
        description: "Enterprise software solutions provider",
        website: "https://digitalsolutions.com",
        location: "Mumbai, India",
        logo: "https://via.placeholder.com/200",
        userId: createdUsers[3]._id, // Admin User
      },
      {
        name: "Cloud Systems Corp",
        description: "Cloud infrastructure and services",
        website: "https://cloudsystems.com",
        location: "Delhi, India",
        logo: "https://via.placeholder.com/200",
        userId: createdUsers[2]._id, // Amit Patel
      },
    ];

    const createdCompanies = await Company.insertMany(testCompanies);
    console.log("✅ Created " + createdCompanies.length + " test companies");

    // Create test jobs
    const testJobs = [
      {
        title: "Senior React Developer",
        description:
          "Looking for experienced React developer with 3+ years experience",
        requirements: [
          "React",
          "JavaScript",
          "CSS",
          "Git",
          "REST APIs",
        ],
        salary: 800000,
        location: "Bangalore",
        jobType: "Full Time",
        experience: 3,
        position: 2,
        company: createdCompanies[0]._id,
        createdBy: createdUsers[2]._id,
      },
      {
        title: "Python Developer",
        description:
          "Seeking Python developer for backend development",
        requirements: [
          "Python",
          "Django",
          "PostgreSQL",
          "REST APIs",
          "Docker",
        ],
        salary: 700000,
        location: "Mumbai",
        jobType: "Full Time",
        experience: 2,
        position: 3,
        company: createdCompanies[1]._id,
        createdBy: createdUsers[3]._id,
      },
      {
        title: "Full Stack Developer",
        description:
          "Build scalable web applications with our team",
        requirements: [
          "JavaScript",
          "Node.js",
          "React",
          "MongoDB",
          "AWS",
        ],
        salary: 900000,
        location: "Delhi",
        jobType: "Full Time",
        experience: 4,
        position: 1,
        company: createdCompanies[2]._id,
        createdBy: createdUsers[2]._id,
      },
      {
        title: "Frontend Developer",
        description:
          "Create beautiful user interfaces with React and Tailwind CSS",
        requirements: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Figma",
        ],
        salary: 600000,
        location: "Bangalore",
        jobType: "Full Time",
        experience: 1,
        position: 2,
        company: createdCompanies[0]._id,
        createdBy: createdUsers[2]._id,
      },
      {
        title: "DevOps Engineer",
        description:
          "Manage infrastructure and deployment pipelines",
        requirements: [
          "Docker",
          "Kubernetes",
          "AWS",
          "CI/CD",
          "Linux",
        ],
        salary: 850000,
        location: "Mumbai",
        jobType: "Full Time",
        experience: 3,
        position: 1,
        company: createdCompanies[1]._id,
        createdBy: createdUsers[3]._id,
      },
    ];

    const createdJobs = await Job.insertMany(testJobs);
    console.log("✅ Created " + createdJobs.length + " test jobs");

    console.log("\n" + "=".repeat(50));
    console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log("\n📝 TEST CREDENTIALS:");
    console.log("────────────────────────────────────────────────");
    console.log("Student Login:");
    console.log("  Email: raj@example.com");
    console.log("  Password: Test@123");
    console.log("\n  Email: priya@example.com");
    console.log("  Password: Test@123");
    console.log("\nRecruiter Login:");
    console.log("  Email: amit@example.com");
    console.log("  Password: Test@123");
    console.log("\n  Email: admin@example.com");
    console.log("  Password: Test@123");
    console.log("────────────────────────────────────────────────\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
