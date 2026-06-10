import bcrypt from "bcryptjs";
import { Usermodel } from "../../DB/models/auth.model.js";
import CryptoJS from "crypto-js"
import { generateAcessToekn,generateRefreshToken } from "../../common/utils/jwt.js";
const register = async(data)=>{
    const {name ,email,password,phone,confirmPassword} = data

    if(password !== confirmPassword ){
        throw new Error("password doesnt match confirm password")
    }

    const checkEmail = await Usermodel.findOne({email})

    if(checkEmail){
        throw new Error("user already exists")
    }

    // hashPassword 

    const hashedPassword = bcrypt.hashSync(password,10)

    // hash phone
    const hashedPhone = await CryptoJS.AES.encrypt(phone, "phoneKey").toString()

    const user = await Usermodel.create({
        name,
        email,
        phone:hashedPhone,
        password:hashedPassword
    })

    return {
        message : "user created sucessfuly",
        user
    }

}


const login = async(data) =>{
    const {email ,password}= data

    const user= await Usermodel.findOne({email})

    if(!user){
        throw new Error("user doesnt exists must be register")
    }
    
    const isPasswordMatched = await bcrypt.compare(password, user.password)

     if(!isPasswordMatched){
        const error = new Error("wrong password");
        error.status = 401;
        throw error;
    }

    const payload = {
        id: user._id,
        role: user.role,
  };
    const asccessToken = generateAcessToekn(payload)
    const RefreshToken = generateRefreshToken(payload)

    return {
        user :{
            name :user.name,
        email : user.email,
       
        },
         asccessToken,
        RefreshToken
    }

}
export {register,login}