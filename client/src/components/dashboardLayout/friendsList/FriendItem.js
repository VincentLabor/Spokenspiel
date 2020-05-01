import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteFriend, getFriends } from "../../../actions/friendActions";
import {
  addChatroom,
  getUsersChatrooms,
  chatroomCheck
} from "../../../actions/chatroomActions";

const FriendItem = ({
  friend,
  deleteFriend,
  getFriends,
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  chatRoomExists
}) => {
  const onClick = () => {
    deleteFriend(friend._id);
    getFriends();
    window.location.reload();
  };

  const openConvo = () => {
    //create a convoCheck
    chatroomCheck(friend._id);
    console.log(chatroomCheck(friend._id)) //The if statement does not work for some reason. The functiopn works properly
    if(!chatRoomExists){
      return null;
    } else {
      addChatroom(friend._id);
      console.log(friend._id);
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
            onClick={openConvo}
          ></i>{" "}
          {/*Messaging Icon*/}
          <i className="fas fa-trash-alt trashIcon" onClick={onClick}></i>{" "}
          {/*Trash Icon*/}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

export default connect(mapStateToProps, {
  deleteFriend,
  getFriends,
  addChatroom,
  getUsersChatrooms,
  chatroomCheck
})(FriendItem);
