const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  First_name: String,
  Last_name: String,
  Email: String,
  Password: String,
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
