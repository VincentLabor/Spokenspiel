import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveSentMsgs } from "../../../actions/chatroomActions";
//we have to import users username here later

const Message = ({
  message,
}) => {

  return (
    <div className=" messageContainer">
      <p>{message}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});
export default connect(mapStateToProps, { saveSentMsgs })(Message);
