import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dbConnect from "./config/db.js";

const app = express();

// Connect to DB
await dbConnect();

// CORS setup
app.use(cors({ origin: "*", credentials: true }));



// Body parser
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Booking API",
    version: "1.0.0",
    status: "active",
    documentation: "/api/v1/docs",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/v1", routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      status: 404,
    },
  });
});

export default app;
