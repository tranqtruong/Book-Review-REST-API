import { body, check, validationResult } from "express-validator";

export const validateCreateBook = [
  body("isbn")
    .isString()
    .matches(/^97[89]\d{9}(\d|X)$/)
    .withMessage("Invalid ISBN format."),

  body("title")
    .isString()
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters."),

  body("author")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters long."),

  body("genres")
    .isArray()
    .notEmpty()
    .withMessage("Genres must be a non-empty array.")
    .custom((genres) =>
      genres.every(
        (genre) => typeof genre === "string" && genre.trim().length > 0
      )
    )
    .withMessage("Each genre must be a non-empty string."),

  body("publishedDate").isISO8601().withMessage("Invalid published date."),

  body("copies")
    .isInt({ min: 1 })
    .withMessage(
      "Copies must be a positive integer greater than or equal to 1."
    ),

  body("price")
    .isFloat({ min: 0.01 })
    .withMessage(
      "Price must be a positive number greater than or equal to 0.01."
    ),

  body().customSanitizer((value, { req }) => {
    const validFields = [
      "isbn",
      "title",
      "author",
      "genres",
      "publishedDate",
      "copies",
      "price",
    ];
    const invalidFields = Object.keys(req.body).filter(
      (key) => !validFields.includes(key)
    );
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }
    return value;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateBook = [
  body("title")
    .isString()
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters."),

  body("author")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters long."),

  body("genres")
    .isArray()
    .notEmpty()
    .withMessage("Genres must be a non-empty array.")
    .custom((genres) =>
      genres.every(
        (genre) => typeof genre === "string" && genre.trim().length > 0
      )
    )
    .withMessage("Each genre must be a non-empty string."),

  body("publishedDate").isISO8601().withMessage("Invalid published date."),

  body("copies")
    .isInt({ min: 1 })
    .withMessage(
      "Copies must be a positive integer greater than or equal to 1."
    ),

  body("price")
    .isFloat({ min: 0.01 })
    .withMessage(
      "Price must be a positive number greater than or equal to 0.01."
    ),

  body().customSanitizer((value, { req }) => {
    const validFields = [
      "title",
      "author",
      "genres",
      "publishedDate",
      "copies",
      "price",
    ];
    const invalidFields = Object.keys(req.body).filter(
      (key) => !validFields.includes(key)
    );
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }
    return value;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateReview = [
  // Check "comment" field
  body("comment")
    .isString()
    .withMessage("Comment must be a character string")
    .notEmpty()
    .withMessage("Comments cannot be left blank")
    .isLength({ max: 500 })
    .withMessage("Comments cannot be longer than 500 characters")
    .exists()
    .withMessage("Comment is a required field"),

  // Check "rating" field
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5")
    .notEmpty()
    .withMessage("Rating cannot be empty")
    .exists()
    .withMessage("Rating is a required field"),

  // Check for any extra fields in the request body
  (req, res, next) => {
    const allowedFields = ["comment", "rating"]; // Allowed fields
    const bodyKeys = Object.keys(req.body); // Get all keys from the request body

    // Check for invalid fields
    const invalidFields = bodyKeys.filter(
      (key) => !allowedFields.includes(key)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        errors: [
          { msg: `Invalid fields: ${invalidFields.join(", ")}`, param: "body" },
        ],
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
