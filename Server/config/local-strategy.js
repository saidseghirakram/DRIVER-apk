const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../Models/user-model");
const Admin = require("../Models/admin-model");
const bcrypt = require("bcrypt");

passport.serializeUser(function (user, done) {
  return done(null, {
    id: user.id,
    username: user.name,
    email: user.email,
    postsAdded: user.postsAdded,
  });
});
passport.deserializeUser(function (user, done) {
  return done(null, user);
});

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      email.trim();
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            Admin.findOne({ name: email }).then((admin) => {
              if (!admin) {
                return done(null, false, { message: "User Not Found" });
              } else {
                if (bcrypt.compareSync(password, admin.password)) {
                  console.log("admin password final cheking : " + admin);
                  return done(null, admin);
                } else {
                  return done(null, false, { message: "Wrong Password" });
                }
              }
            });
          } else {
            // user.password === password
            if (bcrypt.compareSync(password, user.password)) {
              console.log("user password final cheking : " + user);
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong Password" });
            }
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
// passport.use(
//   new localStrategy(
//     { usernameField: "email", passwordField: "password" },
//     (email, password, done) => {
//       User.findOne({ email: email })
//         .then(async (user) => {
//           if (!user) {
//             return done(null, false, { message: "User Not Found" });
//           } else {
//             const match = await bcrypt.compare(password, user.password);
//             console.log(
//               "this is the user password from the db : " + user.password
//             );
//             if (match) {
//               console.log("inside local Validation :" + user);
//               return done(null, user);
//             } else {
//               return done(null, false, { message: "Wrong Password" });
//             }
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   )
// );
