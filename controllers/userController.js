const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const registerUser = async (req, res) => {
  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, first_name, last_name } = req.body;

  try {
    // Check if the user already exists
    const existing_user = await UserModel.findOne({ where: { email: email } });
    if (existing_user !== null) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // Create a new user
    const created_user = await UserModel.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    // Respond with success
    res
      .status(201)
      .json({ message: "User registered sucessfully", created_user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { registerUser };
