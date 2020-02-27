import React from "react";
import io from "socket.io-client";

const ChatInput = ({currentMsg, setCurrentMsg, sendMessage}) => {

  const onChange = e => {
    setCurrentMsg(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    sendMessage(e);
  };

  return (
    <div className="wrapper">
      <div className="chatboxDisplay">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="chatboxInput"
            value={currentMsg}
            onChange = {onChange}
            name="msg"
            placeholder="Send a message"
            autoComplete = "off"
          ></input>
          <button type="submit" className="chatboxBtn ">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
