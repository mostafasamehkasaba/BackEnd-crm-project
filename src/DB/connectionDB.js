import mongoose from "mongoose";

export const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected ✅");
  } catch (err) {
    console.log("DB Error", err);
  }
};