import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique :true
    },
     slug : {
        type : String,
        required : true,
        unique :true
    },

    // filters 

    filiters:[
        {
            filterName :{type :String, required :true },
            options: [{ type: String }]
        }
    ]
},{timestamps :true})

export const categoryModel = mongoose.model("Category", categorySchema)