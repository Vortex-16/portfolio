import nodemailer from 'nodemailer';
import Joi from 'joi';

// Email validation schema
const emailSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(1000).required()
});

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map();

// Simple rate limiting function
const isRateLimited = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const userLimit = rateLimitStore.get(ip);
  
  if (now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (userLimit.count >= maxRequests) {
    return true;
  }

  userLimit.count += 1;
  return false;
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Add GET endpoint for debugging
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Email API is running',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS,
        hasEmailTo: !!process.env.EMAIL_TO,
        emailUser: process.env.EMAIL_USER ? process.env.EMAIL_USER.replace(/@.*/, '@***') : 'Not set'
      }
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables in Vercel dashboard.',
        error: 'MISSING_CONFIG',
        debug: {
          hasEmailUser: !!process.env.EMAIL_USER,
          hasEmailPass: !!process.env.EMAIL_PASS,
          hasEmailTo: !!process.env.EMAIL_TO
        }
      });
    }

    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.headers['x-real-ip'] || 
                    req.connection?.remoteAddress || 
                    'unknown';

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        error: 'RATE_LIMITED'
      });
    }

    // Validate request body
    const { error, value } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    const { name, email, message } = value;

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      secure: true,
    });

    // Verify transporter
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #4f46e5; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Submitted: ${new Date().toLocaleString()}
        
        Message:
        ${message}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully! Thank you for your message.'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    // More specific error messages for debugging
    let errorMessage = 'Failed to send email. Please try again later.';
    let errorCode = 'INTERNAL_ERROR';
    
    if (error.message.includes('Invalid login')) {
      errorMessage = 'Email authentication failed. Please check EMAIL_USER and EMAIL_PASS in Vercel environment variables.';
      errorCode = 'AUTH_ERROR';
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      errorMessage = 'Unable to connect to email service.';
      errorCode = 'CONNECTION_ERROR';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Gmail authentication failed. Please use an App Password, not your regular Gmail password.';
      errorCode = 'AUTH_ERROR';
    }
    
    // Error response
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: errorCode,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}