import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteFriend, getFriends } from "../../../actions/friendActions";
import {
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
} from "../../../actions/chatroomActions";

const FriendItem = ({
  friend,
  deleteFriend,
  getFriends,
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  chatroom: { chatRoomExists },
}) => {
  
  // useEffect(() => {
  //   chatroomCheck();
  // });

  const removeFriendFromFriendsList = () => {
    deleteFriend(friend._id);
    getFriends();
    window.location.reload();
  };

  const openConversation = () => {
    //create a convoCheck
    chatroomCheck(friend._id);
    console.log(chatRoomExists)
    if (chatRoomExists == null) {
      return null;
    } else {
      addChatroom(friend._id);
      console.log(friend._id);
      console.log("It didnt work");
      getUsersChatrooms();
    }
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
})(FriendItem);
