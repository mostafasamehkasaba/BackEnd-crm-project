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
  category :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
    required : true
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
  features : [
    {
      filterName : {
        type : String,
        required : true
      },
      value:{type :String , required : true}
    }
  ],
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