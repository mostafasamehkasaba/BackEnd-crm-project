import * as PlanService from "./installment.service.js";
import successResponse from "../../common/responses/successResponse.js";
import errorResponse from "../../common/responses/errorResponse.js";
import { HttpStatus } from "../../common/constants/httpStatus.constant.js";


export const createPlanController = async (req, res) => {
  try {
    const plan = await PlanService.createPlan(req.body);

    return successResponse(
      res,
      "Plan created successfully",
      plan,
      HttpStatus.CREATED
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};


export const getAllPlansController = async (req, res) => {
  try {
    const plans = await PlanService.getAllPlans();

    return successResponse(
      res,
      "Plans fetched successfully",
      plans,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};


export const getPlanByIdController = async (req, res) => {
  try {
    const plan = await PlanService.getPlanById(req.params.id);

    return successResponse(
      res,
      "Plan fetched successfully",
      plan,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};


export const updatePlanController = async (req, res) => {
  try {
    const plan = await PlanService.updatePlan(
      req.params.id,
      req.body
    );

    return successResponse(
      res,
      "Plan updated successfully",
      plan,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};


export const deletePlanController = async (req, res) => {
  try {
    const plan = await PlanService.deletePlan(req.params.id);

    return successResponse(
      res,
      "Plan deleted successfully",
      plan,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};