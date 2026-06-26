import { expenseModel } from "../../DB/models/expenses.model.js";

export const addExpense = async (data) => {
  return await expenseModel.create(data);
};

export const getAllExpenses = async (page, limit) => {
  const skip = (page - 1) * limit;

  const expenses = await expenseModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalExpenses = await expenseModel.countDocuments();

  return {
    currentPage: page,
    totalPages: Math.ceil(totalExpenses / limit),
    totalExpenses,
    count: expenses.length,
    expenses,
  };
};
export const getExpenseById = async (id) => {
  const expense = await expenseModel.findById(id);

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};
export const updateExpense = async (id, data) => {
  const expense = await expenseModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};
export const deleteExpense = async (id) => {
  const expense = await expenseModel.findByIdAndDelete(id);

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};
export const getExpensesStats = async () => {
  const stats = await expenseModel.aggregate([
    {
      $group: {
        _id: null,

        totalAmount: {
          $sum: "$amount",
        },

        totalPaidExpenses: {
          $sum: {
            $cond: [{ $eq: ["$status", "مدفوع"] }, 1, 0],
          },
        },

        totalPendingExpenses: {
          $sum: {
            $cond: [{ $eq: ["$status", "معلق"] }, 1, 0],
          },
        },

        suppliers: {
          $addToSet: "$supplierName",
        },
      },
    },

    {
      $project: {
        _id: 0,
        totalAmount: 1,
        totalPaidExpenses: 1,
        totalPendingExpenses: 1,
        totalSuppliers: {
          $size: "$suppliers",
        },
      },
    },
  ]);

  return (
    stats[0] || {
      totalAmount: 0,
      totalSuppliers: 0,
      totalPaidExpenses: 0,
      totalPendingExpenses: 0,
    }
  );
};
