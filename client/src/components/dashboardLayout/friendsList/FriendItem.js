import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { debounce, _ } from "lodash";
import { deleteFriend, getFriends } from "../../../actions/friendActions";
import {
  addChatroom,
  getUsersChatrooms,
  chatroomCheck,
  setCurrentChatroomId,
  findChatroom,
  removeChatroomfromSight,
  removeChatroomAfterDeletingFriend,
} from "../../../actions/chatroomActions";

const FriendItem = ({
  friend,
  deleteFriend,
  chatroomCheck,
  removeChatroomAfterDeletingFriend,
  chatroom: { chatRoomExists, currentChatroomId },
  mobileRemoveToggle, //This is properly brought over.
}) => {
  /*Catching the pages width and height to help modify the page based on the screen.  */

  const removeFriendFromFriendsList = () => {
    removeChatroomAfterDeletingFriend(friend._id);
    deleteFriend(friend._id);
    // removeChatroomfromSight(currentChatroomId);
  };

  const openConversation = async () => {
    chatroomCheck(friend._id); //This checks if the chatroom exists and if not will produce one in the db
  };

  return (
    <div className="cursorChg" onClick={openConversation}>
      {friend ? (
        <div className="friendContainer">
          <p className="friendName">{friend.userName}</p>
          {/*   {isShown ? */}

          {mobileRemoveToggle ? (
            <div className="friendIcons">
              <i
                className="fas fa-comment-alt commentIcon hideOnSmallMedia"
                onClick={openConversation}
              ></i>{" "}
              {/*Messaging Icon*/}
              <i
                className="fas fa-trash-alt trashIcon "
                onClick={removeFriendFromFriendsList}
              ></i>{" "}
              {/*Trash Icon*/}
            </div>
          ) : (
            <div className="friendIcons hideOnSmallMedia">
              <i
                className="fas fa-comment-alt commentIcon"
                onClick={openConversation}
              ></i>{" "}
              {/*Messaging Icon*/}
              <i
                className="fas fa-trash-alt trashIcon "
                onClick={removeFriendFromFriendsList}
              ></i>{" "}
              {/*Trash Icon*/}
            </div>
          )}

          {/*  : null} */}
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
  setCurrentChatroomId,
  findChatroom,
  removeChatroomfromSight,
  removeChatroomAfterDeletingFriend,
})(FriendItem);
