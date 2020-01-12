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

    const findingFriend = await User.find({userName});

    if (!findingFriend) {
      res.sendStatus(400);
    }

    const friend = new Friend({
      userName,
      name,
      user: req.user._id
    });

    const newFriend = await friend.save();
    res.json(newFriend);

    try {
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

//We add /:id as a placeholder for the contacts that we may wish to add.
//@route    PUT /api/contacts/:id
//@desc     This is to update contacts
//@access   Private: Need to be logged to see contacts.
router.put("/:id", auth, (req, res) => {
  res.send("Update a users contact");
});

//@route    DELETE /api/contacts/:id
//@desc     Delete contacts
//@access   Private: Need to be logged to see contacts.
router.delete("/:id", auth, (req, res) => {
  res.send("Delete a users contact");
});

module.exports = router;
