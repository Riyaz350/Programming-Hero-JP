import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import applicationRoutes from "./routes/applications.js";
import reviewRoutes from "./routes/reviews.js";
import healthRoutes from "./routes/health.js";

const app = express();

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

export default app; // ✅ This line is required for default import
