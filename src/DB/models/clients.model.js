import mongoose, { Schema, Types } from "mongoose";

const ClientSchema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    property_id: {
      type: Types.ObjectId,
      ref: "Property",
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    downPayment: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
    },

    installments: [
      {
        amount: {
          type: Number,
          required: true,
        },

        dueDate: {
          type: Date,
          required: true,
        },

        status: {
          type: String,
          enum: ["PENDING", "PAID"],
          default: "PENDING",
        },

        paidAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const clientModel = mongoose.model("Client", ClientSchema);
