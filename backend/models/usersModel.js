const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
