import * as categoryService from "./category.service.js";
import successResponse from "../../common/responses/successResponse.js";
import errorResponse from "../../common/responses/errorResponse.js";
import { HttpStatus } from "../../common/constants/httpStatus.constant.js";

const createCategoryController = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return successResponse(res, "Category created successfully", category, HttpStatus.CREATED);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return successResponse(res, "Categories fetched successfully", categories, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, "Failed to get all categories", HttpStatus.BAD_REQUEST, err.message);
  }
};

const getCategoryByIdController = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    return successResponse(res, "Category fetched successfully", category, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.NOT_FOUND);
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return successResponse(res, "Category updated successfully", category, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    return successResponse(res, "Category deleted successfully", result, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.NOT_FOUND);
  }
};

export {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController
};