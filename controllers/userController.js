const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");

const User = require("../models/user");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

class UserController {
  static async register(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(password, salt);

      // Create a new user
      const userId = await User.createUser(email, hashedPassword);

      // Respond with success
      res.status(201).json({ message: "User registered sucessfully", userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async login(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // Fetch the user from the database
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if the password matches
      const isPasswordValid = await bycrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate access token
      const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "15m",
      });

      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "7d",
      });

      // Respond with tokens
      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = UserController;
