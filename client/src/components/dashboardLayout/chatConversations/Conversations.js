import React, { useEffect } from "react";

import ConversationalItems from "./ConversationalItems";
import { getUsersChatrooms } from "../../../actions/chatroomActions";
import { connect } from "react-redux";

const Conversations = ({
  generalChatStatus,
  chatroom: { chatrooms },
  getUsersChatrooms
}) => {

  useEffect(() => {
    getUsersChatrooms();
  }, [chatrooms]);

  return (
    <div>
      Conversations
      {generalChatStatus ? <h3 className="cursorChg">General Chat</h3> : null}
      {/*TODO CSS class that makes a separate block for discerning different convos  */}
      {chatrooms
        ? chatrooms.map(conversation => (
            <ConversationalItems
              conversation={conversation}
              key={conversation._id}
            />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = state => ({
  chatroom: state.chatroom
});

export default connect(mapStateToProps, { getUsersChatrooms })(Conversations);
