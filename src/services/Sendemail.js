import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"
import { getVerifyEmailTemplate } from "./emailTemplete.js";

const transproter =nodemailer.createTransport({
    service : "gmail",
    auth :{
        user :process.env.EMAIL_USER,
        pass :process.env.EMAIL_PASS 
    },
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


export const sendEmail =async(to,token)=>{
    const verifyLink = `http://localhost:8000/auth/verify-email/${token}`

    await transproter.sendMail({
        from :`"Your App "<${process.env.EMAIL_USER}>`,
        to,
        subject :"veify your Email",
        html : getVerifyEmailTemplate(verifyLink)
    })
}