import jwt from "jsonwebtoken";
import { Usermodel } from "../../DB/models/auth.model.js";

const auth = async (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
           return res.status(401).json({message : "UNAuthorization"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await Usermodel.findById(decoded.id)

        if(!user){
            return res.status(400).json({message :"user not found"})
        }

        req.user = user
        next()

    }catch(err){
         return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default auth