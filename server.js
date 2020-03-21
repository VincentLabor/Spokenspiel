const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/db");
const index = require("./routes/index");

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

const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const server = http.createServer(app);
const io = socketIo(server);
const getApiAndEmit = "Hello World";

const users = [];
io.on("connection", socket => {
  let addedUser = false;
  console.log("A user has joined!");
  //  socket.on('join', ({name,room},callback)=>{
  //   socket.join(room);
  //  });

 socket.on("send Username", username => {
   if (addedUser) return;
   socket.username = username;
   users.push(socket.username);
   addedUser = true;
   console.log(socket.username);
   socket.emit("send Username", socket.username); //can do last of array. How to make separate element based on the username
  });

  socket.on("chat message", (msg, callback) => {
    io.emit("chat message", msg); //This allows for both users to see the message
    console.log("sending msg from " + socket.username + ": " + msg);
    callback(); //Having this enables the frontend to have a callbackfunction.
  });

  // socket.on("join room", () => {
  //   // io.to('join room').emit("chat message");
  //   console.log("Someone has joined the room!!!!!!!!!@!@!!!");
  // });

  const error = false;

  // socket.on("sendMessage", (message, callback) => {
  //   //Here the backend will be waiting for the front end
  //   io.emit("message", message);
  //   callback();
  // });

  socket.on("disconnect", () => {
    console.log("client has disconnected");
  });
});

app.use(index);
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
