import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    expenseInvoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    expenseDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    wallet: {
      type: String,
      required: true,
      trim: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["مدفوع", "معلق"],
      default: "مدفوع",
    },
  },
  {
    timestamps: true,
  },
);

export const expenseModel = mongoose.model("Expense", expenseSchema);
