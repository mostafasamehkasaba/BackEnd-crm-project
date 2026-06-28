import mongoose from "mongoose";

const notificationSchema =new mongoose.Schema(
    {
        type :{
            type :String,
            enum : [' PAYMENT',"INVOICE","INSTALLMENT"],
            required : true
        },
        title :{
            type : String,
            required: true

        },
        message: {
            type : String,
            required :true
        },
        amount:{
            type : Number,

        },
        isRead :{
            type : Boolean,
            default : false
        }

    },{timestamps : true}
)

export const notificationModel = mongoose.model("Notification",notificationSchema)

