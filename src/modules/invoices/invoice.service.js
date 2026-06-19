import { installMentPlanModel } from "../../DB/models/installmentPlan.model.js";
import { invoiceModel } from "../../DB/models/invoice.model.js";
import { PropertyModel } from "../../DB/models/property.model.js";
import { clientModel } from "../../DB/models/clients.model.js";

const Createinvoice = async (data) => {
  const {
    customer_id,
    property_id,
    installmentPlan_id,
    basePrice,
    discount = 0,
    tax = 0,
    paymentType
  } = data;

  // 1. user
  const userExist = await clientModel.findById(customer_id);
  if (!userExist) throw new Error("user is notExist");

  // 2. property
  const property = await PropertyModel.findById(property_id);
  if (!property) throw new Error("Property not found");

  if (property.status === "SOLD" || property.status === "RENTED") {
    throw new Error("Property is already sold or rented");
  }

  // 3. calculations
  const totalAmount = basePrice - discount + tax;

  let paidAmount = 0;
  let remainingAmount = totalAmount;

  let months = null;
  let downPaymentPercentage = 0;
  let monthlyAmount = 0;

  let status = "UNPAID";

  // CASH
  if (paymentType === "CASH") {
    paidAmount = totalAmount;
    remainingAmount = 0;
  }

  // INSTALLMENT
  if (paymentType === "INSTALLMENT") {
    const plan = await installMentPlanModel.findById(installmentPlan_id);
    if (!plan) throw new Error("InstallmentPlan not found");

    months = plan.months;
    downPaymentPercentage = plan.downPaymentPercentage;

    const downPayment = (totalAmount * downPaymentPercentage) / 100;

    paidAmount = downPayment;
    remainingAmount = totalAmount - downPayment;

    monthlyAmount = remainingAmount / months;
  }

  // status
  if (remainingAmount === 0) {
    status = "PAID";
  } else if (paidAmount > 0) {
    status = "PARTIAL";
  }

  // 4. create invoice
  const invoice = await invoiceModel.create({
    invoiceNumber: `INV-${Date.now()}`,

    customer_id: userExist._id,
    property_id,

    paymentType,
    installmentPlan_id: installmentPlan_id || null,

    basePrice,
    discount,
    tax,

    totalAmount,
    paidAmount,
    remainingAmount,

    months,
    downPaymentPercentage,
    monthlyAmount,

    status
  });

  return invoice;
};

export const getAllInvoices = async () => {
  const invoices = await invoiceModel
    .find()
    .populate("customer_id")
    .populate("property_id")
    .populate("installmentPlan_id");

  return invoices;
};

export const getInvoiceById = async (id) => {
  const invoice = await invoiceModel
    .findById(id)
    .populate("customer_id")
    .populate("property_id")
    .populate("installmentPlan_id");

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  return invoice;
};

export const updateInvoice = async (id, data) => {
  const invoice = await invoiceModel.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  return invoice;
};

export const deleteInvoice = async (id) => {
  const invoice = await invoiceModel.findByIdAndDelete(id);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  return invoice;
};


export {
    Createinvoice,
    
}