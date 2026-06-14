import { Router } from "express";
import {
  getAllPropertiesController,
  getPropertyByIdController,
  createPropertyController,
  updatePropertyController,
  deletePropertyController,
} from "./property.controller.js";
import auth from "../../common/middleware/auth.middleware.js";
import adminOnly from "../../common/middleware/admin.middleware.js";

const router = Router();

router.get("/", getAllPropertiesController);
router.get("/:id", getPropertyByIdController);


router.post("/addproperity", auth, adminOnly, createPropertyController);
router.put("/:id", auth, adminOnly, updatePropertyController);
router.delete("/:id", auth, adminOnly, deletePropertyController);

export default router;