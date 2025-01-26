import express from 'express';
import cors from 'cors';
import connectDB from '../lib/db';
import eventsRouter from './routes/events';
import authRouter from './routes/auth';
import forumRouter from './routes/forum';
import messagesRouter from './routes/messages';

const app = express();

// Connect to MongoDB
console.log('Starting server...');
connectDB()
  .then(() => {
    console.log('MongoDB connection established successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/auth', authRouter);
app.use('/api/forum', forumRouter);
app.use('/api/messages', messagesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});