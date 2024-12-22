// utils/customError.js
export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Đảm bảo rằng name của lỗi là tên class, không phải tên của lớp cha Error
    this.name = this.constructor.name;

    // Lưu lại stack trace trong môi trường phát triển
    Error.captureStackTrace(this, this.constructor);

    // Đảm bảo lỗi là lỗi "operational" (lỗi ứng dụng, không phải lỗi hệ thống)
    this.isOperational = true;
  }
}
