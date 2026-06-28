import { clientModel } from "../../DB/models/user.model.js";
import CryptoJS from "crypto-js";
export const createClient = async (body) => {
  const { user_id, property_id, totalPrice, downPayment, notes, installments } =
    body;

  const client = await clientModel.create({
    user_id,
    property_id,
    totalPrice,
    downPayment,
    notes,
    installments,
  });

  return client;
};
export const getAllClients = async (page, limit) => {
  console.log("getAllClients called");
  const clients = await clientModel
    .find()
    .populate("user_id", "name email phone")
    .populate("property_id", "title type price")
    .skip((page - 1) * limit)
    .limit(limit);

  const result = clients.map((client) => {
    const clientObj = client.toObject();

    // فك تشفير رقم التليفون
   if (clientObj.user_id?.phone) {
  const bytes = CryptoJS.AES.decrypt(
    clientObj.user_id.phone,
    process.env.PHONE_SECRET
  );

  const decryptedPhone = bytes.toString(CryptoJS.enc.Utf8);

  console.log("Encrypted:", clientObj.user_id.phone);
  console.log("Decrypted:", decryptedPhone);

  clientObj.user_id.phone = decryptedPhone;
}

    const installments = clientObj.installments || [];

    const total = installments.length;
    const paid = installments.filter(
      (i) => i.status === "PAID"
    ).length;

    const pending = total - paid;

    const percentage =
      total === 0 ? 0 : (paid / total) * 100;

    return {
      ...clientObj,
      installmentInfo: {
        totalInstallments: total,
        paidInstallments: paid,
        pendingInstallments: pending,
        percentage: Math.round(percentage),
      },
    };
  });

  return result;
};
export const getDebtClients = async () => {
  const clients = await clientModel
    .find({
      "installments.status": "PENDING",
    })
    .populate("user_id")
    .populate("property_id");

  return clients;
};

export const getPaidClients = async () => {
  const clients = await clientModel
    .find({
      "installments.status": "PAID",
    })
    .populate("user_id")
    .populate("property_id");

  return clients;
};

export const getDashboardStats = async () => {
  const totalClients = await clientModel.countDocuments();

  const debtClients = await clientModel.countDocuments({
    "installments.status": "PENDING",
  });

  const sales = await clientModel.aggregate([
    { $unwind: "$installments" },
    { $match: { "installments.status": "PAID" } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$installments.amount" },
      },
    },
  ]);

  return {
    totalClients,
    debtClients,
    totalSales: sales[0]?.totalSales || 0,
  };
};
export const deleteClient = async (id) => {
  const client = await clientModel.findById(id);

  if (!client) {
    throw new Error("Client not found");
  }

  return await clientModel.findByIdAndDelete(id);
};
