const express = require("express");
const router = express.Router();
const Chatroom = require("../models/Chatroom");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Friend = require("../models/Friend");
const User = require("../models/User");

//@route    GET /api/chatroom
//@desc     This is to get users in the chatroom
//@access   Private: To only be seen by those within the room
router.get("/", auth, async (req, res) => {

  //Here these will be used as conditionals to send to front end the name of the friend in the conversation
  let userInChatroom1 = await User.find({ user1: req.user._id });
  let userInChatroom2 = await User.find({user2: req.user._id});

  try {
    
    res.json(userInChatroom1);
  } catch (err) {
    console.log(err);
  }
});

router.post("/:id", auth, async (req, res) => {
  try {
    const addingUsersToRoom = new Chatroom({
      user1: req.user._id,
      user2: req.params.id
    });

    const newChatroom = addingUsersToRoom.save();
    res.json(addingUsersToRoom);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
