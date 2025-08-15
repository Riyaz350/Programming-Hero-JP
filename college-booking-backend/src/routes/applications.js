import express from 'express'
import Application from '../models/Application.js'

const router = express.Router()

// Create application (public, no auth)
router.post('/', async (req, res) => {
  try {
    const {
      collegeName,
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      image,
      applicantEmail
    } = req.body

    const app = await Application.create({
      applicantEmail, // logged-in user email
      collegeName,
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      image
    })

    res.status(201).json(app)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create application', error: err.message })
  }
})

// Get applications by applicantEmail
router.get('/', async (req, res) => {
  try {
    const { applicantEmail } = req.query
    if (!applicantEmail) return res.status(400).json({ message: 'applicantEmail is required' })

    const apps = await Application.find({ applicantEmail })
    res.json(apps)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch applications', error: err.message })
  }
})

export default router
