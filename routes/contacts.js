const express = require('express');
const router = express.Router();


//@route    GET /api/contacts
//@desc     Grabs all of the users contacts
//@access   Private - Need to be logged/Auth to see contacts
router.post("/", (req,res)=>{ // The / refers to /api/users
    res.send('Get contacts');
});

//@route    POST /api/contacts
//@desc     Adds to a users contacts
//@access   Private - Need to be logged/Auth to see contacts
router.post("/", (req,res)=>{ // The / refers to /api/users
    res.send('Add contacts');
});

//We add /:id as a placeholder for the contacts that we may wish to add. 
//@route    PUT /api/contacts/:id
//@desc     This is to update contacts
//@access   Private: Need to be logged to see contacts.
router.put("/:id", (req,res)=>{ // The / refers to /api/users
    res.send('Update a users contact');
});


//@route    DELETE /api/contacts/:id
//@desc     Delete contacts
//@access   Private: Need to be logged to see contacts.
router.delete("/:id", (req,res)=>{ // The / refers to /api/users
    res.send('Delete a users contact');
});

module.exports = router;