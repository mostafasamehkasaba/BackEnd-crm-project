import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { DBconnection } from "./src/DB/connectionDB.js";
import userRouter from "./src/modules/auth/auth.route.js";
import propertyRouter from "./src/modules/property/property.route.js";

import clientRouter from "./src/modules/clients/user.route.js";
import categoryRouter from "./src/modules/category/category.route.js";
import invoiceRouter from "./src/modules/invoices/invoice.route.js";
import InstallmentRouter from "./src/modules/InstallmentPlan/installment.route.js";
import expensesRouter from "./src/modules/expenses/expense.routes.js";
import paymentRouter from "./src/modules/payment/payment.route.js";

const app = express();

// payment
app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }), // raw bytes
  paymentRouter,
);
app.use(express.json());

// ✅ اتصل بالـ DB قبل أي request
app.use(async (req, res, next) => {
  await DBconnection();
  next();
});

app.get("/", (req, res) => {
  res.send("test");
});

app.use("/api/auth", userRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/clients", clientRouter);
app.use("/api/category", categoryRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/installmentPlan", InstallmentRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/payments", paymentRouter);

export default app;
