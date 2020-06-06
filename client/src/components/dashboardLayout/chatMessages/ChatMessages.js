import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Message from "./Message"; //This is to move to Message.js
import io from "socket.io-client";
import { getMessagesFromDB,  } from "../../../actions/chatroomActions";

const ChatMessages = (
  { chatroom: { msgs, currentChatroomId }, getMessagesFromDB },
  
) => {
  //We grab messages from the reducer

  let socket = io("localhost:5000");

  const testArray= [];

  socket.once("sendTypedMsg", (typedMsg) => {
     testArray.push(typedMsg)
    // console.log(typedMsg)
   // setCurrentMsgSent(typedMsg);
    getMessagesFromDB(currentChatroomId);
  });

  const [currentMsgSent, setCurrentMsgSent] = useState(null);

  return (
    <div>
      {!msgs
        ? null
        : msgs.map((message, i) => (
            <div key={i}>
              <Message message={message} />
            </div>
          ))}
      {testArray.map((msg)=>{
       return <p>{msg}</p>
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, { getMessagesFromDB })(ChatMessages);
