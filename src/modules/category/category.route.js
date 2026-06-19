import { Router } from "express";
import * as CC from "./category.controller.js"; 

const router = Router();

router.route("/")
  .post(CC.createCategoryController)
  .get(CC.getAllCategoriesController);

router.route("/:id")
  .get(CC.getCategoryByIdController)
  .put(CC.updateCategoryController)
  .delete(CC.deleteCategoryController);

export default router;