import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await dbConnect();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start app:", err);
    process.exit(1);
  }
};

startApp();
