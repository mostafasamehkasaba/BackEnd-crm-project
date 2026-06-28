import { Router } from "express";
import * as US from "./userProfile.controller.js";
import auth from "../../common/middleware/auth.middleware.js";
import upload from "../../common/utils/upload.util.js";

const router = Router();

router.get("/", auth, US.getProfile);
router.patch("/", auth, US.updateProfile);
router.patch("/change-password", auth, US.changePassword);
router.patch("/image", auth, upload.single("image"), US.uploadProfileImage);
export default router;
