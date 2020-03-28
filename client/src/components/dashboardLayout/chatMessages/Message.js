import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { saveSentMsgs } from "../../../actions/chatroomActions";
//we have to import users username here later

const Message = ({
  message,
}) => {

  return (
    //This needs to be mapped out like an array
    <div className="messageContainer backgroundBlue">
      <p>{message}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});
export default connect(mapStateToProps, { saveSentMsgs })(Message);
