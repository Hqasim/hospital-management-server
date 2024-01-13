import express from "express";
import "dotenv/config";

const app = express();

// Middleware
app.use(express.json());

//PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
