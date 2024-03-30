const express = require("express");
const db = require("./db/db.connection");
const UserModel = require("./models/User");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Hospital Management System Back-end!" });
});

// Initiate server
(async () => {
  try {
    await db.authenticate();
    console.log("DB: connection established");

    // Syncronize db models.
    await UserModel.sync({ alter: true });
    console.log("DB: models synced");

    // Server listen
    app.listen(PORT, () => {
      console.log(`Server: started on port ${PORT}.`);
    });
  } catch (error) {
    console.log(error);
    console.log("DB: failed to authenticate");
    console.log("Server: failed to start");
  }
})();
