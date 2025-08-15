import app from './app.js';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import dbConnect from './config/db.js';

dotenv.config();
await dbConnect();

export const handler = serverless(app);
