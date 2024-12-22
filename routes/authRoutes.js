import express from "express";

import { userLogin } from "../controllers/authController.js";
import { validateLogin } from "../validators/authValidator.js";

const router = express.Router();

router.post("/login", validateLogin, userLogin);

export default router;
