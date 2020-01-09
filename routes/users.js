const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST /api/users
//@desc     Register users
//@access   Public - To register and become a user.
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("userName", "Please create a Username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with atleast 6 or more characters"
    ).isLength({ min: 6 })
    //Remember to add a check that determines if the password typed in resembles the the first password typed in.
  ],
  async (req, res) => {
    const errors = validationResult(req); //Will catch any errors from checking
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //res status will return 400 if there is an issue and the rest will display the issue.
    }

    const { userName, email, password, name } = req.body;

    try {

      //This will catch if the email is already in use in the database
      let emailTaken = await User.findOne({ email });
      console.log(emailTaken)
      if (emailTaken) {
        res.status(400).json({
          msg: "Email is already in use. Please enter a different Email"
        });
      }

      //This will catch if the Username is already in use in the database
      let userNameTaken = await User.findOne({ userName });
      if (userNameTaken) {
        res.status(400).json({
          msg: "Username is already in use. Please enter a different Username"
        });
      }

      //This is the model, a constructor from the schema.
      user = new User({
        name,
        password,
        userName,
        email
      });

      //Hash the password 10 times and store the hash into the database.
      const salt = 10;
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //This will authenticate the user using tokens 
      jwt.sign({_id: user._id}, config.get("jwtSecrets"),{
        expiresIn: 36000
      },(error,token)=>{
        if (error) throw error;
        res.json({token}); //Returns the token
      } )

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
