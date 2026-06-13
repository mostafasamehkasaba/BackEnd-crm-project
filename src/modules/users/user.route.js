import { Router } from "express";
import {
  addProperty,
  deleteProperty,
  getProperties,
  getProperty,
} from "./user.controller.js";

const router = Router();
//!get all properties
router.get("/", async (req, res, next) => {
  try {
    const result = await getProperties();
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//!get property by id
router.get("/:id", async (req, res, next) => {
  try {
    const result = await getProperty(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: "Property not found",
      });
    }
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//! create property
router.post("/addproperty", auth, adminOnly, async (req, res, next) => {
  try {
    const result = await addProperty(req.body, req.user);
    res.status(201).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//!  update property
router.put("/updateproperty/:id", auth, adminOnly, async (req, res, next) => {
  try {
    const result = await updateProperty(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({
        message: "Property not found",
      });
    }
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//!  delete property
router.delete(
  "/deleteproperty/:id",
  auth,
  adminOnly,
  async (req, res, next) => {
    try {
      const result = await deleteProperty(req.params.id);

      if (!result) {
        return res.status(404).json({
          message: "Property not found",
        });
      }
      res.status(201).json({
        message: "Property deleted successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);
export default router;
