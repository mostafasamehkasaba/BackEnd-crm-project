import { HttpStatus } from '../constants/httpStatus.constant.js';

const successResponse = (res, message = 'تمت العملية بنجاح', data = null, statusCode = HttpStatus.OK) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export default successResponse;