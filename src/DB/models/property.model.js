import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subdescription: {
      type: String,
    },
    property_type: {
      type: String,
      enum: ["Apartment", "House", "Villa", "Office", "Land"],
      required: true,
    },
    image: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    price: {
      type: Number,
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    area: {
      type: Number,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const propertyModel = mongoose.model("Property", propertySchema);
