import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteFriend, getFriends } from "../../../actions/friendActions";
import {
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  returnToConversation
} from "../../../actions/chatroomActions";

const FriendItem = ({
  friend,
  deleteFriend,
  getFriends,
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  returnToConversation,
  chatroom: { chatRoomExists },
}) => {
  const removeFriendFromFriendsList = () => {
    deleteFriend(friend._id);
    getFriends();
  };

  const openConversation = async () => {
    chatroomCheck(friend._id); //This checks if the chatroom exists and if not will produce one in the db
    returnToConversation(friend._id);
  };

  return (
    <div className="cursorChg">
      {friend ? (
        <div className="friendContainer">
          <p className="friendName">{friend.userName}</p>
          <i
            className="fas fa-comment-alt trashIcon"
            onClick={openConversation}
          ></i>{" "}
          {/*Messaging Icon*/}
          <i
            className="fas fa-trash-alt trashIcon"
            onClick={removeFriendFromFriendsList}
          ></i>{" "}
          {/*Trash Icon*/}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, {
  deleteFriend,
  getFriends,
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  returnToConversation
})(FriendItem);
