const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //This will look into the collection of users to find the specific users.
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
  messages: [{type: String}]
});

module.exports = mongoose.model("chatroom", ChatroomSchema);
