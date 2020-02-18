import React from "react";

const ChatInput = () => {

const onSubmit =(e)=>{
e.preventDefault();
}

  return (
    <div className="wrapper">
      <div className="chatboxDisplay">
        <form onSubmit={onSubmit}>
          <input type="text" className="chatboxInput"></input>
          <button type="submit" className="chatboxBtn ">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
