const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Friend = require("../models/Friend");
const User = require("../models/User");

//@route    GET /api/Friends
//@desc     Grabs all of the users Friends
//@access   Private - Need to be logged/Auth to see Friends
router.get("/", auth, async (req, res) => {
  
  try {
    let usersFriendsList = await User.find({ friends: req.user._id });

    res.json(usersFriendsList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//@route    GET /api/Friends
//@desc     Will grab Users friend Requests
//@access   Private - Need to be logged/Auth to see Friend requests
router.get("/friendRequests", auth, async (req, res) => {
  try {
    let usersFriendsList = await Friend.find({
      recipient: req.user._id,
      friendStatus: 1
    });

    res.json(usersFriendsList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//@route    POST /api/Friends
//@desc     Adds to a users Friends
//@access   Private - Need to be logged/Auth to see Friends
router.post(
  "/",
  [
    auth,
    [
      check("userName", "Please enter a Username")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }

    const { userName } = req.body;

    try {
      //User sends a friend request
      let findingFriend = await User.find({ userName }).select("-password");

      if (!findingFriend[0].userName) return res.sendStatus(400);

      const friender = new Friend({
        userName,
        name: findingFriend.name,
        requester: req.user._id,
        recipient: findingFriend[0]._id,
        friendStatus: 2
      });

      //Recipient receives a request to be a friend
      const friendRequest = await User.findById(req.user._id).select(
        "-password"
      );

      if (!friendRequest) return res.sendStatus(404);

      const friendRequester = new Friend({
        userName: friendRequest.userName,
        name: friendRequest.name,
        requester: req.user._id,
        recipient: findingFriend[0]._id,
        friendStatus: 1
      });

      const newFriend = await friender.save();
      const getFriendReq = await friendRequester.save();

      res.json({ friendA: newFriend, friendB: getFriendReq }); //This allows for both of the objects to be sent via res.json
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
);

//We can use the put route for something that requires us to update the friend request maybe which will work out in the end. Just need to think about the idea.
//We add /:id as a placeholder for the contacts that we may wish to add.
//This will be to update when the user declines or accepts the friendrequest.

//@route    PUT /api/friends/accept/:id
//@desc     This is to update contacts
//@access   Private: Need to be logged to see contacts.
router.put("/accept/:id", auth, async (req, res) => {
  //Here we are getting the objectId of the friend requester in order to change the friendstatus to 3

  const { userName } = req.body;
  //Change the requesters friendstatus to friends
  try {
    //The receivers friendsstatus
    let receiversFriendReq = await Friend.findById(req.params.id);

    if (!receiversFriendReq) return res.send({ msg: "Checkpoint 1" });
    let updFriendStatusReq = await Friend.findByIdAndUpdate(
      receiversFriendReq,
      { $set: { friendStatus: 3 } }
    );

    //The requesters friendsstatus
    const requestersFriendReq = await Friend.find({
      recipient: req.user._id,
      requester: receiversFriendReq.requester,
      userName: req.user.userName
    });

    if (!requestersFriendReq) return res.sendStatus(404);
    const updateRequesterFriend = await Friend.findOneAndUpdate(
      { recipient: req.user._id },
      { $set: { friendStatus: 3 } }
    );

    //Grabs values from
    const recipFriendsReq = await User.findById(receiversFriendReq.recipient);
    const reqFriendRequest = await User.findById(receiversFriendReq.requester);

    const updateRequester = await User.findByIdAndUpdate(recipFriendsReq._id, {
      $push: { friends: reqFriendRequest._id }
    });

    const updateReceiver = await User.findByIdAndUpdate(reqFriendRequest._id, {
      $push: { friends: recipFriendsReq._id }
    });

    res.json({ receiversFriendReq, requestersFriendReq });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

//@route    PUT /api/friends/decline/:id
//@desc     This is to update contacts: To reject specifically
//@access   Private: Need to be logged to see contacts.
router.put("/decline/:id", auth, async (req, res) => {
  //Change the requesters friendstatus to friends

  try {
    let receiversFriendReq = await Friend.findById(req.params.id); //Good
    if (!receiversFriendReq) return res.send({ msg: "checkpoint 1" });

    const requestersFriendReq = await Friend.find({ recipient: req.user._id }); //Good
    if (!requestersFriendReq) return res.send({ msg: "checkpoint 2" });

    const recipFriendsList = await User.findById(receiversFriendReq.recipient);
    const ReqFriendsList = await User.findById(receiversFriendReq.requester);

    //Remove the friendId from both of the parties involved.
    const removeRequestedFriendId = await User.findByIdAndUpdate(
      recipFriendsList._id,
      { $pull: { friends: ReqFriendsList._id } }
    );

    const removeUsersFriendIdReq = await User.findByIdAndUpdate(
      ReqFriendsList._id,
      {
        $pull: { friends: recipFriendsList._id }
      }
    );

    //This deletes the entire friend to friend relationship within the receiver
    const rejectReceiversReq = await Friend.findByIdAndDelete(req.params.id);

    //This deletes the entire friend to friend relation within the requester.
    const rejectRequesterReq = await Friend.findOneAndDelete({
      recipient: req.user._id
    });

    res.json({ msg: "The friend request was cancelled" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

//@route    DELETE /api/friends/:id
//@desc     Delete contacts
//@access   Private: Need to be logged to see contacts.

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    let removeUsersFriend = await User.findById(req.user._id);
    let removeUserFromFriend = await User.findById(req.params.id);

    let removedTheUsersFriend = await User.findByIdAndUpdate(
      removeUsersFriend._id,
      { $pull: { friends: removeUserFromFriend._id } }
    );
    let removedUsersFromFriend = await User.findByIdAndUpdate(
      removeUserFromFriend._id,
      { $pull: { friends: removeUsersFriend._id } }
    );

  // This deletes the variation of friendships in the friend database

    let deleteFriend = await Friend.findOneAndDelete({
      requester: removeUsersFriend._id,
      recipient: removeUserFromFriend._id,
      userName: removeUsersFriend.userName
    });
    let deleteOtherFriend = await Friend.findOneAndDelete({
      requester: removeUsersFriend._id,
      recipient: removeUserFromFriend._id,
      userName: removeUserFromFriend.userName
    });

    let deleteFriends = await Friend.findOneAndDelete({
      requester: removeUserFromFriend._id,
      recipient: removeUsersFriend._id,
      userName: removeUsersFriend.userName
    });
    let deleteOtherFriender = await Friend.findOneAndDelete({
      requester: removeUserFromFriend._id,
      recipient: removeUsersFriend._id,
      userName: removeUserFromFriend.userName
    });

    res.json({ msg: "Friends have been deleted" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

module.exports = router;
