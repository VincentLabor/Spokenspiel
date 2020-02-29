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
  try {
    let userInChatroom1 = await User.find({ chatrooms: req.user._id });
    res.json(userInChatroom1);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", auth, async (req, res) => {
  const { _id } = req.body;

  const checkRoomExists = User.find({ user1: req.user._id, user2: _id });
  const checkRoomExistsTwice = User.find({ user2: _id, user1: req.user._id });

  if (checkRoomExists || checkRoomExistsTwice) {
    return res.sendStatus(500);
  }

  try {
    const addingUsersToRoom = new Chatroom({
      user1: req.user._id,
      user2: req.body._id
    });

    const newChatroom = addingUsersToRoom.save();
    res.json(addingUsersToRoom);

    // if(createRoomUser1 || createRoomUser2) This is for a check to see if they already have a room where they are talking
  } catch (err) {}
});
module.exports = router;
