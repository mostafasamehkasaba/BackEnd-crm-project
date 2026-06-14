import { Router } from "express";
import {
  getAllPropertiesController,
  getPropertyByIdController,
  createPropertyController,
  updatePropertyController,
  deletePropertyController,
  uploadImagesController
} from "./property.controller.js";
import auth from "../../common/middleware/auth.middleware.js";
import adminOnly from "../../common/middleware/admin.middleware.js";
import upload from "../../common/utils/upload.util.js";

const router = Router();

router.get("/", getAllPropertiesController);
router.get("/:id", getPropertyByIdController);


router.post(
  "/addproperity",
  auth,
  adminOnly,
  upload.array("images", 10),
  createPropertyController
);
router.patch("/:id", auth, adminOnly, updatePropertyController);
router.delete("/:id", auth, adminOnly, deletePropertyController);
router.post("/:id/images", auth, adminOnly, upload.array("images", 10), uploadImagesController);


export default router;