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
    const { accessToken , refreshToken, user } = await US.login(req.body);

    // Access Token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    // Refresh Token cookie
    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: user.role === "ADMIN" ? "Admin logged in sucessfuly" : "user Logged sucessfuly ",
      user,
     
      accessToken,
      refreshToken
    });

  } catch (err) {
    res.status(400).json({
      message: "error in email or password",
      error: err.message,
    });
  }
};
const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await US.refreshToken(refreshToken);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const logoutController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await US.logout(refreshToken);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifiyEmailController =async(req,res) =>{
  try{
    const result = await US.verifyEmail(req.params.token)
    res.status(200).json(result)
  }catch(err){
    res.status(400).json(({message : err.message}))
  }
}

export { registerController, loginController, refreshTokenController, logoutController ,verifiyEmailController};