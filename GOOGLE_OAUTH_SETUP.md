# Google OAuth Authentication Setup - Complete Guide

## ✅ Configuration Complete!

Your Google OAuth authentication is now fully configured and ready to use with the following credentials:

### **Google OAuth Credentials**
- **Client ID**: `your_google_client_id.apps.googleusercontent.com`
- **Client Secret**: `your_google_client_secret`

---

## 📋 URLs Configured in Google Cloud Console

### **Authorized JavaScript Origins**
Add these URLs in your Google Cloud Console:
```
http://localhost:5173
http://localhost:5000
http://127.0.0.1:5173
http://127.0.0.1:5000
```

### **Authorized Redirect URIs**
Add these URLs in your Google Cloud Console:
```
http://localhost:5000/api/auth/google/callback
http://localhost:5173/auth/google/callback
```

---

## 🔧 Environment Files Updated

### **Server Environment** (`/server/.env`)
```env
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your_session_secret
```

### **Client Environment** (`/client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## 🚀 How It Works

### **OAuth Flow**
1. User clicks "Continue with Google" button on login page
2. User is redirected to Google's authentication page
3. User authorizes the application
4. Google redirects back to: `http://localhost:5000/api/auth/google/callback`
5. Server processes the authentication and creates/updates user
6. Server redirects to: `http://localhost:5173/auth/success?token=...&role=...&name=...`
7. Frontend stores the token and redirects user based on their role

### **User Experience**
- **New Users**: Automatically registered with Google account details
- **Existing Users**: Linked to their existing account via email
- **Auto-verified**: Google users are automatically marked as verified

---

## 📁 Files Involved

### **Backend**
- ✅ `/server/.env` - Environment variables
- ✅ `/server/src/config/passport.ts` - Passport Google Strategy
- ✅ `/server/src/routers/auth/GoogleAuthRouter.ts` - OAuth routes
- ✅ `/server/server.ts` - Express session & passport middleware

### **Frontend**
- ✅ `/client/.env` - Client environment variables
- ✅ `/client/src/Components/WrapperComponents/Login.tsx` - Login page
- ✅ `/client/src/Components/WrapperComponents/GoogleAuthButton.tsx` - Google button
- ✅ `/client/src/Components/Pages/AuthSuccess.tsx` - Success handler

---

## 🎯 Testing Your Setup

### **Step 1: Restart Servers**
```bash
# Stop both servers (Ctrl+C)
# Then restart them

# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### **Step 2: Test Login**
1. Navigate to: `http://localhost:5173/login`
2. Click "Continue with Google" button
3. Select your Google account
4. Authorize the application
5. You should be redirected and logged in!

---

## 🔒 Security Features

- ✅ **Session Management**: Express sessions with secure cookies
- ✅ **JWT Tokens**: Generated after successful authentication
- ✅ **Auto-verification**: Google users are automatically verified
- ✅ **Account Linking**: Existing users can link their Google account
- ✅ **CORS Protection**: Only authorized origins can make requests

---

## 🌐 Production Deployment

When deploying to production, update these URLs:

### **Google Cloud Console**
Add production URLs:
```
https://yourdomain.com
https://api.yourdomain.com
https://yourdomain.com/auth/google/callback
https://api.yourdomain.com/api/auth/google/callback
```

### **Environment Variables**
Update `.env` files with production URLs:
```env
CLIENT_URL=https://yourdomain.com
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/api/auth/google/callback
```

---

## 🐛 Troubleshooting

### **Issue: "Redirect URI mismatch"**
- Verify all URLs are added in Google Cloud Console
- Check that URLs match exactly (no trailing slashes)
- Ensure you're using the correct Google project

### **Issue: "Invalid client ID"**
- Verify credentials in `.env` files
- Restart the server after updating `.env`
- Check for extra spaces in environment variables

### **Issue: "Session not found"**
- Verify `SESSION_SECRET` is set in server `.env`
- Check that express-session middleware is configured
- Clear browser cookies and try again

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check server logs for error messages
3. Verify all URLs in Google Cloud Console
4. Ensure both servers are running
5. Clear browser cache and cookies

---

## ✨ Features Enabled

- ✅ One-click Google login
- ✅ Automatic user registration
- ✅ Account linking for existing users
- ✅ Auto-verification for Google users
- ✅ Secure session management
- ✅ Role-based redirection (Buyer/Seller/Admin)

---

**Your Google OAuth authentication is now fully configured and ready to use! 🎉**
