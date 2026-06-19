import { Router } from "express";

import adminOnly from "../../common/middleware/admin.middleware.js";
import auth from "../../common/middleware/auth.middleware.js";
import {
  createClient,
  deleteClient,
  getAllClients,
  getDashboardStats,
  getDebtClients,
  getPaidClients,
} from "./user.controller.js";

const router = Router();

router.post("/addclient", auth, adminOnly, createClient);
router.get("/getAllClients", auth, adminOnly, getAllClients);
router.get("/dashboardstates", auth, adminOnly, getDashboardStats);
router.get("/debt", auth, adminOnly, getDebtClients);
router.get("/paid", auth, adminOnly, getPaidClients);
router.delete("/deleteclient/:id", auth, adminOnly, deleteClient);
export default router;
