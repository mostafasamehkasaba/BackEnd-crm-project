import { installMentPlanModel } from "../../DB/models/installmentPlan.model.js";


export const createPlan = async (data) => {
  const plan = await installMentPlanModel.create(data);
  return plan;
};




export const getAllPlans = async () => {
  const plans = await installMentPlanModel.find();
  return plans;
};



export const getPlanById = async (id) => {
  const plan = await installMentPlanModel.findById(id);
  if (!plan) throw new Error("Plan not found");
  return plan;
};


export const updatePlan = async (id, data) => {
  const plan = await installMentPlanModel.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!plan) throw new Error("Plan not found");

  return plan;
};

export const deletePlan = async (id) => {
  const plan = await installMentPlanModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!plan) throw new Error("Plan not found");

  return plan;
};


