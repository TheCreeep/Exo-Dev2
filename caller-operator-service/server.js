import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import callerRoutes from './routes/callerRoutes.js';
import operatorRoutes from './routes/operatorRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/callers', callerRoutes);
app.use('/api/operators', operatorRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'caller-operator-service' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Caller-Operator Service running on port ${PORT}`);
}); 