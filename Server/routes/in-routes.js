const router = require("express").Router();

const authCheck = function (req, res, next) {
  if (!req.user) {
    // if users not logged in

    return res.send({ msg: "you are not logged in!" });
  } else {
    // logged
    console.log("Session id in authCheck" + req.sessionID);
    console.log(req.user);
    next();
  }
};
router.get("/map", authCheck, (req, res) => {
  res.status(200).json({
    name: req.user.username,
    msg: "you are  logged in!",
    id: req.user.id,
  });
});
module.exports = router;
