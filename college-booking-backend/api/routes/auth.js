import express from 'express' 
import User from '../models/User.js'
import { generateToken } from '../config/jwt.js'
import bcrypt from 'bcryptjs';


const router = express.Router()

router.get('/', (req, res) => {
  res.json({ status: 'Auth API is active' });
});
// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' })

  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ message: 'User already exists' })

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })
  res.status(201).json({ token: generateToken({ id: user._id }) })
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'All fields required' })

  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })

  res.json({ token: generateToken({ id: user._id }) })
})

// Social login (Google/Github)
router.post('/social-sync', async (req, res) => {
  const { name, email } = req.body
  if (!email) return res.status(400).json({ message: 'Email required' })

  let user = await User.findOne({ email })
  if (!user) {
    user = await User.create({ name, email, socialLogin: true })
  }
  res.json({ token: generateToken({ id: user._id }) })
})

export default router
