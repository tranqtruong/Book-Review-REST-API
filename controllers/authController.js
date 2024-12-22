import * as tokenService from "../services/tokenService.js";
import { authenticateUser } from "../services/authService.js";
import { CustomError } from "../utils/customError.js";

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (!user) {
      throw new CustomError("Invalid email or password.", 401);
    }

    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};
