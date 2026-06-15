import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "must be at least 3 characters"],
      maxlength: [30, "must be less than 30 characters"],
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "invalid email"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: [11],
      maxlength: [50],
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["CLIENT", "ADMIN"],
      default: "CLIENT",
    },

    isConfirmEmail: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

export const Usermodel = mongoose.model("User", userSchema);