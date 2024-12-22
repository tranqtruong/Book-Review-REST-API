import { CustomError } from "../utils/customError.js";
import { verifyAccessToken } from "../services/tokenService.js";

export const checkJwt = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new CustomError("Login first!", 401);
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    next(new CustomError("Invalid or expired token.", 403));
  }
};

export const hasVendorRole = (req, res, next) => {
  if (req?.user?.role === "vendor") {
    return next();
  }
  next(new CustomError("Access deny!", 403));
};

export const isCustomerRole = (req, res, next) => {
  if (req?.user?.role === "customer") {
    return next();
  }
  next(new CustomError("Access deny!", 403));
};
