import express from "express";
import {
  createCheckoutSessionController,
  webhookController,
  getAllPaymentsController,
  getPaymentByIdController,
} from "./payment.controller.js";
import auth  from "../../common/middleware/auth.middleware.js";
import adminOnly  from "../../common/middleware/admin.middleware.js";

const router = express.Router();

// Webhook - بدون auth لأن Stripe هو اللي بيبعته
// router.post("/webhook", webhookController);

// Checkout Session - العميل بيعملها
router.post("/checkout", auth, createCheckoutSessionController);

// جلب الدفعات - ADMIN بس
router.get("/", auth, adminOnly, getAllPaymentsController);
router.get("/:id", auth, adminOnly, getPaymentByIdController);

export default router;