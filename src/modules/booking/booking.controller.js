// modules/booking/booking.controller.js
import * as BS from "./booking.service.js";
import successResponse from "../../common/responses/successResponse.js";
import errorResponse from "../../common/responses/errorResponse.js";
import { HttpStatus } from "../../common/constants/httpStatus.constant.js";

export const createBookingController = async (req, res) => {
  try {
    const booking = await BS.createBooking(req.body);
    return successResponse(res, "Booking created successfully", booking, HttpStatus.CREATED);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await BS.getAllBookings();
    return successResponse(res, "Bookings fetched successfully", bookings, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const getBookingByIdController = async (req, res) => {
  try {
    const booking = await BS.getBookingById(req.params.id);
    return successResponse(res, "Booking fetched successfully", booking, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const updateBookingStatusController = async (req, res) => {
  try {
    const booking = await BS.updateBookingStatus(req.params.id, req.body);
    return successResponse(res, "Booking status updated", booking, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const deleteBookingController = async (req, res) => {
  try {
    await BS.deleteBooking(req.params.id);
    return successResponse(res, "Booking deleted successfully", null, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};