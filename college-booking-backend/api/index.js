// index.js
import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import serverless from "serverless-http";

dotenv.config();

// MongoDB connection (runs once per function execution in Vercel)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// If running locally, start the server normally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export handler for Vercel
export const handler = serverless(app);
