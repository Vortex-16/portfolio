# Portfolio Backend - Secure Email Service

A secure Node.js/Express backend service for handling contact form submissions from the portfolio website.

## Features

- ✅ **Secure Email Handling**: No exposed API keys on frontend
- ✅ **Rate Limiting**: Prevents spam with IP-based limits
- ✅ **Input Validation**: Server-side validation using Joi
- ✅ **CORS Protection**: Configured for specific origins
- ✅ **Helmet Security**: Additional security headers
- ✅ **Professional Email Templates**: HTML and text formats
- ✅ **Error Handling**: Comprehensive error management

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your actual values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=vikash.kr.gupta.dev@gmail.com
```

### 3. Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

### 4. Frontend Environment

Create/update `.env` in the main portfolio directory:

```env
VITE_API_URL=http://localhost:5000
```

### 5. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### POST `/api/contact`

Send a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully! Thank you for your message.",
  "messageId": "unique-message-id"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation
- **CORS**: Restricted to your frontend domain
- **Helmet**: Security headers
- **No Sensitive Data Exposure**: Errors don't leak internal info

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Option 2: Heroku

1. Create Heroku app
2. Set config vars (environment variables)
3. Deploy using Git

### Option 3: VPS/Cloud Server

1. Install Node.js
2. Clone repository
3. Set environment variables
4. Use PM2 for process management
5. Configure reverse proxy (Nginx)

## Testing

Test the API endpoint:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### Common Issues

1. **Gmail Authentication Failed**
   - Ensure 2FA is enabled
   - Use App Password, not regular password
   - Check EMAIL_USER and EMAIL_PASS values

2. **CORS Errors**
   - Verify FRONTEND_URL matches your frontend domain
   - Check for trailing slashes

3. **Rate Limiting Issues**
   - Wait 15 minutes or restart server in development
   - Adjust limits in `server.js` if needed

### Logs

Check server logs for detailed error information:
- Successful emails log message ID
- Failed emails log full error details
- Rate limiting attempts are logged

## Email Template

The backend sends professional HTML emails with:
- Branded header with gradient
- Sender information
- Formatted message content
- Timestamp
- Reply-to functionality

## Security Best Practices

✅ Never commit `.env` files
✅ Use strong, unique passwords
✅ Enable 2FA on email accounts
✅ Regularly update dependencies
✅ Monitor server logs
✅ Set up proper SSL in production
