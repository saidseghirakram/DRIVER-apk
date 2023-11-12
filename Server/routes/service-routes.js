const express = require("express");
const router = express.Router();
const {
  Deppanage,
  Garages,
  Hotels,
  Restaurant,
  Parking,
  Mechanic,
} = require("../Models/services-model");
const User = require("../Models/user-model");
const keys = require("../config/keys");

const postsCheck = async function (req, res, next) {
  const user = await User.findOne({ _id: req.user.id });
  if (user.postsAdded >= 3) {
    return res.status(501).send({ error: "posts limit reached" });
  } else {
    req.user.postsAdded = user.postsAdded;
    next();
  }
};

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

// parking
router.get("/parkings", (req, res) => {
  Parking.find({
    wilaya: {
      $in: [
        "Adrar",
        "chlef",
        "laghouat",
        "oum el bouaghi",
        "Batna",
        "bejaia",
        "Biskra",
        "Bechar",
        "Blida",
        "Alger",
        "Medea",
      ],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => console.log(err));
});
router.patch("/parkings", authCheck, postsCheck, async (req, res) => {
  const data = req.body;
  console.log(req.user);
  const parks = await Parking.findOne({ wilaya: data.wilaya });
  const myparks = [];
  const parkName = data.parking.name.trim().split(/\s+/).join(" ");
  data.parking.name = parkName;
  data.parking.longitude = parseFloat(data.parking.longitude);
  data.parking.latitude = parseFloat(data.parking.latitude);
  for (const [key, value] of Object.entries(parks.parkings)) {
    if (value["name"].trim() === parkName) {
      return res.status(504).send({ error: "parking already exists" });
    }
    myparks.push({ key, value });
  }
  // adding new parking
  const parkname = "park" + (myparks.length + 1);
  myparks.push({ key: parkname, value: data.parking });

  let updatedParkings = {};
  for (const [key, value] of Object.entries(myparks)) {
    updatedParkings[value.key] = value.value;
  }
  // new parking added
  console.log(updatedParkings);
  // updating here
  Parking.updateOne({ _id: parks._id }, { $set: { parkings: updatedParkings } })
    .exec()
    .then(async (data) => {
      if (!data) {
        return res.status(504).send({ error: "couldn't update" });
      } else {
        const post = req.user.postsAdded + 1;
        await User.updateOne(
          { _id: req.user.id },
          { $inc: { postsAdded: post } }
        );
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(504)
        .send({ error: "Something went wrong! ... Sorry Try Again" });
    });
});
router.delete("/parkings", async (req, res) => {
  const data = req.body;
  const doc = await Parking.findOne({ wilaya: data.wilaya });
  let updatedParkings = {};
  for (const [key, value] of Object.entries(doc.parkings)) {
    if (value.name.trim() === data.parking.name.trim()) {
      continue;
    } else {
      updatedParkings[key] = value;
    }
  }
  console.log(updatedParkings);
  Parking.updateOne(
    { wilaya: data.wilaya },
    { $set: { parkings: updatedParkings } }
  )
    .exec()
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(504).send(false);
    });
});

// Restaurants

router.get("/restaurants", (req, res) => {
  Restaurant.find({
    wilaya: {
      $in: [
        "Adrar",
        "Chlef",
        "Laghouat",
        "oum el bouaghi",
        "batna",
        "bejaia",
        "biskra",
        "bechar",
        "blida",
        "Alger",
        "Medea",
      ],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => console.log(err));
});
router.patch("/restaurants", authCheck, async (req, res) => {
  const data = req.body;
  const rests = await Restaurant.findOne({ wilaya: data.wilaya });
  const myrests = [];
  const restName = data.restaurant.name.trim().split(/\s+/).join(" ");
  data.restaurant.name = restName;
  data.restaurant.longitude = parseFloat(data.restaurant.longitude);
  data.restaurant.latitude = parseFloat(data.restaurant.latitude);
  for (const [key, value] of Object.entries(rests.restaurants)) {
    if (value["name"].trim() === restName) {
      return res.status(504).send({ error: "restaurant already exists" });
    }
    myrests.push({ key, value });
  }
  // adding new restaurant
  const restname = "rest" + (myrests.length + 1);
  myrests.push({ key: restname, value: data.restaurant });

  let updatedRestaurants = {};
  for (const [key, value] of Object.entries(myrests)) {
    updatedRestaurants[value.key] = value.value;
  }
  // new restaurant added
  console.log(updatedRestaurants);
  // updating here
  Restaurant.updateOne(
    { _id: rests._id },
    { $set: { restaurants: updatedRestaurants } }
  )
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(504).send({ error: "couldn't update" });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(504)
        .send({ error: "Something went wrong! ... Sorry Try Again" });
    });
});
router.delete("/restaurants", async (req, res) => {
  const data = req.body;
  const doc = await Restaurant.findOne({ wilaya: data.wilaya });
  console.log(data.restaurant.name);
  let updatedRestaurants = {};
  for (const [key, value] of Object.entries(doc.restaurants)) {
    if (value.name.trim() === data.restaurant.name.trim()) {
      continue;
    } else {
      updatedRestaurants[key] = value;
    }
  }
  console.log(updatedRestaurants);
  Restaurant.updateOne(
    { wilaya: data.wilaya },
    { $set: { restaurants: updatedRestaurants } }
  )
    .exec()
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(504).send(false);
    });
});

