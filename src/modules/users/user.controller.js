import * as CS from "./user.service.js";

export const createClientController = async (req, res) => {
  try {
    const client = await CS.createClient(req.body);

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
export const getAllClientsController = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const clients = await CS.getAllClients(page, limit);

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

export const getDebtClientsController = async (req, res) => {
  try {
    const clients = await CS.getDebtClients();

    res.status(200).json({
      message: "getDebtClients success",
      clients,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPaidClientsController = async (req, res) => {
  try {
    const clients = await CS.getPaidClients();

    res.status(200).json({
      message: "getPaidClients success",
      clients,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDashboardStatsController = async (req, res) => {
  try {
    const stats = await CS.getDashboardStats();

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteClientController = async (req, res) => {
  try {
    await CS.deleteClient(req.params.id);

    res.status(200).json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
