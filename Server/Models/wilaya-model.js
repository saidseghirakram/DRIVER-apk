const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const wilayaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
});

const Wilaya = mongoose.Model("wilaya", wilayaSchema);

module.exports = Wilaya;
