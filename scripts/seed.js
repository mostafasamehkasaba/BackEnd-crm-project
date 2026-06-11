import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Usermodel } from "../src/DB/models/auth.model.js";

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Database connected ✅");

  const existingAdmin = await Usermodel.findOne({ role: "ADMIN" });
  if (existingAdmin) {
    console.log("Admin already exists ✅");
    process.exit(0);
  }

  const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);

  await Usermodel.create({
    name: "Admin",
    email: process.env.ADMIN_EMAIL,
    phone: process.env.ADMIN_PHONE,
    password: hashedPassword,
    role: "ADMIN",
    isConfirmEmail: true,
  });

  console.log("Admin created successfully ✅");
  process.exit(0);
};

seedAdmin();