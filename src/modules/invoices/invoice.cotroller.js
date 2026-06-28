import { HttpStatus } from "../../common/constants/httpStatus.constant.js"
import errorResponse from "../../common/responses/errorResponse.js"
import successResponse from "../../common/responses/successResponse.js"
import * as IS from "./invoice.service.js"

const createInvoiceCotroller = async (req,res)=>{
   try{
         const Invoice = await IS.Createinvoice(req.body)
        return successResponse(res,"invoce created sucessfuly ", Invoice , HttpStatus.CREATED)
   }catch(err){
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
   }
}
export const getAllInvoicesController = async (req, res) => {
  try {
    const invoices = await IS.getAllInvoices();

    return successResponse(
      res,
      "Invoices fetched successfully",
      invoices,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};


export const getInvoiceByIdController = async (req, res) => {
  try {
    const invoice = await IS.getInvoiceById(req.params.id);

    return successResponse(
      res,
      "Invoice fetched successfully",
      invoice,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const updateInvoiceController = async (req, res) => {
  try {
    const invoice = await IS.updateInvoice(
      req.params.id,
      req.body
    );

    return successResponse(
      res,
      "Invoice updated successfully",
      invoice,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const deleteInvoiceController = async (req, res) => {
  try {
    await IS.deleteInvoice(req.params.id);

    return successResponse(
      res,
      "Invoice deleted successfully",
      null,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const getInvoiceByCustomerIdController = async (req, res) => {
  try {
    const invoice = await IS.getInvoiceByCustomerId(req.params.customer_id);
    return successResponse(res, "Invoice fetched successfully", invoice, HttpStatus.OK);
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};


export {
    createInvoiceCotroller
}