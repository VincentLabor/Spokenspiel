const express = require('express');
const router = express.Router();


//@route    POST /api/users
//@desc     Register users
//@access   Public - To register and become a user. 
router.post("/", (req,res)=>{ // The / refers to /api/users
    res.send('Register a user');
});

module.exports = router;