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
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await Buyer.findOne({ email: profile.emails?.[0].value });

                if (!user) {
                    // Create new user with Google account
                    user = await Buyer.create({
                        username: profile.displayName || profile.emails?.[0].value.split('@')[0],
                        email: profile.emails?.[0].value,
                        mobile: '', // Will be updated by user later if needed
                        password: Math.random().toString(36).slice(-8), // Random password
                        role: 'Buyer',
                        profile: {
                            name: profile.displayName,
                            avatar: profile.photos?.[0].value,
                        },
                        googleId: profile.id,
                        isVerified: true, // Auto-verify Google users
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

export default passport;
