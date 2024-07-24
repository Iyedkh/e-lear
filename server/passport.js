const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'test'; // Use a secure secret

const GOOGLE_CLIENT_ID = '585940467383-r44s6kcecirrji22cret6qr15p5vtudi.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('GoogleStrategy callback triggered');
    console.log('Profile received:', profile);

    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        console.log('Creating new user with Google profile');
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        });
        await user.save();
      } else {
        console.log('User already exists:', user);
      }
      done(null, user);
    } catch (err) {
      console.error('Error during GoogleStrategy callback:', err);
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing user with ID:', id);
  try {
    const user = await User.findById(id);
    if (user) {
      console.log('User found:', user);
      done(null, user);
    } else {
      console.log('User not found');
      done(null, false);
    }
  } catch (err) {
    console.error('Error during user deserialization:', err);
    done(err, null);
  }
});

module.exports = passport;