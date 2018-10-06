const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  credits: {
    type: Number,
    default: 0
  }
});

module.exports = User = mongoose.model("users", UserSchema);
