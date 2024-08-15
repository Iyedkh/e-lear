const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'test';

// Configure Passport to use Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google OAuth callback:', profile); // Log the Google profile

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log('Existing user found:', existingUser);
        return done(null, existingUser);
      }

      // Create a new user if not found
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile._json.email,
        image: profile._json.picture,
      });
      await newUser.save();
      console.log('New user created:', newUser);
      done(null, newUser);
    } catch (error) {
      console.error('Error during Google OAuth strategy:', error);
      done(error, null);
    }
  }
));

// Configure Passport to not use sessions for stateless authentication
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.warn('User not found during deserialization:', id);
      return done(new Error('User not found'), null);
    }
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Error during user deserialization:', error);
    done(error, null);
  }
});
