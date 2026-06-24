import { Router } from "express";
import * as Expenses from "./expense.controller.js";

const router = Router();

router.post("/addexpense", Expenses.addExpense);

router.get("/", Expenses.getAllExpenses);

router.put("/:id", Expenses.updateExpense);

router.delete("/:id", Expenses.deleteExpense);

router.get("/stats", Expenses.getExpensesStats);
export default router;
