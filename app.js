const express = require("express");
require("dotenv").config();
const db = require("./db/db.connection");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (request, response) => {
  response.json({ message: "Hospital Management System Back-end" });
});

const PORT = process.env.PORT || 3000;

// DB connection check
(async () => {
  try {
    console.log("Testing the database connection...");
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Server listen
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
