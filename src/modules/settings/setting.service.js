import {CampanyInfoModel} from "../../DB/models/settings.model.js"

export const getCompanyInfo = async () => {
  return await CampanyInfoModel.find()
};


export const updateCompanyInfo = async (data) => {
  const existingCompany = await CampanyInfoModel.findOne();

  if (existingCompany) {
    return await CampanyInfoModel.findByIdAndUpdate(existingCompany._id, data, {
      new: true,
    });
  } else {
    return await CampanyInfoModel.create(data);
  }
};