const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //This will look into the collection of users to find the specific users.
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
  userName: { type: String },
  name: { type: String },
  userIsOnline: { type: Boolean},
  friendStatus: {type: Number, enums: [0,1,2,3]}
  //0 = Send Friend request
  //1 = requested to be friends
  //2 = pending friend request
  //3 = Users are now friends
});

module.exports = mongoose.model("friend", FriendSchema);
