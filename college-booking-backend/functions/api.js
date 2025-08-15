import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Example route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Netlify function!' });
});

// TODO: import your routes
// import applicationsRouter from './routes/applications.js';
// app.use('/applications', applicationsRouter);

const handler = serverless(app);
export { handler };
