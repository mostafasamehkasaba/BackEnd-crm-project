import { PropertyModel } from "../../DB/models/property.model.js";
import configureCloudinary from "../../config/cloudinary.js";
import pagination from "../../common/utils/pagination.util.js";
const getAllproperites = async (query = {}) => {
  const { type, bookType, region, minPrice, maxPrice } = query;
  const {page,limit,skip} = pagination(query)

  const filter = {};

  if (type) filter.type = type;
  if (bookType) filter.bookType = bookType;
  if (region) filter.region = region;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const totalProperites = await PropertyModel.countDocuments(filter)
 const  totalPages = Math.ceil(totalProperites / limit)

  const properties = await PropertyModel.find(filter).skip(skip).limit(Number(limit))
  .sort({createdAt : -1})
  return {
    data :properties,
    pagination :{
      totalProperites,
      totalPages,
      currentPage : page,
      limit
    }
  };
};

const getPropertyById = async (id) => {
  const property = await PropertyModel.findById(id);
  if (!property) throw new Error("Property not found");
  return property;
};

const createProperty = async (data, files) => {
  const urls = [];

  if (files && files.length > 0) {
    const cloudinary = configureCloudinary();
    for (const file of files) {

      console.log("files:", files)
      console.log("data:", data)
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "real-estate" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer);
      });

      urls.push(result.secure_url);
    }
  }
  

  const property = await PropertyModel.create({
    ...data,
    images: urls,
  });

  return property;
};

const updateProperty = async (id, data) => {
  const property = await PropertyModel.findByIdAndUpdate(id, data, { new: true });
  if (!property) throw new Error("Property not found");
  return property;
};

const deleteProperty = async (id) => {
  const property = await PropertyModel.findByIdAndDelete(id);
  if (!property) throw new Error("Property not found");
  return { message: "Property deleted successfully" };
};

const uploadImages = async (id, files) => {
  const cloudinary = configureCloudinary();

  const property = await PropertyModel.findById(id);
  if (!property) throw new Error("Property not found");

  const urls = [];

  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "real-estate" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });

    urls.push(result.secure_url);
  }

  property.images.push(...urls);
  await property.save();

  return property;
};



const replaceImages = async (id, files) => {
  const cloudinary = configureCloudinary();
  const property = await PropertyModel.findById(id);
  if (!property) throw new Error("Property not found");

  const urls = [];
  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "real-estate" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });
    urls.push(result.secure_url);
  }

  property.images = urls;  // ← بيستبدل مش بيضيف
  await property.save();
  return property;
};


const deleteImage = async (id, imageUrl) => {
  const property = await PropertyModel.findById(id);
  if (!property) throw new Error("Property not found");

  property.images = property.images.filter(img => img !== imageUrl);

  await property.save();
  
  return property;
};

export { getAllproperites, getPropertyById, createProperty, updateProperty, deleteProperty, uploadImages,deleteImage };