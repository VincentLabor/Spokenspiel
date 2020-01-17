const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Friend = require("../models/Friend");
const User = require("../models/User");

//@route    GET /api/contacts
//@desc     Grabs all of the users contacts
//@access   Private - Need to be logged/Auth to see contacts
router.get("/", auth, async (req, res) => {
  try {
    //This is to find the contacts this user has.
    const friendsList = await Friend.find({ requester: req.user._id }); //Contacts contains the user field. auth gives access to req.user
    res.json(friendsList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//@route    POST /api/contacts
//@desc     Adds to a users contacts
//@access   Private - Need to be logged/Auth to see contacts
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
        friendStatus: 1
      });

      //Recipient receives a request to be a friend
      const friendRequest = await User.findById(req.user._id).select(
        "-password"
      );

      if (!friendRequest) return res.sendStatus(404);

      const receiveFriendReq = new Friend({
        userName: friendRequest.userName,
        name: friendRequest.name,
        recipient: req.user._id,
        requester: findingFriend[0]._id,
        friendStatus: 2
      });

      //Update the requester and recipients friend request list
      const updateRequester = await User.findByIdAndUpdate(req.user._id, {
        $set: { friends: findingFriend[0]._id }
      });
      const updateRecipient = await User.findByIdAndUpdate(
        findingFriend[0]._id,
        { $set: { friends: req.user._id } }
      );

      const newFriend = await friender.save();
      const getFriendReq = await receiveFriendReq.save();

      res.json({ friendA: newFriend, friendB: getFriendReq }); //This allows for both of the objects to be sent via res.json
    } catch (error) {
      console.log(error);
      // res.sendStatus(500);
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
  //Change the requesters friendstatus to friends

  try {
    //The receivers friendsstatus
    let receiversFriendReq = await Friend.findById(req.params.id); //This is good
    //  console.log(receiversFriendReq);

    if (!receiversFriendReq) return res.send({msg: "Checkpoint 1"})

    let updFriendStatusReq = await Friend.findByIdAndUpdate(
      receiversFriendReq,
      { $set: { friendStatus: 3 } }
    );

    //The requesters friendsstatus
    // let requestersFriendReq = await Friend.findById(req.user._id, (err,hsend)=>console.log(err)); //This is not.
    // // console.log(typeof req.user._id);
    // if (!requestersFriendReq) return res.send({msg: "Checkpoint 2"})
    // let updReceiveStatus = await Friend.findByIdAndUpdate(req.user._id, {
    //   $set: { friendStatus: 3 }
    // }); 
    //, (err, continues)=> {if(err) res.send({msg: "Checkpoint 2"})}

    const requestersFriendReq = await Friend.find({recipient: req.user._id});
    if(!requestersFriendReq) return res.sendStatus(404);
    const updateRequesterFriend = await Friend.findOneAndUpdate({recipient: req.user._id}, {$set: {friendStatus: 3}});

    res.json({msg: "Both of the users are now friends"});

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

//@route    PUT /api/contacts/decline/:id
//@desc     This is to update contacts: To reject specifically
//@access   Private: Need to be logged to see contacts.
router.put("/decline/:id", auth, async (req, res) => {
  //Change the requesters friendstatus to friends

  try {
    //This deletes the entire friend to friend relationship within the receiver
    const receiversFriendReq = await Friend.findById(req.params._id);
    if (!receiversFriendReq) return res.sendStatus(404);
    const rejectReceiversReq = await Friend.findByIdAndDelete(req.params._id);

    //This deletes the entire friend to friend relation within the requester.
    const requestersFriendReq = await Friend.findById(req.user._id);
    if (!requestersFriendReq) return res.sendStatus(404);
    const rejectRequesterReq = await Friend.findByIdAndDelete(req.user._id);

    //Remove the friendId from both of the parties involved.
    const removeUsersFriendIdReq = await User.findByIdAndUpdate(req.user._id, {
      $pull: { friends: req.params._id }
    });
    const removeRequestedFriendId = await User.findByIdAndUpdate(
      req.params._id,
      { $pull: { friends: req.user._id } }
    );

      res.json({msg: "The friend request was cancelled"});

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

//@route    DELETE /api/friends/:id
//@desc     Delete contacts
//@access   Private: Need to be logged to see contacts.

router.delete("/:id", auth, async (req, res) => {
  try {
    let findFriend = await Friend.findById(req.params.id); //req.params is an object. the route :id is why it is req.params.id

    if (!findFriend) return res.sendStatus(404);
    if (findFriend.user.toString() !== req.user._id) return res.sendStatus(404); //This is to prevent people from deleting other peoples friendslists.

    let removeFriend = await Friend.findByIdAndDelete(req.params.id);

    res.json({ msg: "Contact has been removed" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

module.exports = router;
