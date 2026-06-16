import { userPlanModel } from "../../DB/models/user.model.js";

export const createClient = async (req, res) => {
  try {
    const {
      user_id,
      property_id,
      totalPrice,
      downPayment,
      notes,
      installments,
    } = req.body;

    const client = await userPlanModel.create({
      user_id,
      property_id,
      totalPrice,
      downPayment,
      notes,
      installments,
    });

    res.status(201).json({
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllClients = async (req, res) => {
  try {
    const clients = await userPlanModel
      .find()
      .populate("user_id", "name email phone")
      .populate("property_id", "title type price ");

    res.status(200).json({
      message: "getAllClients success",
      clients,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getDebtClients = async (req, res) => {
  const clients = await userPlanModel
    .find({
      "installments.status": "PENDING",
    })
    .populate("user_id")
    .populate("property_id");

  res.status(200).json({
    message: "getDebtClients success",
    clients,
  });
};
export const getPaidClients = async (req, res) => {
  const clients = await userPlanModel
    .find({
      "installments.status": "PAID",
    })
    .populate("user_id")
    .populate("property_id");

  res.status(200).json({
    message: "getPaidClients success",
    clients,
  });
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalClients = await userPlanModel.countDocuments();

    const debtClients = await userPlanModel.countDocuments({
      "installments.status": "PENDING",
    });

    const sales = await userPlanModel.aggregate([
      { $unwind: "$installments" },
      { $match: { "installments.status": "PAID" } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$installments.amount" },
        },
      },
    ]);

    res.status(200).json({
      totalClients,
      debtClients,
      totalSales: sales[0]?.totalSales || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await userPlanModel.findById(id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    await userPlanModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
