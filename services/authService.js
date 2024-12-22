import { getUserByEmail } from "../models/userModel.js";

export const authenticateUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    return password === user.password ? user : false;
  } catch (error) {
    return false;
  }
};
