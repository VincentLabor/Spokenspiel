import React from "react";

import { connect } from "react-redux";

//import scrolltobottom react-scroll-to-the-bottom 1:30
import Message from "./Message";

const ChatMessages = ({ messages, chatroom: { msgs } }) => {
  return (
    <div>
      {/* {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))} */}
      { !msgs ? null : msgs.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  chatroom: state.chatroom
});

export default connect(mapStateToProps)(ChatMessages);

//1:29 what we need input
