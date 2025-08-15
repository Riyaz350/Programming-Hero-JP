// app.js
import express from "express";
import cors from "cors";
import routes from "./routes/index.js"; // make sure index.js in routes folder is ESM
import dbConnect from "./config/db.js";

const app = express();

// Connect to DB
await dbConnect();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Body parser
app.use(express.json());

// Root route handler
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to FB International API",
    version: "1.0.0",
    status: "active",
    documentation: "/api/v1/docs",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/v1", routes);

// Error handling middleware
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
