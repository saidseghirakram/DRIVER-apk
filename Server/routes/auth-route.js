const router = require("express").Router();
const User = require("../Models/user-model");
const passport = require("passport");
const keys = require("../config/keys");
const bcrypt = require("bcrypt");

// login route
router.get("/login", (req, res) => {
  res.redirect("../../ScreenB.js");
});
router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    // This function is executed when the authentication is successful

    res.status(200).json({
      userName: req.user.userName || req.user.name,
      id: req.user._id,
    });
  },
  (err, req, res, next) => {
    // This function is executed when the authentication fails
    res.status(401).json({ error: "Login failed" });
  }
);

// singup route

router.post("/sign-up", (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  User.findOne({ email: email }).then((exists) => {
    if (exists) {
      res.status(404).send(false);
    } else {
      const salt = bcrypt.genSaltSync(10);
      console.log("this is the salt: " + salt);
      const hashedPassword = bcrypt.hashSync(password, salt);
      new User({
        userName: name.trim(),
        email: email.trim(),
        password: hashedPassword.trim(),
        postsAdded: 0,
      })
        .save()
        .then((newUser) => {
          console.log("new user created: " + newUser);
          res.send(newUser);
          //.json({ mssg: "user Created Successfully!" });
        })
        .catch((err) => console.log(err));
    }
  });
});

// google signin
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user)
  res.send(req.user);
});

// logout route
router.get("/logout", (req, res) => {
  console.log(req.user);
  req.logout((err) => {
    if (!err) {
      return res.status(200).send({ msg: "logged out" });
    } else {
      console.log(err);
      return res.status(500).send({ msg: "error" });
    }
  });
  // console.log(req.user);
});

module.exports = router;
