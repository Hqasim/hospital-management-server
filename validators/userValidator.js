const { body } = require("express-validator");

exports.registerValidator = [
  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("first_name").not().isEmpty().withMessage("First name is required"),
  body("last_name").not().isEmpty().withMessage("Last name is required"),
];

exports.loginValidator = [
  body("email").not().isEmpty().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
