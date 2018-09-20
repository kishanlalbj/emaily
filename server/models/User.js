const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleID: String,
  name: String,
  email: String
});

module.exports = User = mongoose.model("users", UserSchema);
