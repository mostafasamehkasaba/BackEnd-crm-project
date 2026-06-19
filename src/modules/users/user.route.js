import { Router } from "express";

import adminOnly from "../../common/middleware/admin.middleware.js";
import auth from "../../common/middleware/auth.middleware.js";
import * as US from "./user.controller.js";

const router = Router();

router.post("/addclient", auth, adminOnly, US.createClientController);
router.get("/getAllClients", US.getAllClientsController);
router.get("/dashboardstates", auth, adminOnly, US.getDashboardStatsController);
router.get("/debt", auth, adminOnly, US.getDebtClientsController);
router.get("/paid", auth, adminOnly, US.getPaidClientsController);
router.delete("/deleteclient/:id", auth, adminOnly, US.deleteClientController);
export default router;
