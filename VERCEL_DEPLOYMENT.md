# Vercel Deployment Guide for vikash-dev-portfolio.vercel.app

## 🚀 Quick Deploy
Run the deployment script:
```bash
./deploy-to-vercel.bat
```

Or manually:
```bash
git add .
git commit -m "Fix email API for Vercel deployment"
git push origin main
```

## 📧 Email Configuration

### 1. Set Environment Variables in Vercel Dashboard
Go to: https://vercel.com/dashboard → vikash-dev-portfolio → Settings → Environment Variables

Add these variables:
- `EMAIL_USER` = your-gmail@gmail.com
- `EMAIL_PASS` = your-gmail-app-password
- `EMAIL_TO` = where-you-want-emails@gmail.com  
- `NODE_ENV` = production

### 2. Gmail App Password Setup
1. Go to your Google Account: https://myaccount.google.com
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate password for "Mail"
5. Use this 16-character password for `EMAIL_PASS`

## 🔧 API Endpoints

Your email API will be available at:
- **Production**: `https://vikash-dev-portfolio.vercel.app/api/send-email`
- **Development**: `http://localhost:5000/api/send-email`

## ✅ Testing

### 1. Test Contact Form
1. Visit: https://vikash-dev-portfolio.vercel.app
2. Navigate to Contact section
3. Fill out and submit the form
4. Check your email for the message

### 2. Test API Directly
```bash
curl -X POST https://vikash-dev-portfolio.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "This is a test message"
  }'
```

## 🐛 Troubleshooting

### Email Not Sending?
1. Check Vercel function logs: Dashboard → Functions → send-email
2. Verify environment variables are set correctly
3. Make sure Gmail app password is correct (not regular password)
4. Check spam folder

### API Errors?
1. Check Network tab in browser dev tools
2. Look for CORS errors
3. Verify API endpoint URL is correct
4. Check Vercel deployment logs

### Build Failures?
1. Check Vercel build logs in dashboard
2. Verify all dependencies are in package.json
3. Make sure vercel.json is configured correctly

## 📁 File Structure
```
portfolio/
├── api/
│   └── send-email.js          # Serverless email function
├── src/
│   └── utils/
│       └── email.js           # Frontend email utility
├── vercel.json                # Vercel configuration
├── .env                       # Local environment variables
└── deploy-to-vercel.bat       # Deployment script
```

## 🌟 Success!
After setup, your portfolio will have:
- ✅ Working contact form
- ✅ Server-side email sending  
- ✅ Rate limiting protection
- ✅ Input validation
- ✅ Professional email templates
- ✅ CORS handling
- ✅ Production-ready deployment

Your live site: **https://vikash-dev-portfolio.vercel.app**