// modules/booking/booking.route.js
import { Router } from "express";
import * as BC from "./booking.controller.js";
import auth from "../../common/middleware/auth.middleware.js";
import adminOnly from "../../common/middleware/admin.middleware.js";

const router = Router();

router.post("/add", BC.createBookingController); // أي حد يقدر يحجز
router.get("/", auth, adminOnly, BC.getAllBookingsController); // الأدمن بس
router.get("/:id", auth, adminOnly, BC.getBookingByIdController);
router.patch("/:id", auth, adminOnly, BC.updateBookingStatusController);
router.delete("/:id", auth, adminOnly, BC.deleteBookingController);

export default router;