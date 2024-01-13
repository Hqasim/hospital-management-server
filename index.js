require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const db_users = require("./db/db_users");

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get("/", (request, response) => {
  response.json({ info: "Hospital Management System Back-end" });
});
app.get("/users", db_users.getUsers);
app.get("/users/:id", db_users.getUserById);
app.post("/users", db_users.createUser);
app.put("/users/:id", db_users.updateUser);
app.delete("/users/:id", db_users.deleteUser);

// Server listen
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
