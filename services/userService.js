import { findById, getUserByEmail } from "../models/userModel.js";
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

export const addPurchasedBook = async (email, isbn) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new CustomError("User not found!", 404);
  }

  const isBookExist = user?.purchasedBooks.some((_isbn) => _isbn === isbn);
  if (isBookExist) {
    throw new CustomError("you have already bought it.", 403);
  }

  user.purchasedBooks.push(isbn);
};
