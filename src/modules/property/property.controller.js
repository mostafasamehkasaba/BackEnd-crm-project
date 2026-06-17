import * as PS from "./property.service.js";
import successResponse from "../../common/responses/successResponse.js";
import errorResponse from "../../common/responses/errorResponse.js";
import { HttpStatus } from "../../common/constants/httpStatus.constant.js";

const getAllPropertiesController = async (req, res) => {
  try {
    const properties = await PS.getAllproperites(req.query);
    // بما إن الـ service بيرجع { data, pagination }، بنباصي الـ properties كلها كـ data للـ response
    return successResponse(res, "properties fetched successfully", properties, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, "failed to get allProperties", HttpStatus.BAD_REQUEST, err.message);
  }
};

const getPropertyByIdController = async (req, res) => {
  try {
    const property = await PS.getPropertyById(req.params.id);
    return successResponse(res, "property fetched successfully", property, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.NOT_FOUND);
  }
};

const createPropertyController = async (req, res) => {
  try {
    const property = await PS.createProperty(req.body, req.files);
    return successResponse(res, "Property created successfully", property, HttpStatus.CREATED);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const updatePropertyController = async (req, res) => {
  try {
    const property = await PS.updateProperty(req.params.id, req.body);
    return successResponse(res, "Property updated successfully", property, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const deletePropertyController = async (req, res) => {
  try {
    const result = await PS.deleteProperty(req.params.id);
    return successResponse(res, "Property deleted successfully", result, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.NOT_FOUND);
  }
};

const uploadImagesController = async (req, res) => {
  try {
    const property = await PS.uploadImages(req.params.id, req.files);
    return successResponse(res, "Image uploaded successfully", property, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const replaceImagesController = async (req, res) => {
  try {
    const property = await PS.replaceImages(req.params.id, req.files);
    return successResponse(res, "Images replaced successfully", property, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const deleteImageController = async (req, res) => {
  try {
    const property = await PS.deleteImage(req.params.id, req.body.imageUrl);
    return successResponse(res, "Image deleted successfully", property, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export {
  getAllPropertiesController,
  getPropertyByIdController,
  createPropertyController,
  updatePropertyController,
  deletePropertyController,
  uploadImagesController,
  replaceImagesController,
  deleteImageController
};