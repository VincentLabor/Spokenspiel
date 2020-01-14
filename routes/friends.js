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

    const { userName, name } = req.body;

    try {
      let findingFriend = await User.find({ userName }).select("-password");

      if (!findingFriend[0].userName) return res.sendStatus(400);

      const friender = new Friend({
        userName,
        name,
        user: req.user._id
      });

      const newFriend = await friender.save();

      res.json(newFriend);
    } catch (error) {
      console.log(error);
      // res.sendStatus(500);
      return res.sendStatus(400);
    }
  }
);

//We add /:id as a placeholder for the contacts that we may wish to add.
//Probably don't need updating contacts. Will change if updating contacts becomes necessary
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
