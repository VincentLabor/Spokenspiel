const express = require("express");
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

const users = [];
io.on("connection", socket => {
  let addedUser = false;
  console.log("A user has joined!");

  socket.on("chat message", (msg, callback) => { //Listens for "chat message"
    socket.emit("serverToClient", msg); //This allows for both users to see the message
    console.log("sending msg from " + socket.username + ": " + msg);
    socket.broadcast.emit("sendTypedMsg")
    callback(); //Having this enables the frontend to have a callbackfunction.
  });

    socket.on("goesSomewhere",room =>{
      
    })
  // io.use((socket,next)=>{
  //   if(socket.request.headers.cookie) return next();
  //   next(new Error('Authentication error'));
  // });

  socket.on("disconnect", () => {
    console.log("client has disconnected");
  });
});

app.use(index);
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
