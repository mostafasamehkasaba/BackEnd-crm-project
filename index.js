import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { DBconnection } from "./src/DB/connectionDB.js";
import userRouter from "./src/modules/auth/auth.route.js";
import propertyRouter from "./src/modules/property/property.route.js";
import clientRouter from "./src/modules/clients/client.route.js";
import categoryRouter from "./src/modules/category/category.route.js";
import invoiceRouter from "./src/modules/invoices/invoice.route.js";
import InstallmentRouter from "./src/modules/InstallmentPlan/installment.route.js";

const app = express();
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

export default app;