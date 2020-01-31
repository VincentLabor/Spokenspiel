const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");
const isOnline = require('../middleware/isOnline');

//@route    GET /api/auth
//@desc     This is to get logged in user
//@access   Private: we are grabbing a user.
router.get("/",[auth] , async (req, res) => { //auth has to go before isOnline because that is how the user gets verified
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json(user);
  } catch (err) {
    // console.log(err);
    res.sendStatus(500);
  }
});

//@route    POST /api/auth
//@desc     This is us sending data to auth
//@access   Public: we are trying to get a token
router.post(
  "/",
  [
    check("userName", "Please enter a valid Username").exists(), //Checks if the username exists
    // check("email", "Please include a valid email").isEmail(),
    // check("password", "Please enter a password") //Checks if the entered a password
    //   .not()
    //   .isEmpty(),
     check("password", "Please enter a valid password").exists() //Checks if the password exists
  ],
  async (req, res) => {
    const { userName, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const enteredUserName = await User.findOne({ userName }); //This will grab the entire entry from mongodb
      if (!enteredUserName) {
        res.status(400).json({ msg: "The Username and/or Password are invalid." });
      }

      // const matchedEmail = await User.findOne({email});
      // if(matchedEmail){
      //   res.status(400).json({msg: "The email entered already exists"});
      // }

      const match = await bcrypt.compare(password, enteredUserName.password);
      if (!match) {
        res.status(400).json({ msg: "The Username and/or Password are invalid." });
      }

      jwt.sign(
        { _id: enteredUserName._id },
        config.get("jwtSecrets"),
        {
          expiresIn: 36000000
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