//Mechanics

router.get("/mechanics", (req, res) => {
  Mechanic.find({
    wilaya: {
      $in: [
        "Adrar",
        "chlef",
        "laghouat",
        "oum el bouaghi",
        "Batna",
        "bejaia",
        "Biskra",
        "Bechar",
        "Blida",
        "Alger",
        "Medea",
      ],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => console.log(err));
});
router.patch("/mechanics", authCheck, async (req, res) => {
  const data = req.body;
  const mechs = await Mechanic.findOne({ wilaya: data.wilaya });
  const mymechs = [];
  const mechName = data.mechanic.name.trim().split(/\s+/).join(" ");
  data.mechanic.name = mechName;
  data.mechanic.longitude = parseFloat(data.mechanic.longitude);
  data.mechanic.latitude = parseFloat(data.mechanic.latitude);
  for (const [key, value] of Object.entries(mechs.mechanics)) {
    if (value["name"].trim() === mechName) {
      return res.status(504).send({ error: "mechanic already exists" });
    }
    mymechs.push({ key, value });
  }
  // adding new mechanic
  const mechname = "mech" + (mymechs.length + 1);
  mymechs.push({ key: mechname, value: data.mechanic });

  let updatedmechanics = {};
  for (const [key, value] of Object.entries(mymechs)) {
    updatedmechanics[value.key] = value.value;
  }
  // new mechanic added
  console.log(updatedmechanics);
  // updating here
  Mechanic.updateOne(
    { _id: mechs._id },
    { $set: { mechanics: updatedmechanics } }
  )
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(504).send({ error: "couldn't update" });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(504)
        .json({ error: "Something went wrong! ... Sorry Try Again" });
    });
});
router.delete("/mechanics", async (req, res) => {
  const data = req.body;
  const doc = await Mechanic.findOne({ wilaya: data.wilaya });
  console.log(data.mechanic.name);
  let updatedMechanics = {};
  for (const [key, value] of Object.entries(doc.mechanics)) {
    if (value.name.trim() === data.mechanic.name.trim()) {
      continue;
    } else {
      updatedMechanics[key] = value;
    }
  }
  console.log(updatedMechanics);
  Mechanic.updateOne(
    { wilaya: data.wilaya },
    { $set: { mechanics: updatedMechanics } }
  )
    .exec()
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(504).send(false);
    });
});
// Deppanage

router.get("/deppanages", (req, res) => {
  Deppanage.find({
    wilaya: {
      $in: [
        "Adrar",
        "Chlef",
        "Laghouat",
        "Oum el bouaghi",
        "Batna",
        "bejaia",
        "Biskra",
        "Bechar",
        "Blida",
        "Alger",
        "Medea",
      ],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => console.log(err));
});
router.patch("/deppanages", authCheck, async (req, res) => {
  const data = req.body;
  const deps = await Deppanage.findOne({ wilaya: data.wilaya });
  const mydeps = [];
  console.log(data.deppanage);
  const depName = data.deppanage.name.trim().split(/\s+/).join(" ");
  data.deppanage.name = depName;
  data.deppanage.phone = data.deppanage.phone.trim();
  data.deppanage.longitude = parseFloat(data.deppanage.longitude);
  data.deppanage.latitude = parseFloat(data.deppanage.latitude);
  for (const [key, value] of Object.entries(deps.dep)) {
    if (value["name"].trim() === depName) {
      return res.status(504).send({ error: "mechanic already exists" });
    }
    mydeps.push({ key, value });
  }
  // adding new deppanage
  const depname = "depName" + (mydeps.length + 1);
  mydeps.push({ key: depname, value: data.deppanage });

  let updateddeps = {};
  for (const [key, value] of Object.entries(mydeps)) {
    updateddeps[value.key] = value.value;
  }
  // new deppanage added
  console.log(updateddeps);
  // updating here
  Deppanage.updateOne({ _id: deps._id }, { $set: { dep: updateddeps } })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(504).send({ error: "couldn't update" });
      } else {
        return res.status(200).send("Successfully Updated/Added");
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(504)
        .send({ error: "Something went wrong! ... Sorry Try Again" });
    });
});
router.delete("/deppanages", async (req, res) => {
  const data = req.body;
  const doc = await Deppanage.findOne({ wilaya: data.wilaya });
  const depName = data.deppanage.name.trim().split(/\s+/).join(" ");
  data.deppanage.name = depName;
  console.log(data.deppanage.name);
  let updatedDeppanage = {};
  for (const [key, value] of Object.entries(doc.dep)) {
    if (value.name.trim() === data.deppanage.name.trim()) {
      continue;
    } else {
      updatedDeppanage[key] = value;
    }
  }
  // console.log("this is the updated list " + JSON.stringify(updatedDeppanage));
  Deppanage.updateOne(
    { wilaya: data.wilaya },
    { $set: { dep: updatedDeppanage } }
  )
    .exec()
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(504).send(false);
    });
});

