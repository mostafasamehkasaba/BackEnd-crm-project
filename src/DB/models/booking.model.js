import mongoose, { Types } from "mongoose"

const bookingSchema = new mongoose.Schema({
    property_id :{
        type : Types.ObjectId,
        ref: "Property",
        required : true
    },
    name :{
        type : String,
        required:true

    },
    email:{
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true
    },status:{
        type: String,
      enum: ["PENDING", "CONFIRMED", "REJECTED"],
      default: "PENDING",
    }
},{timestamps: true})

export const bookingModel = mongoose.model("Booking", bookingSchema);