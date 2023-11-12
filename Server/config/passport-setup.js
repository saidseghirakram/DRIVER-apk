const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const localStrategy = require("passport-local").Strategy;
const keys = require("./keys");
const User = require("../Models/user-model");

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, {
      id: user.id,
      username: user.username,
      image: user.image,
    });
  });
});
passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshTooken, profile, done) => {
      // passport callback function
      // check if user exist

      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          console.log("current User is " + currentUser);

          done(null, currentUser);
        } else {
          // creating a user
          new User({
            username: profile.displayName,
            googleId: profile.id,
            image: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("new user created: " + newUser);
              done(null, newUser);
            })
            .catch((err) => console.log(err));
        }
      });

      //console.log("passport callback function fired");
      console.log(profile);
    }
  )
);
