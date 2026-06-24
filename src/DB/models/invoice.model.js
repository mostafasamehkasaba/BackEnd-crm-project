import mongoose, { Schema, Types } from "mongoose";

const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customer_id: {
      type: Types.ObjectId,
      ref: "Client",
      required: true,
    },

    property_id: {
      type: Types.ObjectId,
      ref: "Property",
      required: true,
    },

    // CASH | INSTALLMENT
    paymentType: {
      type: String,
      enum: ["CASH", "INSTALLMENT"],
      required: true,
    },

    installmentPlan_id: {
      type: Types.ObjectId,
      ref: "InstallmentPlan",
      default: null,
    },
    //  new to invoiceOnly
     parentInvoice_id: {
      type: Types.ObjectId,
      ref: "Invoice",
      default: null,
    },
      installment_id: {
      type: Types.ObjectId,
      default: null,
    },
    // Snapshot من خطة التقسيط
    months: Number,

    downPaymentPercentage: Number,

    monthlyAmount: Number,

    // أسعار
    basePrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PAID", "PARTIAL", "UNPAID"],
      default: "UNPAID",
    },

    notes: String,
  },
  {
    timestamps: true,
  }
);

export const invoiceModel = mongoose.model("Invoice", invoiceSchema);