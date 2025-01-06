import express from "express";

import { checkJwt, isCustomerRole } from "../middlewares/authenticator.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/:uid", checkJwt, isCustomerRole, userController.getUser);
router.patch("/:uid", checkJwt, isCustomerRole, userController.updateUserInfo);
router.post("/orders/:isbn", checkJwt, isCustomerRole, userController.buyBook);

export default router;
