import { categoryModel } from "../../DB/models/category.model.js";
import slugify from "slugify";

const createCategory = async (data) => {
  const { name, filiters } = data;

  const categoryExists = await categoryModel.findOne({ name });
  if (categoryExists) {
    throw new Error("Category already exists! / هذا القسم موجود بالفعل");
  }

  const slug = slugify(name, { lower: true, strict: true }) || name.replace(/\s+/g, '-');

  const newCategory = await categoryModel.create({
    name,
    slug,
    filiters: filiters || []
  });

  return newCategory;
};

const getAllCategories = async () => {
  const categories = await categoryModel.find({});
  return categories;
};

const getCategoryById = async (id) => {
  const category = await categoryModel.findById(id);
  if (!category) {
    throw new Error("Category not found! / هذا القسم غير موجود");
  }
  return category;
};

const updateCategory = async (id, data) => {
  const { name, filters } = data;
  let updateData = { ...data };


  if (name) {
    updateData.slug = slugify(name, { lower: true, strict: true }) || name.replace(/\s+/g, '-');
  }

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedCategory) {
    throw new Error("Category not found to update! / لم يتم العثور على القسم لتحديثه");
  }

  return updatedCategory;
};

const deleteCategory = async (id) => {
  const deletedCategory = await categoryModel.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw new Error("Category not found to delete! / لم يتم العثور على القسم لمسحه");
  }
  return { message: "Category deleted successfully / تم مسح القسم بنجاح" };
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};