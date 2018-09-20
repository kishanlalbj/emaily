const keys = require("../config/keys");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  console.log("serialize", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserialixe", id);
  User.findById(id)
    .then(user => {
      console.log("DEsSERIALIXW", user);
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
    (accessToken, refreshToken, profile, done) => {
      console.log(JSON.stringify(profile, undefined, 2));
      User.findOne({ googleID: profile.id })
        .then(user => {
          console.log("USER FOUND IN DB", user);
          if (user) {
            console.log("User already signed Up");
            done(null, user);
          } else {
            const newUser = new User({
              googleID: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value
            });
            newUser.save().then(result => {
              done(null, result);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);
