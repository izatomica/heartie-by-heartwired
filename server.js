import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './server/db.js';
import authRoutes from './server/routes/auth.js';
import activitiesRoutes from './server/routes/activities.js';
import goalsRoutes from './server/routes/goals.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/goals', goalsRoutes);

// Health check endpoint with database connection test
app.get('/api/health', async (req, res) => {
  const health = {
    status: 'ok',
    message: 'Heartie API is running',
    timestamp: new Date().toISOString(),
    database: {
      status: 'unknown',
      message: ''
    }
  };

  try {
    // Test database connection with a simple query
    const result = await pool.query('SELECT NOW() as current_time');
    health.database.status = 'connected';
    health.database.message = 'Database connection successful';
    health.database.serverTime = result.rows[0].current_time;
  } catch (error) {
    health.status = 'degraded';
    health.database.status = 'disconnected';
    health.database.message = error.message;
    console.error('Database health check failed:', error);
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Serve static files from the dist directory (production)
app.use(express.static(join(__dirname, 'dist')));

// Handle client-side routing - send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌸 Heartie is running on port ${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api`);
  console.log(`   App: http://localhost:${PORT}`);
});
