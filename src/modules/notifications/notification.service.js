import { notificationModel } from "../../DB/models/notification.model.js";

// إنشاء إشعار جديد
export const createNotification = async (data) => {
  const notification = await notificationModel.create(data);
  return notification;
};

// جلب كل الإشعارات
export const getAllNotifications = async () => {
  return await notificationModel.find().sort({ createdAt: -1 });
};

// تعليم إشعار كمقروء
export const markAsRead = async (id) => {
  return await notificationModel.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
};

// تعليم كل الإشعارات كمقروءة
export const markAllAsRead = async () => {
  return await notificationModel.updateMany(
    { isRead: false },
    { isRead: true }
  );
};

// عدد الإشعارات الغير مقروءة
export const getUnreadCount = async () => {
  return await notificationModel.countDocuments({ isRead: false });
};