import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/',  async (req, res) => {
  res.json({ status: 'users API is active' });
})



// Get user profile

router.get('/profile', protect, async (req, res) => {
  res.json(req.user)
})


// Update user profile
router.put('/profile', protect, async (req, res) => {
  const { name, university, address } = req.body
  const user = await User.findById(req.user._id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  if (name) user.name = name
  if (university) user.university = university
  if (address) user.address = address

  await user.save()
  res.json(user)
})

export default router
