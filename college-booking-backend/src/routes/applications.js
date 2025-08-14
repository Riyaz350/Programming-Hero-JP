import express from 'express'
import Application from '../models/Application.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Create application
router.post('/', protect, async (req, res) => {
  const { collegeName, candidateName, subject, email, phone, address, dob, image } = req.body
  const app = await Application.create({ user: req.user._id, collegeName, candidateName, subject, email, phone, address, dob, image })
  res.status(201).json(app)
})

// Get user's applications
router.get('/', protect, async (req, res) => {
  const apps = await Application.find({ user: req.user._id })
  res.json(apps)
})

export default router
