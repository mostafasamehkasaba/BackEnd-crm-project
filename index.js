import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { DBconnection } from "./src/DB/connectionDB.js";
import userRouter from "./src/modules/auth/auth.route.js";
import propertyRouter from "./src/modules/property/property.route.js";
import clientRouter from "./src/modules/clients/client.route.js";
import categoryRouter from "./src/modules/category/category.route.js";
import invoiceRouter from "./src/modules/invoices/invoice.route.js";
import InstallmentRouter from "./src/modules/InstallmentPlan/installment.route.js";
import expensesRouter from "./src/modules/expenses/expense.routes.js";
import paymentRouter from "./src/modules/payment/payment.route.js";

import { webhookController } from "./src/modules/payment/payment.controller.js";
import purchaseRouter from "./src/modules/purchase invoices/purchaseInvoices.route.js";
import companyRoutes from './src/modules/settings/setting.route.js';
import notificationRouter from "./src/modules/notifications/notifications.route.js";


const app = express();
const httpServer = createServer(app); // ✅

// ✅ Socket.io
export const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(async (req, res, next) => {
  await DBconnection();
  next();
});

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  webhookController
);

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/clients", clientRouter);
app.use("/api/category", categoryRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/installmentPlan", InstallmentRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/payments", paymentRouter);

app.use("/api/purchaseInvoices", purchaseRouter);
app.use('/api/company', companyRoutes);
app.use("/api/notifications", notificationRouter);



export default httpServer; 