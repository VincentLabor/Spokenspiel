import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { saveSentMsgs } from "../../../actions/chatroomActions";
//we have to import users username here later

let socket;

const Message = ({
  message,
  auth: { user },
  chatroom: { currentChatroomId },
  saveSentMsgs
}) => {
  const [testArray, setTestArray] = useState([]);
  const [currentMsgSent, setCurrentMsgSent] = useState(null);
  const endpoint = "localhost:5000";
  socket = io(endpoint);

  useEffect(() => {
    //This sends the username to the backend
    socket.emit("send Username", user.userName);
    //This receives the username from the backend.
    socket.on("send Username", data => {
      setTestArray(testArray.concat(data + ": " + message));
      setCurrentMsgSent(data + ": " + message);

    });
  }, [user]);//May need to double check on this one

   useEffect(() => {
     let msgPacket = {
       currentMsgSent,
       currentChatroomId
     };

     // saveSentMsgs(msgPacket)

   },[testArray]);

  return (
    <div className="messageContainer backgroundBlue">
      {!testArray
        ? null
        : testArray.map((separateMsg, i) => {
            return <p key={i}>{separateMsg}</p>;
          })}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});
export default connect(mapStateToProps, { saveSentMsgs })(Message);
