import React from "react";
import io from "socket.io-client";

let socket;

const ChatInput = ({currentMsg, setCurrentMsg, sendMessage}) => {
  // const [currentMsg, setCurrentMsg] = useState("");
  // const endpoint = "localhost:5000";


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
