import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./src/modules/auth/auth.route.js";
import propertyRouter from "./src/modules/property/property.route.js";
import clientRouter from "./src/modules/clients/user.route.js";
import categoryRouter from "./src/modules/category/category.route.js";
import invoiceRouter from "./src/modules/invoices/invoice.route.js";
import InstallmentRouter from "./src/modules/InstallmentPlan/installment.route.js";
import expensesRouter from "./src/modules/expenses/expense.routes.js";

const app = express();

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

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

export default app;
