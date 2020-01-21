const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "friend" }]
  //Maybe create a listener that see if the user is logged in, then status will appear as logged in.
});

module.exports = mongoose.model("user", UserSchema);
