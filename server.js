const express = require("express");
const app = express();
const connectDB = require("./config/db");
const index = require("./routes/index");
const path = require("path");

connectDB();

app.use(express.json({ extended: false }));

//These routes will then require module.exports = router; on each route file.
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/chatroom", require("./routes/chatroom"));

const PORT = process.env.PORT || 5000;

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user has joined!");

  socket.on("chat message", () => {
    //Listens for "chat message"
    io.emit("sendTypedMsg");
  });

  socket.on("disconnect", () => {
    console.log("client has disconnected");
  });
});

//Serve react in production.
//First we check if the environment is production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(index);
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
