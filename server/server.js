import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://vikash-dev-portfolio.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many email requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Email validation schema
const emailSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  message: Joi.string().min(10).max(1000).required().messages({
    'string.min': 'Message must be at least 10 characters long',
    'string.max': 'Message cannot exceed 1000 characters',
    'any.required': 'Message is required'
  })
});

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use App Password for Gmail
    }
  });
};

// Email template
const createEmailTemplate = (name, email, message) => {
  return {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL || 'vikash.kr.gupta.dev@gmail.com',
    subject: `Portfolio Contact: Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #065f46); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .info-row { margin: 10px 0; }
          .label { font-weight: bold; color: #059669; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #059669; margin: 15px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>You've received a new message through your portfolio contact form</p>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">From:</span> ${name}
            </div>
            <div class="info-row">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="info-row">
              <span class="label">Date:</span> ${new Date().toLocaleString()}
            </div>
            <div class="message-box">
              <div class="label">Message:</div>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your portfolio contact form</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Contact Form Submission
      
      From: ${name}
      Email: ${email}
      Date: ${new Date().toLocaleString()}
      
      Message:
      ${message}
    `,
    replyTo: email
  };
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact form endpoint
app.post('/api/send-email', emailLimiter, async (req, res) => {
  try {
    // Validate request body
    const { error, value } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    const { name, email, message } = value;

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Create email template
    const emailTemplate = createEmailTemplate(name, email, message);

    // Send email
    const info = await transporter.sendMail(emailTemplate);

    console.log('Email sent successfully:', {
      messageId: info.messageId,
      from: email,
      name: name,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! Thank you for your message.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Don't expose internal errors to client
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later or contact me directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service ready`);
});
