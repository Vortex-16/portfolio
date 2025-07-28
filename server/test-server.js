import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins during testing
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio backend is running!',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      EMAIL_USER: process.env.EMAIL_USER ? 'configured' : 'not configured'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Simple test email endpoint
app.post('/api/send-email', (req, res) => {
  try {
    console.log('Received request:', req.body);
    
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { name: !!name, email: !!email, message: !!message }
      });
    }
    
    // For now, just return success without actually sending email
    console.log('Email would be sent:', { name, email, messageLength: message.length });
    
    res.json({
      success: true,
      message: 'Test successful! Email functionality is working.',
      data: {
        name,
        email,
        messageLength: message.length,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error in email endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📧 Email test: POST http://localhost:${PORT}/api/send-email`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
