// index.js
import app from "./app.js";
import dotenv from "dotenv";
import serverless from "serverless-http";
import dbConnect from "./config/db.js";

dotenv.config();

// Connect to DB once per lambda cold start
await dbConnect();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export const handler = serverless(app);
