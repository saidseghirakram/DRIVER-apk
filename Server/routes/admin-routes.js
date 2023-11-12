const express = require("express");
const router = express.Router();
const User = require("../Models/user-model");
const mapStyle = require("../Models/mapStyle");
router.get("/users", (req, res) => {
  User.find({}).then((users) => {
    if (!users) {
      return res.status(404).send({ message: "Error Getting Users" });
    } else {
      return res.status(200).send(users);
    }
  });
});
router.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Error Deleting User" });
      } else {
        return res.status(200).send(user);
      }
    })
    .catch((err) => console.log(err));
});
router.post("/map", (req, res) => {
  const data = req.body;
  console.log(data.style);

  mapStyle
    .findOneAndUpdate({ map: "Map" }, { styling: data.style }, { upsert: true })
    .then((map) => {
      if (map) {
        return res.status(201).send(map);
      } else {
        return res.status(404).send({ message: "Error Updating Map" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
