import { purchaseInvoiceModel } from "../../DB/models/purchaseInvoices.model.js";

export const createPurchaseInvoices = async (data) => {
  return await purchaseInvoiceModel.create(data);
};

export const getAllPurchaseInvoices = async (page, limit) => {
  const skip = (page - 1) * limit;

  const purchaseInvoices = await purchaseInvoiceModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPurchaseInvoices = await purchaseInvoiceModel.countDocuments();

  return {
    currentPage: page,
    totalPages: Math.ceil(totalPurchaseInvoices / limit),
    totalPurchaseInvoices,
    count: purchaseInvoices.length,
    purchaseInvoices,
  };
};

export const updatePurchaseInvoices = async (id, data) => {
  const invoice = await purchaseInvoiceModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!invoice) {
    throw new Error("Purchase invoice not found");
  }

  return invoice;
};

export const deletePurchaseInvoices = async (id) => {
  const invoice = await purchaseInvoiceModel.findByIdAndDelete(id);

  if (!invoice) {
    throw new Error("Purchase invoice not found");
  }

  return invoice;
};
