const express = require("express");
const UserController = require("../controllers/userController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");

const router = express.Router();

router.post("/register", registerValidator, UserController.register);
router.post("/login", loginValidator, UserController.login);

module.exports = router;
