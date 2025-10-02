@echo off
echo.
echo ================================
echo   DEPLOYING TO VERCEL
echo ================================
echo.

echo 1. Adding all changes to git...
git add .

echo.
echo 2. Committing changes...
git commit -m "Fix email API for Vercel deployment - configure for vikash-dev-portfolio.vercel.app"

echo.
echo 3. Pushing to GitHub (this will trigger Vercel deployment)...
git push origin main

echo.
echo ================================
echo   DEPLOYMENT INITIATED!
echo ================================
echo.
echo Your changes are being deployed to:
echo https://vikash-dev-portfolio.vercel.app
echo.
echo Next steps:
echo 1. Go to Vercel Dashboard: https://vercel.com/dashboard
echo 2. Find your project: vikash-dev-portfolio
echo 3. Go to Settings ^> Environment Variables
echo 4. Add the following variables:
echo    - EMAIL_USER: your-gmail@gmail.com
echo    - EMAIL_PASS: your-gmail-app-password
echo    - EMAIL_TO: your-email@gmail.com
echo    - NODE_ENV: production
echo.
echo 5. Wait for deployment to complete (2-3 minutes)
echo 6. Test your contact form at: https://vikash-dev-portfolio.vercel.app
echo.
pause