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
    const friends = await Friend.find({ user: req.user._id }).sort({
      userName: "asc"
    }); //Contacts contains the user field. auth gives access to req.user
    res.json(friends);
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

      console.log(findingFriend);

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

      res.json({friendA: newFriend, friendB: getFriendReq}); //This allows for both of the objects to be sent via res.json

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

//@route    PUT /api/contacts/:id
//@desc     This is to update contacts
//@access   Private: Need to be logged to see contacts.
// router.put("/:id", auth, (req, res) => {
//   res.send("Update a users contact");
// });

//@route    DELETE /api/contacts/:id
//@desc     Delete contacts
//@access   Private: Need to be logged to see contacts.

router.delete("/:id", auth, async (req, res) => {
  try {
    let findFriend = await Friend.findById(req.params.id); //req.params is an object. the route :id is why it is req.params.id

    if (!findFriend) return res.sendStatus(404);
    if (findFriend.user.toString() !== req.user._id) return res.sendStatus(404); //This is to prevent people from deleting other peoples friendslists.
    console.log(typeof findFriend.user);
    console.log(typeof req.user._id);
    let removeFriend = await Friend.findByIdAndDelete(req.params.id);

    res.json({ msg: "Contact has been removed" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

module.exports = router;
