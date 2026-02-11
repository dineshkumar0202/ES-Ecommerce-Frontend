import express from 'express';
import passport from '../../config/passport';
import { generateToken } from '../../utils/tokenUtils';

const router = express.Router();

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed` }),
    (req, res) => {
        try {
            const user = req.user as any;

            if (!user) {
                return res.redirect(`${process.env.CLIENT_URL}/login?error=no_user`);
            }

            // Generate JWT token
            const token = generateToken(user._id, user.role);

            // Redirect to frontend with token and user info
            res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}&role=${user.role}&name=${encodeURIComponent(user.username)}`);
        } catch (error) {
            console.error('Google auth callback error:', error);
            res.redirect(`${process.env.CLIENT_URL}/login?error=callback_failed`);
        }
    }
);

// @route   GET /api/auth/google/logout
// @desc    Logout user
// @access  Public
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.redirect(process.env.CLIENT_URL!);
    });
});

export default router;
