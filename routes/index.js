const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    res.send({response: "I am alive and well"});
})

module.exports = router;