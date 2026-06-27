import { Router } from "express";
import * as PI from "./purchaseInvoices.controller.js";

const router = Router();

router.post("/", PI.createPurchaseInvoice);

router.get("/", PI.getAllPurchaseInvoices);

router.put("/:id", PI.updatePurchaseInvoice);

router.delete("/:id", PI.deletePurchaseInvoice);
router.get("/stats", PI.getPurchaseInvoicesStats);

router.get("/:id", PI.getPurchaseInvoiceById);

export default router;
