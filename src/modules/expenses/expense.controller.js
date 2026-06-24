import * as expenseService from "./expense.service.js";

export const addExpense = async (req, res, next) => {
  const result = await expenseService.addExpense(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllExpenses = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const result = await expenseService.getAllExpenses(
    Number(page),
    Number(limit),
  );

  res.status(200).json({
    success: true,
    ...result,
  });
};

export const updateExpense = async (req, res, next) => {
  const result = await expenseService.updateExpense(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const deleteExpense = async (req, res, next) => {
  await expenseService.deleteExpense(req.params.id);

  res.status(200).json({
    success: true,
    message: "Expense deleted successfully",
  });
};
export const getExpensesStats = async (req, res, next) => {
  const stats = await expenseService.getExpensesStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
};
