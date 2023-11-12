const router = require("express").Router();
const Keys = require("../config/keys");
const User = require("../Models/user-model");
const bcrypt = require("bcrypt");
const authCheck = function (req, res, next) {
  // console.log(req.session);
  console.log(req.user);
  if (!req.user && req.session) {
    // if users not logged in
    res.status(504).send("Please Login first");
  } else {
    console.log(req.user);
    // logged
    next();
  }
};

router.patch("/updateProfile", authCheck, async (req, res) => {
  const data = req.body;
  const value = data.update;
  console.log(value);
  if (data.data === "name") {
    // console.log(data.data);
    const updated = await User.findByIdAndUpdate(req.user.id, {
      userName: value,
    });
    if (updated) {
      console.log(updated);
      return res.status(200).send({ message: "updated", userName: value });
    } else {
      console.log(updated);

      return res.status(404).send({ message: "not updated" });
    }
  }
  if (data.data === "email") {
    const updated = await User.findByIdAndUpdate(req.user.id, {
      email: value,
    });
    if (updated) {
      console.log(updated);
      return res.status(200).send({ message: "updated", email: value });
    } else {
      console.log(updated);

      return res.status(404).send({ message: "not updated" });
    }
  }
  return res.status(404).send({ message: "not updated" });
});

router.patch("/updatePassword", authCheck, async (req, res) => {
  const data = req.body;
  const user = await User.findById(req.user.id);
  console.log(user);
  const Match = bcrypt.compareSync(data.curr, user.password);
  if (!Match) {
    return res.status(400).send({ error: "Password Didnt Match !" });
  } else {
    user.password = bcrypt.hashSync(data.newPass, Keys.mongodb.hashKey);
    await user.save();
    return res.status(200).send({ message: "Password Updated Successfully" });
  }
});

module.exports = router;
