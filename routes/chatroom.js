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
    $or: [{ user1: req.user._id }, { user2: req.user._id }],
  });

  try {
    res.json(userInChatroom);
  } catch (err) {
    console.log(err);
  }
});

//@route    GET /api/chatroom/find/${chatroomIdd}
//@desc     Grab a specific chatrooms data
//@access   Private: To only be seen by those within the room
router.get("/find/:id", auth, async (req, res) => {
  let specificChatroom = await Chatroom.findById(req.params.id);
  try {
    res.json(specificChatroom);
  } catch (err) {
    console.log(err);
  }
});

//@route    GET /api/chatroom/genChat
//@desc     This entesr user into the general chat
//@access   Public: To only be seen by those within the room
router.get("/genChat", async (req, res) => {
  let findGenChat = await Chatroom.find({ user1: null });

  try {
    res.json(findGenChat);
  } catch (err) {
    console.log(err);
  }
});

//@route    GET /api/chatroom/msgs/${chatroomData}
//@desc     This will grab the messages from the database
//@access   Private: To only be seen by those logged in
router.get("/msgs/:id", auth, async (req, res) => {
  let msgsInChatroom = await Chatroom.findByIdAndUpdate(req.params.id);

  try {
    res.json(msgsInChatroom);
  } catch (err) {
    console.log(err);
  }
});

//@route    put /api/chatroom/userWhoSentLastMsg/${chatroomId}
//@desc     This will save the user who sent the last msg
//@access   Private: To only be seen by those logged in
router.put("/userWhoSentLastMsg/:id", auth, async (req, res) => {
  let chatroomsLastSender = await Chatroom.findByIdAndUpdate(req.params.id, {
    $set: { lastUserToSendMsg: req.user._id },
  });

  try {
    res.json(chatroomsLastSender);
  } catch (error) {
    console.log(error);
  }
});

//@route    put /api/chatroom/unreadMsgs/${chatroomId}
//@desc     This sets the unread message counter.
//@access   Private: To only be seen by those logged in
router.put("/unreadMsgs/:id", auth, async (req, res) => {
  const { msgCounter } = req.body;
  let currentChatroom = await Chatroom.findByIdAndUpdate(req.params.id, {
    $set: { msgCount: msgCounter },
  });

  try {
    res.json(currentChatroom);
  } catch (error) {
    console.log(error);
  }
});

//@route    get /api/chatroom/unreadMsgs/${chatroomId}
//@desc     This grabs the the unread messages counter
//@access   Private: To only be seen by those logged in
router.get("/unreadMsgs/:id", auth, async (req, res) => {
  let currentChatroom = await Chatroom.findById(req.params.id);

  try {
    res.json(currentChatroom);
  } catch (error) {
    console.log(error);
  }
});

//@route    put /api/chatroom/unreadMsgs/removeCounterAndLastUser/${chatroomId}
//@desc     This removes the the unreadmsgs counter and the last usre who sent a message
//@access   Private: To only be seen by those logged in
router.put(
  "/unreadMsgs/removeCounterAndLastUser/:id",
  auth,
  async (req, res) => {
    let currentChatroom = await Chatroom.findByIdAndUpdate(req.params.id, {
      $set: { msgCount: 0, lastUserToSendMsg: null },
    });

    try {
      res.json(currentChatroom);
    } catch (error) {
      console.log(error);
    }
  }
);

//@route    PUT /api/chatroom/msgs/${chatroomData}
//@desc     This is to grab the specific chatroom ID from clicking on a conversation
//@access   Private: To only be seen by those logged in
router.put("/msgs/:id", auth, async (req, res) => {
  const { currentMsgSent } = req.body; //This is being accessed through the parameter JSON object
  let userInChatroom = await Chatroom.findByIdAndUpdate(req.params.id, {
    $push: { messages: currentMsgSent },
  });

  try {
    res.json(userInChatroom);
  } catch (err) {
    console.log(err);
  }
});

