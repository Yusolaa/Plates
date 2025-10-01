import dotenv from "dotenv";
import connectDB from "./config/database.js";
import ovRoute from "./routes/ovRoute.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Connect db
connectDB();

// Routes

app.use("/api", ovRoute);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
