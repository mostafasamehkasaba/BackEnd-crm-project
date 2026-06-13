import { PropertyModel } from "../../DB/models/property.model.js";

//  get all properites
const getAllproperites = async (body) =>{
    const {type, bookType ,region , minPrice,maxPrice} = body

    const filter = {}

    if(type) filter.type =type;
    if(bookType) filter.booktype= bookType;
    if(region) filter.region = region;

    if(minPrice || maxPrice) {
        filter.price = {}
        if(minPrice) filter.minPrice.$gte =Number(minPrice);
        if(maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const properites =await PropertyModel.find(filter)
    return properites
}

// get property By Id

const getPropertyById = async (id) =>{
    const property = await PropertyModel.findById(id)
    if(!property){
        throw new Error ("Property not found")
    }
    return property
}

const createProperty = async (data) => {
  const property = await PropertyModel.create(data);
  return property;
};

const updateProperty = async (id,data) =>{
    const updateProperty = await PropertyModel.findByIdAndUpdate(id,data,{new:true})

    if(!updateProperty){
        throw new Error("Property not found");
    }
    return updateProperty
}

const deleteProperty = async (id) =>{
    const deleteProperty = await PropertyModel.findByIdAndDelete(id)
    if(!property) {
        throw new Error ("property not found")
    }
    return { message: "Property deleted successfully" };

}

export { getAllproperites, getPropertyById, createProperty, updateProperty, deleteProperty };
