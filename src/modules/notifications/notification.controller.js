import * as NS from "./notification.service.js";
import successResponse from "../../common/responses/successResponse.js";
import errorResponse from "../../common/responses/errorResponse.js";
import { HttpStatus } from "../../common/constants/httpStatus.constant.js";

export const getAllNotificationsController = async (req, res) => {
  try {
    const notifications = await NS.getAllNotifications();
    return successResponse(res, "Notifications fetched", notifications, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const markAsReadController = async (req, res) => {
  try {
    const notification = await NS.markAsRead(req.params.id);
    return successResponse(res, "Marked as read", notification, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const markAllAsReadController = async (req, res) => {
  try {
    await NS.markAllAsRead();
    return successResponse(res, "All marked as read", null, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const getUnreadCountController = async (req, res) => {
  try {
    const count = await NS.getUnreadCount();
    return successResponse(res, "Unread count", { count }, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};