import React from "react";
import { connect } from "react-redux";

const conversationItems = ({ conversation, auth: { user } }) => {
  return (
    <div>
      {conversation ? (
        <h3 className="cursorChg">
          {user.userName === conversation.user1Name
            ? conversation.user2Name
            : conversation.user1Name}
        </h3>
      ) : null}
    </div>
  );
};

//
const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

export default connect(mapStateToProps, {})(conversationItems);
