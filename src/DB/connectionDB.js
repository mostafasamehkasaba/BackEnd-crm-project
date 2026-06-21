import mongoose from "mongoose";

export const DBconnection = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Using existing DB connection ✅");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected ✅");
  } catch (err) {
    console.log("DB Error", err);
    throw err;
  }
};