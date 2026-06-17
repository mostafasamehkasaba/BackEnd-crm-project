import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { getVerifyEmailTemplate } from "./emailTemplete.js"; // تأكد من اسم الفولدر والملف صح

const transproter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // ضفنا الـ trim() عشان لو في أي مسافة فاضية في الـ env تتشال ومتبوظش الـ password
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASS?.trim() 
    },
});

export const sendEmail = async (to, token) => {
    try {
      const verifyLink = `http://localhost:8000/api/auth/verify-email/${encodeURIComponent(token)}`;

        const info = await transproter.sendMail({
            from: `"Real Estate CRM" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Verify your Email",
            html: getVerifyEmailTemplate(verifyLink)
        });
        
        console.log("✅ Email sent successfully! MessageID:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Gmail Error: ", error.message);
        throw new Error("Failed to send verification email: " + error.message);
    }
};