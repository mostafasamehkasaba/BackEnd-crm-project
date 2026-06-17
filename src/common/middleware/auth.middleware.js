import jwt from "jsonwebtoken";
import { Usermodel } from "../../DB/models/auth.model.js";
import errorResponse from "../responses/errorResponse.js";
import { HttpStatus } from "../constants/httpStatus.constant.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return errorResponse(res, "Unauthorized - No token provided", HttpStatus.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usermodel.findById(decoded.id);

    if (!user) {
      return errorResponse(res, "User not found", HttpStatus.NOT_FOUND);
    }

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, "Invalid or expired token", HttpStatus.UNAUTHORIZED, err.message);
  }
};

export default auth;