import * as PI from "./purchaseInvoices.service.js";

export const createPurchaseInvoice = async (req, res, next) => {
  const result = await PI.createPurchaseInvoices(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllPurchaseInvoices = async (req, res, next) => {
  const result = await PI.getAllPurchaseInvoices();

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const updatePurchaseInvoice = async (req, res, next) => {
  const result = await PI.updatePurchaseInvoices(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const deletePurchaseInvoice = async (req, res, next) => {
  const result = await PI.deletePurchaseInvoices(req.params.id);

  res.status(200).json({
    success: true,
    message: "Purchase invoice deleted successfully",
    data: result,
  });
};
export const getPurchaseInvoiceById = async (req, res, next) => {
  const result = await PI.getPurchaseInvoiceById(req.params.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};
export const getPurchaseInvoicesStats = async (req, res, next) => {
  const stats = await PI.getPurchaseInvoicesStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
};
