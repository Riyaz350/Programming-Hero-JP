import "./config/db.js"

import express from "express"
const bodyParser = express.json
import cors from "cors"
import routes from "./routes/index.js"

const app = express()

// CORS configuration
// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://programming-hero-jp.vercel.app'
]

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

app.use(bodyParser())

// Root route handler
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Student Booking API',
        version: '1.0.0',
        status: 'active',
        documentation: '/api/v1/docs'
    })
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use("/api/v1", routes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404
        }
    })
})

export default app