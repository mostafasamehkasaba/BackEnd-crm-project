import * as PaymentService from "./payment.service.js";
import successResponse from "../../common/responses/successResponse.js";
import errorResponse from "../../common/responses/errorResponse.js";
import { HttpStatus } from "../../common/constants/httpStatus.constant.js";


export const createCheckoutSessionController = async(req,res) =>{
    try{
        const session = await PaymentService.createCheckoutSession(req.body)

        return successResponse(
            res, "Checkout session created sucessfuly", 
            session,
            HttpStatus.CREATED
        )

    }catch(err){
     return  errorResponse(res,err.message,HttpStatus.BAD_REQUEST)
    }
}


export const webhookController = async(req,res)=>{
  console.log("🔥 STRIPE WEBHOOK HIT");
    const signature = req.headers["stripe-signature"];
    try{
        const result = await PaymentService.handleWebhook(req.body , signature);

        return successResponse(res,HttpStatus.OK,result)

    }catch(err){
        return errorResponse(res,err.message , HttpStatus.BAD_REQUEST)
    }
}

export const getAllPaymentsController = async (req, res) => {
  try {
    const payments = await PaymentService.getAllPayments();

    return successResponse(
      res,
      "Payments fetched successfully",
      payments,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};

export const getPaymentByIdController = async (req, res) => {
  try {
    const payment = await PaymentService.getPaymentById(req.params.id);

    return successResponse(
      res,
      "Payment fetched successfully",
      payment,
      HttpStatus.OK
    );
  } catch (err) {
    return errorResponse(res, err.message, HttpStatus.BAD_REQUEST);
  }
};