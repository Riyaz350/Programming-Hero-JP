import express from "express";
import userRoutes from "./users.js";
import applications from "./applications.js";
import auth from "./auth.js";
import health from "./health.js";
import reviews from "./reviews.js"; 

const router = express.Router();
 
router.use("/users", userRoutes);
router.use("/applications", applications);
router.use("/auth", auth);
router.use("/health", health);
router.use("/reviews", reviews);

export default router;