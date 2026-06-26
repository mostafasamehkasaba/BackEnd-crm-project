import mongoose from "mongoose";

const CompanyInfoSchema = new mongoose.Schema({
    companyName :{
        type : String,
        required : true,
    },
    taxNumber : {
        type : String,
        required : true,
    },
    commercialRegister:{
        type : String,
        required : true,

    },
    mainActivity : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    logoUrl :{
        type :String
    },
},{timestamps : true})

export const CampanyInfoModel = mongoose.model("CompanyInfo" ,CompanyInfoSchema)