import { Router } from "express";
import * as PC from "./installment.controller.js";

const router = Router();

router.post("/addInstallmentPlan", PC.createPlanController);
router.get("/", PC.getAllPlansController);
router.get("/:id", PC.getPlanByIdController);
router.put("/:id", PC.updatePlanController);
router.delete("/:id", PC.deletePlanController);

export default router;