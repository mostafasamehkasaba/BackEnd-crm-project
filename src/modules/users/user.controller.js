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
export const addProperty = async (props) => {
  return await propertyModel.create(props);
};
//!  update property
export const updateProperty = async (props) => {
  return await propertyModel.findByIdAndUpdate(props);
};
//!  delete property
export const deleteProperty = async (id) => {
  return await propertyModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};
