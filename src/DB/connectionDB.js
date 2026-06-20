import mongoose from "mongoose";

let isConnected = false;

export const DBconnection = async () => {
  if (isConnected) {
    console.log("Using existing DB connection ✅");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("Database connected ✅");
  } catch (err) {
    console.log("DB Error", err);
  }
};