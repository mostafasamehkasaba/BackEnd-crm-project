import * as US from "./auth.service.js";

const registerController = async (req, res, next) => {
  try {
    const result = await US.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { asccessToken, RefreshToken, user } = await US.login(req.body);

    // Access Token cookie
    res.cookie("asccessToken", asccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    // Refresh Token cookie
    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "user logged successfully",
      user,
      asccessToken,
      RefreshToken
    });

  } catch (err) {
    res.status(400).json({
      message: "error in email or password",
      error: err.message,
    });
  }
};

export { registerController, loginController };