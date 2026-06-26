import {CampanyInfoModel} from "../../DB/models/settings.model.js"

export const getCompanyInfo = async () => {
  return await CompanyInfo.findOne();
};


export const updateCompanyInfo = async (data) => {
  const existingCompany = await CompanyInfo.findOne();

  if (existingCompany) {
    return await CompanyInfo.findByIdAndUpdate(existingCompany._id, data, {
      new: true,
    });
  } else {
    return await CompanyInfo.create(data);
  }
};