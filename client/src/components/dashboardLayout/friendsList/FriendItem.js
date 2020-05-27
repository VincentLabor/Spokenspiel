import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteFriend, getFriends } from "../../../actions/friendActions";
import {
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  setCurrentChatroomId,
  getMessagesFromDB,
  findChatroom,
} from "../../../actions/chatroomActions";

const FriendItem = ({
  friend,
  deleteFriend,
  getFriends,
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  setCurrentChatroomId,
  getMessagesFromDB,
  findChatroom,
  chatroom: { chatRoomExists, currentChatroomId },
}) => {
  const removeFriendFromFriendsList = () => {
    deleteFriend(friend._id);
    console.log(currentChatroomId);
    getFriends(currentChatroomId);
  };

  const openConversation = async () => {
    //chatroomCheck(friend._id); //This checks if the chatroom exists and if not will produce one in the db
    // 80
    findChatroom(friend._id); //143 This is not triggering for some reason?
    // getMessagesFromDB(currentChatroomId);
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
  chatroom: state.chatroom
});

export default connect(mapStateToProps, {
  deleteFriend,
  getFriends,
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  setCurrentChatroomId,
  getMessagesFromDB,
  findChatroom
})(FriendItem);
