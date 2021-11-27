const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = require('../models/user');

/* =================== Handeling Infinite run: Start ===================  */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// For facebook
passport.use(
    new FacebookStrategy(
      {
        clientID: keys.FACEBOOK_APP_ID,
        clientSecret: keys.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */
        // check if user id already inserted
        User.findOne({ userId: profile.id }).then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            // new user case
            // insert new user id
            new User({
              userId: profile.id,
              username: profile.displayName,
              picture: profile._json.picture
            })
              .save()
              .then(user => {
                done(null, user);
              });
          }
        });
        /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
      }
    )
  );