import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [30, "Name must be less than 30 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      // match: [
      //   /^01[0125][0-9]{8}$/,
      //   "Please enter a valid Egyptian phone number",
      // ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },

    role: {
      type: String,
      enum: {
        values: ["CLIENT", "ADMIN"],
        message: "Role must be CLIENT or ADMIN",
      },
      default: "CLIENT",
    },
    profileImage: {
      secure_url: String,
      public_id: String,
    },

    address: {
      country: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      building: {
        type: String,
        trim: true,
      },
    },
    isConfirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Usermodel = mongoose.model("User", userSchema);
