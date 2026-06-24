import mongoose, { Schema, Types } from "mongoose";

const paymentSchema = new Schema(
  {
    invoice_id: {
      type: Types.ObjectId,
      ref: "Invoice",
      required: true,
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

    installment_id: {
      type: Types.ObjectId,
      default: null,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["STRIPE", "CASH"],
      required: true,
    },

    // من Stripe لو دفع أونلاين
    transactionId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const paymentModel = mongoose.model("Payment", paymentSchema);