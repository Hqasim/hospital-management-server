const express = require("express");
require("dotenv").config();
const db = require("./db/db.connection");
const UserModel = require("./models/User");
const { router } = require("./routes/routes");

const PORT = process.env.PORT || 3000;
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/", router);

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
