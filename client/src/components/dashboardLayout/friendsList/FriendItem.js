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
  const [showModal, setShowModal] = useState(false);

  const removeFriendFromFriendsList = () => {
    removeChatroomAfterDeletingFriend(friend._id);
    deleteFriend(friend._id);
    //Maybe clear the numbers in here
    removeChatroomfromSight(currentChatroomId);
  };

  const checkFriendRemovalWithUser = () => {
    setShowModal(true);
  };

  const cancelFriendRemoval = () => {
    setShowModal(false);
  };

  const openConversation = async () => {
    if (mobileRemoveToggle == false) {
      chatroomCheck(friend._id); //This checks if the chatroom exists and if not will produce one in the db
    }
  };

  const verifyFriendRemoval = (
    <div>
      <div className="modalBody">
        <p>Would you like to delete {friend.userName}?</p>
        {/* This here would be the leftovers from the friendlist item that would show proper information*/}
        <button onClick={removeFriendFromFriendsList}>Yes</button>
        <button onClick={cancelFriendRemoval}>No</button>
      </div>
    </div>
  );

  const friendIcons = (
    <div>
      <i className="fas fa-comment-alt commentIcon hideOnSmallMedia"></i>{" "}
      <i
        className="fas fa-trash-alt trashIcon "
        onClick={checkFriendRemovalWithUser}
      ></i>
    </div>
  );

  return (
    <div className="cursorChg">
      {friend ? (
        <div className="friendContainer">
          {/* Display the Friends */}
          <p className="friendName" onClick={openConversation}>
            {friend.userName}
          </p>

          {/* If mobile toggle = true, click on trash to delete */}
          {/* Else, show friends and onclick, display/create conversation */}
          {mobileRemoveToggle ? (
            <div className="friendIcons">
              {/* <i className="fas fa-comment-alt commentIcon hideOnSmallMedia"></i>{" "}
              <i
                className="fas fa-trash-alt trashIcon "
                onClick={removeFriendFromFriendsList}
              ></i> */}
              {showModal === false ? friendIcons : null}
              {showModal ? verifyFriendRemoval : null}
            </div>
          ) : (
            <div className="friendIcons hideOnSmallMedia">
              <i
                className="fas fa-comment-alt commentIcon"
                onClick={openConversation}
              ></i>

              {/*Messaging Icon*/}
              <i
                className="fas fa-trash-alt trashIcon "
                onClick={checkFriendRemovalWithUser}
              ></i>
              {showModal ? verifyFriendRemoval : null}
            </div>
          )}
        </div>
      ) : //Basically just nulls if the user has no friends leaving it blank.
      null}
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
