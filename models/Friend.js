const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //This will look into the collection of users to find the specific users.
  userName: { type: String, required: true },
  userIsOnline: { type: Boolean, required: true }
});

module.exports = mongoose.model("friend", FriendSchema);
