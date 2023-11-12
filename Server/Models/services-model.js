const mongoose = require("mongoose");

const schema = mongoose.Schema;

const deppanageSchema = new schema({
  wilaya: {
    type: String,
    required: true,
    unique: true,
  },
  dep: {
    type: Object,
    required: true,
  },
});
const mechanicSchema = new schema({
  wilaya: {
    type: String,
    required: true,
    unique: true,
  },
  mechanics: {
    type: Object,
    required: true,
  },
});

const parkingSchema = new schema({
  wilaya: {
    type: String,
    required: true,
    unique: true,
  },
  parkings: {
    type: Object,
    required: true,
  },
});
const RestaurantSchema = new schema({
  wilaya: {
    type: String,
    required: true,
    unique: true,
  },
  restaurants: {
    type: Object,
    required: true,
  },
});
const hotelSchema = new schema({
  wilaya: {
    type: String,
    required: true,
    unique: true,
  },
  hotels: {
    type: Object,
    required: true,
  },
});

const garageSchema = new schema({
  wilaya: {
    type: String,
    required: true,
    unique: true,
  },
  garages: {
    type: Object,
    required: true,
  },
});

// models
const Garages = mongoose.model("Garages", garageSchema);
const Hotels = mongoose.model("Hotels", hotelSchema);
const Parking = mongoose.model("Parking", parkingSchema);
const Mechanic = mongoose.model("Mechanic", mechanicSchema);
const Deppanage = mongoose.model("Deppanage", deppanageSchema);
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

//exporting models

module.exports = { Mechanic, Deppanage, Parking, Restaurant, Hotels, Garages };
