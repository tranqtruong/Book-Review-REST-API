import { findById } from "../models/userModel.js";
import { CustomError } from "../utils/customError.js";

export const getUserById = async (uid, email) => {
  const user = await findById(uid);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (user.email !== email) {
    throw new CustomError("You cannot read other users' information!", 403);
  }

  return user;
};

export const updateUser = async (uid, email, userData) => {
  const user = await getUserById(uid, email);
  Object.assign(user, { ...userData, DOB: new Date(userData.DOB) });

  return user;
};
