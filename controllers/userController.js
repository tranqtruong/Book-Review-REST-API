import * as userService from "../services/userService.js";

export const getUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const email = req.user.username;
    const user = await userService.getUserById(uid, email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const email = req.user.username;
    const userData = req.body;
    const user = await userService.updateUser(uid, email, userData);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const buyBook = async (req, res, next) => {
  try {
    const { isbn } = req.params;
    const email = req.user.username;
    await userService.addPurchasedBook(email, isbn);
    res.status(201).json({ message: "ok" });
  } catch (error) {
    next(error);
  }
};
