import React, { useEffect, useState } from "react";
import io from "socket.io-client";
//import scrolltobottom react-scroll-to-the-bottom 1:30
import Message from "./Message";

const ChatMessages = ({ messages }) => {
  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

//1:29 what we need input
