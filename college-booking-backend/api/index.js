import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import serverless from "serverless-http";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import applicationRoutes from "./routes/applications.js";
import reviewRoutes from "./routes/reviews.js";
import healthRoutes from "./routes/health.js";

dotenv.config();

const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the College Booking API"); 
});

// Middlewares
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/health", healthRoutes);

// Fallbacks
app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

// MongoDB connection for serverless
let conn = null;
const connectDB = async () => {
  if (conn) return conn;
  conn = await mongoose.connect(process.env.MONGODB_URI);
  return conn;
};

// Connect once on cold start (Vercel)
connectDB()
  .then(() => console.log("✅ MongoDB connected (serverless)"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Export for Vercel
export default serverless(app);

// Optional: export raw app for local dev
export const expressApp = app;