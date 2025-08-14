import express from 'express'
import Review from '../models/Review.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Create review
router.post('/', protect, async (req, res) => {
  const { collegeName, rating, comment } = req.body
  const review = await Review.create({ user: req.user._id, collegeName, rating, comment })
  res.status(201).json(review)
})

// Get all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find().populate('user', 'name')
  res.json(reviews)
})

export default router
