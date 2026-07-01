import * as US from "./auth.service.js";
import successResponse from "../../common/responses/successResponse.js";
import errorResponse from "../../common/responses/errorResponse.js";
import { HttpStatus } from "../../common/constants/httpStatus.constant.js";

const registerController = async (req, res, next) => {
  try {
    const result = await US.register(req.body);
    return successResponse(res, "تم إنشاء الحساب بنجاح", result, HttpStatus.CREATED);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await US.login(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const message = user.role === "ADMIN" ? "Admin logged in sucessfuly" : "user Logged sucessfuly ";

    const responseData = {
      user,
      accessToken,
      refreshToken
    };

    return successResponse(res, message, responseData, HttpStatus.OK);

  } catch (err) {
    return errorResponse(res, "error in email or password", HttpStatus.BAD_REQUEST, err.message);
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await US.refreshToken(refreshToken);
    return successResponse(res, "تم تجديد التوكن بنجاح", result, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.UNAUTHORIZED);
  }
};

const logoutController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await US.logout(refreshToken);
    return successResponse(res, "تم تسجيل الخروج بنجاح", result, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const verifiyEmailController = async (req, res) => {
  try {
    const result = await US.verifyEmail(req.params.token);
    return successResponse(res, "تم تفعيل الإيميل بنجاح", result, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};


export const getUsers = async (req, res) => {
  console.log("🔥 USERS ROUTE HIT");

  return res.status(200).json({
    ok: true,
    message: "route works",
  });
};

export { 
  registerController, 
  loginController, 
  refreshTokenController, 
  logoutController, 
  verifiyEmailController 
};