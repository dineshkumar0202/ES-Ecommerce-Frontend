import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Buyer from '../models/users/BuyerModel';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await Buyer.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                const email = profile.emails && profile.emails[0] ? profile.emails[0].value : undefined;

                if (!email) {
                    return done(new Error('No email found directly from Google'), undefined);
                }

                let user = await Buyer.findOne({ email });

                if (!user) {
                    // Create new user with Google account
                    user = await Buyer.create({
                        username: profile.displayName || email.split('@')[0],
                        email: email,
                        mobile: undefined, // Let sparse index handle uniqueness if needed, or leave empty
                        password: undefined, // No password for Google users
                        role: 'Buyer',
                        profile: {
                            name: profile.displayName,
                            avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
                        },
                        googleId: profile.id,
                        isVerified: true, // Auto-verify Google users
                    });
                } else {
                    // Update existing user with googleId if not present (linking accounts)
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        user.isVerified = true;
                        await user.save();
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

export default passport;
