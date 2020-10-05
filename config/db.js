const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); //default.json file is global. 

const connectDB = async () => {
  try {

    //Accesses db through proper credentials
   await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    });
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error.message);
    ProcessingInstruction.exit(1);
  }
};

module.exports = connectDB;
