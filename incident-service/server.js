import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import incidentRoutes from './routes/incidentRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/incidents', incidentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'incident-service' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Incident Service running on port ${PORT}`);
}); 