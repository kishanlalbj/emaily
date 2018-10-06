const keys = require("../config/keys");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  console.log("serialize", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => console.log(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existinguser = await User.findOne({ googleID: profile.id });

      if (existinguser) {
        return done(null, existinguser);
      }
      const newUser = new User({
        googleID: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });

      const newuser = await newUser.save();
      if (newuser) done(null, result);
    }
  )
);
