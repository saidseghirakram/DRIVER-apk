const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //   fullName: {
  //     type: String,
  //     required: true,
  //   },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  postsAdded: Number,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
