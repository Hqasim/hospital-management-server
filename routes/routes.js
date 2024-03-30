const router = require("express").Router();
const { registerUser } = require("../controllers/userController");
const { registerValidator } = require("../validators/userValidator");

// Home route
router.get("/", (req, res) => {
  return res.json({ message: "Hospital Management System Back-end" });
});

// User routes
router.post("/user/register", registerValidator, registerUser);

module.exports = { router };
