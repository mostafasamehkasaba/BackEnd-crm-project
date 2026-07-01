// modules/booking/booking.service.js
import { bookingModel } from "../../DB/models/booking.model.js";
import { PropertyModel } from "../../DB/models/property.model.js";

// modules/booking/booking.service.js

export const createBooking = async (data) => {
  const { property_id, name, email, phone, status } = data;

  const property = await PropertyModel.findById(property_id);
  if (!property) throw new Error("Property not found");

  if (status === "CONFIRMED" && property.status !== "available") {
    throw new Error("Property is already booked or unavailable");
  }

  const booking = await bookingModel.create({
    property_id,
    name,
    email,
    phone,
    status: status || "PENDING",  
  });


  if (status === "CONFIRMED") {
    property.status = "booked";
    await property.save();
  } 
  else {
    property.status = "available";
    await property.save();
  }

  return booking;
};

export const getAllBookings = async () => {
  return await bookingModel
    .find()
    .populate("property_id")
    .sort({ createdAt: -1 });
};

export const getBookingById = async (id) => {
  const booking = await bookingModel.findById(id).populate("property_id");
  if (!booking) throw new Error("Booking not found");
  return booking;
};

export const updateBookingStatus = async (id, status) => {
  const booking = await bookingModel.findByIdAndUpdate(
    id,
    { status , name ,email},
    { new: true }
  );
  if (!booking) throw new Error("Booking not found");
  return booking;
};

export const deleteBooking = async (id) => {
  const booking = await bookingModel.findById(id);
  if (!booking) throw new Error("Booking not found");

  await PropertyModel.findByIdAndUpdate(booking.property_id, {
    status: "available",
  });

  await bookingModel.findByIdAndDelete(id);
  return booking;
};