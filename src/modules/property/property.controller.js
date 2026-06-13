import * as PS from "./property.service.js";

const getAllPropertiesController = async (req,res) =>{
    try{
            const properites = await PS.getAllproperites(req.body)
            res.status(200).json({message : "properites fetched sucessfuly" ,count :properites.length,data : properites })
    }catch(err){
        res.status(400).json({message : "failed to get allProperites", error: err.message})
    }
}


const getPropertyByIdController= async (req,res) =>{
try{
    const property = await PS.getPropertyById(req.params.id)
    res.status(200).json({message : "property fetched sucessfuly" ,data :property})

}   
catch(err){
    res.status(404).json({message : err.message})
}
}


const createPropertyController = async (req, res) => {
  try {
    const property = await PS.createProperty(req.body);
    res.status(201).json({
      message: "Property created successfully",
      data: property,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePropertyController = async (req, res) => {
  try {
    const property = await PS.updateProperty(req.params.id, req.body);
    res.status(200).json({
      message: "Property updated successfully",
      data: property,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deletePropertyController = async (req, res) => {
  try {
    const result = await PS.deleteProperty(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export {
  getAllPropertiesController,
  getPropertyByIdController,
  createPropertyController,
  updatePropertyController,
  deletePropertyController,
};