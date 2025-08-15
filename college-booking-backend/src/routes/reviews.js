import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Create review
router.post("/", async (req, res) => {
  try {
    const { collegeName, rating, comment, userEmail } = req.body;

    if (!collegeName || !rating || !comment || !userEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({
      userEmail,
      collegeName,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create review", error: err.message });
  }
});

// Get reviews by college name
router.post("/filter", async (req, res) => {
  try {
    const { collegeName } = req.body;

    if (!collegeName) {
      return res.status(400).json({ message: "collegeName is required" });
    }

    // Query reviews where collegeName matches
    const reviews = await Review.find({ collegeName: collegeName.trim() });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
