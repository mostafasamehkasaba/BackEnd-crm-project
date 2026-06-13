import { propertyModel } from "../../DB/models/property.model.js";
//!get all properties
export const getProperties = async () => {
  return await propertyModel.find();
};
//!get property by id
export const getProperty = async (id) => {
  return await propertyModel.findById(id);
};
//! create property
export const addProperty = async (data, user) => {
  return await propertyModel.create({
    ...data,
    user_id: user._id,
  });
};
//!  update property
export const updateProperty = async (id, data) => {
  return await propertyModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
//!  delete property
export const deleteProperty = async (id) => {
  return await propertyModel.findByIdAndDelete(id);
};
