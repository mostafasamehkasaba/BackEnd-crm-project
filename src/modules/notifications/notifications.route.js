import { Router } from "express";
import * as NC from "./notification.controller.js";
import auth from "../../common/middleware/auth.middleware.js";

const router = Router();

router.get("/", auth, NC.getAllNotificationsController);
router.get("/unread-count", auth, NC.getUnreadCountController);
router.patch("/:id/read", auth, NC.markAsReadController);
router.patch("/mark-all-read", auth, NC.markAllAsReadController);

export default router;