const express = require('express');
const router = express.Router();


//@route    GET /api/auth
//@desc     This is to get logged in user
//@access   Private: we are grabbing a user.
router.get("/", (req,res)=>{ // The / refers to /api/users
    res.send('Get logged in user');
});

//@route    POST /api/auth 
//@desc     This is us sending data to auth
//@access   Public: we are trying to get a token
router.post("/", (req,res)=>{ // The / refers to /api/users
    res.send('Login in user');
});

module.exports = router;