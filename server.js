const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/db");
const index = require('./routes/index');

connectDB();

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to the spokenSpiel API" });
// });

app.use(express.json({ extended: false }));

//These routes will then require module.exports = router; on each route file.
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/chatroom", require("./routes/chatroom"));

const PORT = process.env.PORT || 5000;

const http = require("http")
const socketIo = require("socket.io");
const axios = require('axios');

const server = http.createServer(app);
const io = socketIo(server);
const getApiAndEmit = 'Hello World';

io.on("connection", (socket)=>{
  console.log("A user has joined!");
   socket.on('join', ({name,room},callback)=>{
    socket.join(room);
    
    console.log("room")
   });

  const error = false;

  socket.on("chat message", (msg, callback)=>{
    io.emit('chat message', msg)
    callback(); //Having this enables the frontend to have a callbackfunction. 
  })

  socket.on("sendMessage", (message, callback)=>{ //Here the backend will be waiting for the front end
    io.emit('message', message)
    callback();
  })  

  socket.on("disconnect", ()=>{          
    console.log("client has disconnected")
  })
})

app.use(index);
server.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)});