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
  mobileRemoveToggle, //Triggers a toggle in parent component
}) => {
  /*Catching the pages width and height to help modify the page based on the screen.  */

  const removeFriendFromFriendsList = () => {
    removeChatroomAfterDeletingFriend(friend._id);
    deleteFriend(friend._id);
    // removeChatroomfromSight(currentChatroomId);
  };

  const openConversation = async () => {
    if (mobileRemoveToggle == false) {
      chatroomCheck(friend._id); //This checks if the chatroom exists and if not will produce one in the db
    }
  };

  return (
    <div className="cursorChg" onClick={openConversation}>
      {friend ? (
        <div className="friendContainer">
          {/* Display the Friends */}
          <p className="friendName">{friend.userName}</p>

          {/* If mobile toggle = true, click on trash to delete */}
          {/* Else, show friends and onclick, display/create conversation */}
          {mobileRemoveToggle ? (
            <div className="friendIcons">
              <i className="fas fa-comment-alt commentIcon hideOnSmallMedia"></i>{" "}
              <i
                className="fas fa-trash-alt trashIcon "
                onClick={removeFriendFromFriendsList}
              ></i>{" "}
              {/*Trash Icon*/}
            </div>
          ) : (
            <div className="friendIcons hideOnSmallMedia">
              {mobileRemoveToggle ? (
                <i className="fas fa-comment-alt commentIcon"></i>
              ) : (
                <i
                  className="fas fa-comment-alt commentIcon"
                  onClick={openConversation}
                ></i>
              )}{" "}
              {/*Messaging Icon*/}
              <i
                className="fas fa-trash-alt trashIcon "
                onClick={removeFriendFromFriendsList}
              ></i>
            </div>
          )}
        </div>
        //Basically just nulls if the user has no friends leaving it blank. 
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
