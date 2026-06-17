import { Router } from "express";
import {
  getAllPropertiesController,
  getPropertyByIdController,
  createPropertyController,
  updatePropertyController,
  deletePropertyController,
  uploadImagesController,deleteImageController,replaceImagesController
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

router.put("/:id/images", auth, adminOnly, upload.array("images", 10), replaceImagesController);

router.delete("/:id/images", auth, adminOnly, deleteImageController);


export default router;