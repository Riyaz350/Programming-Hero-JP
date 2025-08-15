// config/db.js
import mongoose from "mongoose";
import config from "./config.js";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = config.mongodb.uri;

    if (!mongoUri) {
      throw new Error("MONGODB URI is not defined in environment variables");
    }

    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        cached.promise = null; // reset so it can retry
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
