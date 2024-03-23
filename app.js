const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.get("/", (request, response) => {
  response.json({ message: "Hospital Management System Back-end" });
});
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

// Server listen
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
