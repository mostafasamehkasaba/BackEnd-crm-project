import * as US from "./userProfile.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const result = await US.getProfile(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const result = await US.updateProfile(req.user.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const result = await US.changePassword(req.user.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
export const uploadProfileImage = async (req, res) => {
  const result = await US.uploadProfileImage(req.user._id, req.file);

  res.status(200).json({
    success: true,
    data: result,
  });
};
