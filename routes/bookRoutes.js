import express from "express";

import * as bookController from "../controllers/bookController.js";
import {
  checkJwt,
  hasVendorRole,
  isCustomerRole,
} from "../middlewares/authenticator.js";
import {
  validateReview,
  validateCreateBook,
  validateUpdateBook,
} from "../validators/bookValidator.js";

const router = express.Router();

router.get("/", bookController.searchBook);
router.get("/:isbn", bookController.getBookByISBN);
router.get("/:isbn/reviews", bookController.getBookReviews);
router.post(
  "/",
  checkJwt,
  hasVendorRole,
  validateCreateBook,
  bookController.createNewBook
);

router.put(
  "/:isbn",
  checkJwt,
  hasVendorRole,
  validateUpdateBook,
  bookController.updateABook
);

router.delete("/:isbn", checkJwt, hasVendorRole, bookController.removeABook);

router.post(
  "/:isbn/reviews",
  checkJwt,
  isCustomerRole,
  validateReview,
  bookController.addBookReview
);

router.patch(
  "/:isbn/reviews",
  checkJwt,
  isCustomerRole,
  bookController.updateBookReview
);

export default router;
