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


router.post("/:id", auth, async (req, res) => {
  const getUsersInChatroom = Friend.findById(req.params.id);

  try {
    const addingUsersToRoom = new Chatroom({
      user1: getUsersInChatroom.requester,
      user2: getUsersInChatroom.recipient
    });

    const newChatroom = addingUsersToRoom.save();
    res.json(addingUsersToRoom);

    // if(createRoomUser1 || createRoomUser2) This is for a check to see if they already have a room where they are talking
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
