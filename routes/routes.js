const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");

// Home route
router.get("/", (req, res) => {
  return res.json({ message: "Hospital Management System Back-end" });
});

// User routes
router.post("/user/register", registerValidator, registerUser);
router.post("/user/login", loginValidator, loginUser);

module.exports = { router };
