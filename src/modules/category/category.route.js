import { Router } from "express";
import * as CC from "./category.controller.js"; 

const router = Router();

router.get("/",CC.getAllCategoriesController)
router.post("/addcategory",CC.createCategoryController)

router.route("/:id")
  .get(CC.getCategoryByIdController)
  .put(CC.updateCategoryController)
  .delete(CC.deleteCategoryController);

export default router;