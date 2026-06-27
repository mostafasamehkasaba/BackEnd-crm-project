import { Router } from "express";
import * as IC from "./invoice.cotroller.js";

const router = Router();

router.post("/addInvoice", IC.createInvoiceCotroller);

router.get("/", IC.getAllInvoicesController);

router.get("/:id", IC.getInvoiceByIdController);

router.patch("/:id", IC.updateInvoiceController);
router.get("/customer/:customer_id", IC.getInvoiceByCustomerIdController);

router.delete("/:id", IC.deleteInvoiceController);



export default router;