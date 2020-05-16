const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //This will look into the collection of users to find the specific users.
  user1Name:{type:String},
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
  user2Name: {type:String},
  messages: [{type: String}],
  usersWithinChatroom: [{type: String}]
});

module.exports = mongoose.model("chatroom", ChatroomSchema);
