import React, { useState } from "react";
import { connect } from "react-redux";
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
}) => {
  const [isShown, setIsShown] = useState(false);

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
        <div
          className="friendContainer"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <p className="friendName">{friend.userName}</p>
          {/*   {isShown ? */}

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

{
  /* <div className="cursorChg">
{friend ? (
  <div className="friendContainer" onMouseEnter={()=>setIsShown(true)} onMouseLeaver={()=>setIsShown(false)}>
    <p className="friendName">{friend.userName}</p>
    {isShown ? (          (<i
      className="fas fa-comment-alt trashIcon "
      onClick={openConversation}
    ></i>) (          <i
      className="fas fa-trash-alt trashIcon"
      onClick={removeFriendFromFriendsList}
    ></i>)) : null}
    
  </div>
) : null}
</div> */
}
