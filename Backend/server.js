import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API Endpoints
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Nike Store API Running");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});