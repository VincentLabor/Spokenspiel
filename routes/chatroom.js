const express = require("express");
const router = express.Router();
const Chatroom = require("../models/Chatroom");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Friend = require("../models/Friend");
const User = require("../models/User");

//@route    GET /api/chatroom
//@desc     This is to get the user's different chatrooms
//@access   Private: To only be seen by those within the room
router.get("/", auth, async (req, res) => {
  //Here these will be used as conditionals to send to front end the name of the friend in the conversation
  let userInChatroom = await Chatroom.find({
    $or: [{ user1: req.user._id }, { user2: req.user._id }]
  });

  try {
    res.json(userInChatroom);
  } catch (err) {
    console.log(err);
  }
});

//@route    POST /api/chatroom/:id
//@desc     This is to create a room and add 2 users to it.
//@access   Private: To only be seen by those within the room
router.post("/:id", auth, async (req, res) => {
  let currentUserName =await User.findById(req.user._id);
  let otherUsersName = await User.findById(req.params.id);

  try {
    const addingUsersToRoom = new Chatroom({
      user1: req.user._id,
      user1Name: currentUserName.userName,
      user2: req.params.id,
      user2Name: otherUsersName.userName
    });

    const newChatroom = addingUsersToRoom.save();
    res.json(addingUsersToRoom);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