//@route    GET /api/chatroom/:id
//@desc     This is search for a chatroom.
//@access   Private: To only be seen by those within the room
router.get("/:id", auth, async (req, res) => {
  let currentUserName = await User.findById(req.user._id);
  let otherUsersName = await User.findById(req.params.id);

  let chatroomExists = await Chatroom.find({
    $and: [
      { usersWithinChatroom: currentUserName.userName },
      { usersWithinChatroom: otherUsersName.userName },
    ],
  });

  //This returns an array which includes the entire chatroom information.
  try {
    res.json(chatroomExists);
  } catch (error) {
    console.log(error);
  }
});

//@route    GET /api/chatroom/friend/:friendId
//@desc     This is search for a chatroom.
//@access   Private: To only be seen by those within the room
router.get("/friend/:friendId", auth, async (req, res) => {
  let currentUserName = await User.findById(req.user._id);
  let otherUsersName = await User.findById(req.params.id);

  let chatroomExists = await Chatroom.find({
    $and: [
      { usersWithinChatroom: currentUserName.userName },
      { usersWithinChatroom: otherUsersName.userName },
    ],
  });

  //This returns an array which includes the entire chatroom information.
  try {
    res.json(chatroomExists);
  } catch (error) {
    console.log(error);
  }
});

//@route    POST /api/chatroom/:id
//@desc     This is to create a room and add 2 users to it.
//@access   Private: To only be seen by those within the room
router.post("/:id", auth, async (req, res) => {
  let currentUserName = await User.findById(req.user._id);
  let otherUsersName = await User.findById(req.params.id);

  // let alreadyExists = await

  try {
    const addingUsersToRoom = new Chatroom({
      user1: req.user._id,
      user1Name: currentUserName.userName,
      user2: req.params.id,
      user2Name: otherUsersName.userName,
      usersWithinChatroom: [currentUserName.userName, otherUsersName.userName],
      isHidden: false,
      lastUserToSendMsg: null,
      msgCount: null,
    });

    //To delete later. Reference for creating general chat
    const chatForAll = new Chatroom({
      messages: "Please be respectful to eachother",
    });

    const newChatroom = addingUsersToRoom.save();
    //  const genChat = chatForAll.save();
    res.json(addingUsersToRoom);
  } catch (err) {
    console.log(err);
  }
});

//@route    PUT /api/chatroom/:chatroomID
//@desc     This is change the visibility of a chatroom
//@access   To only be seen between the users involved with the chatroom
router.put("/:id", auth, async (req, res) => {
  let chatroomToBeEdited = await Chatroom.findByIdAndUpdate(req.params.id, {
    $set: { isHidden: true },
  });

  try {
    res.json(chatroomToBeEdited);
  } catch (error) {
    console.log(error);
  }
});
//@route    PUT /api/chatroom/show/:chatroomID
//@desc     This is change the visibility of a chatroom
//@access   To only be seen between the users involved with the chatroom
router.put("/show/:id", auth, async (req, res) => {
  let chatroomToBeEdited = await Chatroom.findByIdAndUpdate(req.params.id, {
    $set: { isHidden: false },
  });

  try {
    res.json(chatroomToBeEdited);
  } catch (error) {
    console.log(error);
  }
});

//@route    put /api/chatroom/removal/:id
//@desc     This is to delete chatrooms after a friend is deleted
//@access   Private: To only be seen by those within the room
router.put("/removal/:id", auth, async (req, res) => {
  let currentUserName = await User.findById(req.user._id);
  let otherUsersName = await User.findById(req.params.id);

  let chatroomExists = await Chatroom.find({
    $and: [
      { usersWithinChatroom: currentUserName.userName },
      { usersWithinChatroom: otherUsersName.userName },
    ],
  });

  let removeChatroom = await Chatroom.findByIdAndUpdate(chatroomExists, {
    $set: { isHidden: true },
  });

  //This returns an array which includes the entire chatroom information.
  try {
    res.json(removeChatroom);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
