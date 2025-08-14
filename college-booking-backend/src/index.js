import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import applicationRoutes from './routes/applications.js'
import reviewRoutes from './routes/reviews.js'
import healthRoutes from './routes/health.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/health', healthRoutes)

app.use((req, res) => res.status(404).json({ message: 'Route not found' }))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`))
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })
