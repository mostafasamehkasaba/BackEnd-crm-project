import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["apartment", "villa", "tourism"],
    required: true,
  },
  bookType: {
    type: String,
    enum: ["sale", "rent"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ["available", "sold", "rented"],
    default: "available",
  },
}, { timestamps: true });

export const PropertyModel = mongoose.model("Property", propertySchema);