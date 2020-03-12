import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
//we have to import users username here later

let socket;

const Message = ({ message, auth: { user } }) => {
  const [username, setUsername] = useState("");

  let sentByCurrentUser = false;
  const endpoint = "localhost:5000";
  socket = io(endpoint);

   useEffect(() => {
    socket.emit("send Username", user.userName);
    socket.on("send Username", data => {

      setUsername(data);
    });
   },[user]);

 
  return (
    <div className="messageContainer backgroundBlue">
      <p className="colorWhite">
        {username}: {message}
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Message);
