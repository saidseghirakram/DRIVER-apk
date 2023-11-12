const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mapStyleSchema = new Schema({
  map: String,
  styling: Array,
});
const MapStyle = mongoose.model("mapStyle", mapStyleSchema);
module.exports = MapStyle;
