import bcrypt from "bcryptjs";
import { Usermodel } from "../../DB/models/auth.model.js";
import CryptoJS from "crypto-js";
import { generateAccessToken, generateRefreshToken } from "../../common/utils/jwt.js";
import Token from "../../DB/models/token.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/sendEmail.js";
const register = async (data) => {
  const { name, email, password, phone, confirmPassword } = data;

  if (password !== confirmPassword) {
    throw new Error("password doesnt match confirm password");
  }

  const checkEmail = await Usermodel.findOne({ email });
  if (checkEmail) {
    throw new Error("user already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const hashedPhone = CryptoJS.AES.encrypt(phone, "phoneKey").toString();

  const user = await Usermodel.create({
    name,
    email,
    phone: hashedPhone,
    password: hashedPassword,
  });

  const token = jwt.sign(
  { id: user._id.toString() },
  process.env.EMAIL_SECRET,
  { expiresIn: "1h" }
);


    await sendEmail(user.email, token);

  return {
    message: "user created successfully",
    user,
  };
};

const login = async (data) => {
  const { email, password } = data;

  const user = await Usermodel.findOne({ email });
  if (!user) {
    throw new Error("user doesnt exists must be register");
  }

  if (user.isConfirmEmail === false || !user.isConfirmEmail) {
    throw new Error("please verify your email frist ");
}
console.log("Password from request:", password);
console.log("Password from DB:", user.password);
const isPasswordMatched = bcrypt.compareSync(
  password.trim(),
  user.password
);
    
  if (!isPasswordMatched) {
    const error = new Error("wrong password");
    error.status = 401;
    throw error;
  }

  console.log("Matched:", isPasswordMatched);

  const payload = {
    id: user._id,
    role: user.role,
  };



const accessToken = generateAccessToken(payload);


 const refreshToken = generateRefreshToken(payload);

await Token.deleteOne({ user: user._id });

await Token.create({
  token: refreshToken,
  user: user._id,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});

  return {
    user: {
      name: user.name,
      email: user.email,
       role : user.role,
    },
    accessToken,
    refreshToken,
  };
};


const refreshToken =async (token)=>{
  const savedToken = await Token.findOne({token})

  if(!savedToken){
    throw new Error("Invaild refreshToken")

  }

  if(savedToken.expiresAt < new Date()){
    await Token.deleteOne({token});
    throw new Error ('Refresh token expired ')
  }

  const decoded = jwt.verify(token ,process.env.JWT_REFRESH_SECRET)


  const accessToken= generateAccessToken({
    id : decoded.id,
    role :decoded.role
  })

  return {accessToken}

}



const logout = async (token) => {
  await Token.deleteOne({ token });
  return { message: "logged out successfully" };
};

const verifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

    const user = await Usermodel.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isConfirmEmail) {
      return { message: "Email already verified" };
    }

    user.isConfirmEmail = true;
    await user.save();

    return { message: "Email verified successfully" };

  } catch (err) {
    console.log("VERIFY ERROR:", err.message);

    if (err.name === "TokenExpiredError") {
      throw new Error("Verification link expired, please resend email");
    }

    throw err;
  }
};
export { register, login, refreshToken, logout,verifyEmail };
