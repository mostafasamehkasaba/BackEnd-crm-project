import { HttpStatus } from '../constants/httpStatus.constant.js';

const errorResponse = (res, message = 'حدث خطأ ما في السيرفر', statusCode = HttpStatus.INTERNAL_SERVER_ERROR, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

export default errorResponse;