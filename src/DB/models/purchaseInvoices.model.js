import mongoose, { Schema } from "mongoose";

const purchaseInvoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["مدفوع", "معلق"],
      default: "معلق",
    },
  },
  {
    timestamps: true,
  },
);

export const purchaseInvoiceModel = mongoose.model(
  "PurchaseInvoice",
  purchaseInvoiceSchema,
);
