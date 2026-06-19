import mongoose from "mongoose";

const installmentPlanSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique :true,
        trim : true
    },

    months :{
        type : Number,
        required : true,
        min : 1
    },
    downPaymentPercentage :{
        type : Number,
        required : true,
        min :0,
        max : 100
    },
    isActive :{
        type : Boolean,
        default : true
    }
},{timestamps : true})

export const installMentPlanModel = mongoose.model("InstallmentPlan", installmentPlanSchema)