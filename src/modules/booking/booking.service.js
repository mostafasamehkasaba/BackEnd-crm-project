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