// Hotels

router.get("/hotels", (req, res) => {
  Hotels.find({
    wilaya: {
      $in: [
        "Adrar",
        "chlef",
        "laghouat",
        "oum el bouaghi",
        "Batna",
        "bejaia",
        "Biskra",
        "Bechar",
        "Blida",
        "Alger",
        "Medea",
      ],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => console.log(err));
});
router.patch("/hotels", authCheck, async (req, res) => {
  const data = req.body;
  const hotels = await Hotels.findOne({ wilaya: data.wilaya });
  const myHots = [];
  const hotName = data.hotel.name.trim().split(/\s+/).join(" ");
  data.hotel.name = hotName;
  data.hotel.longitude = parseFloat(data.hotel.longitude);
  data.hotel.latitude = parseFloat(data.hotel.latitude);
  for (const [key, value] of Object.entries(hotels.hotels)) {
    if (value["name"].trim() === hotName) {
      return res.status(504).send({ error: "hotels already exists" });
    }
    myHots.push({ key, value });
  }
  // adding new hotel
  const hotname = "hot" + (myHots.length + 1);
  myHots.push({ key: hotname, value: data.hotel });
  let updatedHots = {};
  for (const [key, value] of Object.entries(myHots)) {
    updatedHots[value.key] = value.value;
  }
  // new hotel added
  console.log(updatedHots);
  // updating here
  Hotels.updateOne({ _id: hotels._id }, { $set: { hotels: updatedHots } })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(504).send({ error: "couldn't update" });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(504)
        .send({ error: "Something went wrong! ... Sorry Try Again" });
    });
});
router.delete("/hotels", async (req, res) => {
  const data = req.body;
  const doc = await Hotels.findOne({ wilaya: data.wilaya });
  const hotName = data.hotel.name.trim().split(/\s+/).join(" ");
  data.hotel.name = hotName;
  console.log(data.hotel.name);
  let updatedHotels = {};
  for (const [key, value] of Object.entries(doc.hotels)) {
    if (value.name.trim() === data.hotel.name.trim()) {
      continue;
    } else {
      updatedHotels[key] = value;
    }
  }
  console.log(updatedHotels);
  Hotels.updateOne({ wilaya: data.wilaya }, { $set: { hotels: updatedHotels } })
    .exec()
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(504).send(false);
    });
});

// Garages
router.get("/garages", (req, res) => {
  Garages.find({
    wilaya: {
      $in: [
        "Adrar",
        "chlef",
        "laghouat",
        "oum el bouaghi",
        "Batna",
        "bejaia",
        "Biskra",
        "Bechar",
        "Blida",
        "Alger",
        "Medea",
      ],
    },
  }).then((data) => {
    if (!data) {
      res.status(504).send({ error: "no data found" });
    } else {
      res.status(200).send(data);
    }
  });
});
router.patch("/garages", authCheck, async (req, res) => {
  const data = req.body;
  const garages = await Garages.findOne({ wilaya: data.wilaya });
  const myGarages = [];
  const garName = data.garage.name.trim().split(/\s+/).join(" ");
  data.garage.name = garName;
  data.garage.longitude = parseFloat(data.garage.longitude);
  data.garage.latitude = parseFloat(data.garage.latitude);
  for (const [key, value] of Object.entries(garages.garages)) {
    if (value["name"].trim() === garName) {
      return res.status(504).send({ error: "mechanic already exists" });
    }
    myGarages.push({ key, value });
  }
  // adding new garage
  const garname = "garage" + (myGarages.length + 1);
  myGarages.push({ key: garname, value: data.garage });
  let updatedGarages = {};
  for (const [key, value] of Object.entries(myGarages)) {
    updatedGarages[value.key] = value.value;
  }
  // new garages added
  console.log(updatedGarages);
  // updating here
  Garages.updateOne({ _id: garages._id }, { $set: { garages: updatedGarages } })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(504).send({ error: "couldn't update" });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(504)
        .send({ error: "Something went wrong! ... Sorry Try Again" });
    });
});
router.delete("/garages", async (req, res) => {
  const data = req.body;
  const doc = await Garages.findOne({ wilaya: data.wilaya });
  const garName = data.garage.name.trim().split(/\s+/).join(" ");
  data.garage.name = garName;
  // console.log(doc.garages);
  console.log(data.garage.name);
  let updatedgarages = {};
  for (const [key, value] of Object.entries(doc.garages)) {
    console.log(key + " its value is \t" + value.name, "\n");
    if (value.name.trim() === data.garage.name.trim()) {
      continue;
    } else {
      updatedgarages[key] = value;
    }
  }
  Garages.updateOne(
    { wilaya: data.wilaya },
    { $set: { garages: updatedgarages } }
  )
    .exec()
    .then((data) => {
      if (!data) {
        res.status(504).send(false);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(504).send(false);
    });
});

module.exports = router;
