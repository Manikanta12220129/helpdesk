import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import connectDB from "./db.js";

dotenv.config();
connectDB();

const seed = async () => {
  await User.deleteMany();
  const password = await bcrypt.hash("123456", 10);
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password,
    role: "admin"
  });
  console.log("✅ Admin user created");
  process.exit();
};

seed();
