const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  
  userName: { type: String, required: true },
  userIsOnline:{type: boolean, required: true}
});
