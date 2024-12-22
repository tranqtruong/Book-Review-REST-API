import { CustomError } from "../utils/customError.js";

// Middleware xử lý lỗi toàn cục
export const errorHandler = (err, req, res, next) => {
  // Đảm bảo lỗi là lỗi Operational (do ứng dụng tạo ra)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};
