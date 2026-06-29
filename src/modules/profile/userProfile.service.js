import bcrypt from "bcryptjs";
import { Usermodel } from "../../DB/models/auth.model.js";
import configureCloudinary from "../../config/cloudinary.js";
import CryptoJS from "crypto-js";

export const getProfile = async (userId) => {
  const user = await Usermodel.findById(userId).select("-password");
  const decryptedPhone = CryptoJS.AES.decrypt(user.phone, "phoneKey").toString(
    CryptoJS.enc.Utf8,
  );
  return {
    message: "Success",
    user: {
      ...user._doc,
      phone: decryptedPhone,
    },
  };
};

export const updateProfile = async (userId, body) => {
  const user = await Usermodel.findByIdAndUpdate(
    userId,
    {
      name: body.name,
      address: body.address,
      phone: body.phone,
    },
    { new: true },
  ).select("-password");

  return { message: "Profile updated", user };
};

export const changePassword = async (userId, body) => {
  const user = await Usermodel.findById(userId);

  const isMatch = await bcrypt.compare(body.oldPassword, user.password);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  user.password = await bcrypt.hash(body.newPassword, 10);
  await user.save();

  return { message: "Password changed successfully" };
};

export const uploadProfileImage = async (userId, file) => {
  if (!file) {
    throw new Error("Please upload an image");
  }

  const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64",
  )}`;
  const cloudinary = configureCloudinary();

  const uploaded = await cloudinary.uploader.upload(base64, {
    folder: "CRM/users",
  });

  const user = await Usermodel.findByIdAndUpdate(
    userId,
    {
      profileImage: {
        secure_url: uploaded.secure_url,
        public_id: uploaded.public_id,
      },
    },
    { new: true },
  );

  return user;
};
