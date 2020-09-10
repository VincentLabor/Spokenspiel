import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import FriendItem from "./FriendItem";
import {
  getFriends,
  addFriend,
  getFriendRequests,
} from "../../../actions/friendActions";
import {} from "../../../";
import FriendRequests from "./FriendRequests";

const FriendsList = ({
  friend: { friends, currentFriendReqs, friendRequested },
  chatroom: { currentChatroomId },
  getFriendRequests,
  getFriends,
  addFriend,
}) => {
  useEffect(() => {
    getFriends();
    getFriendRequests();
  }, []); //Nothing in the brackets mean that these functions will only run once. I removed getFriends() from the brackets

  const [friendTab, setFriendTab] = useState(true);
  const [friendReqTab, setFriendReqTab] = useState(false);
  const [addFriendTab, setAddFriendTab] = useState(false);
  const [sentFriendRequest, setSentFriendRequest] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileRemoveToggle, setMobileRemoveToggle] = useState(false);

  const onChange = (e) => {
    setUserName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const friendUserName = { userName };
    addFriend(friendUserName);
    setSentFriendRequest(true);
    setTimeout(() => {
      setSentFriendRequest(false);
    }, 6000);
  };

  const mobileFriendRemove = () => {
    setMobileRemoveToggle(!mobileRemoveToggle);
  };

  return (
    <Fragment>
      <div className="friendsListWrapper">
        <h3 className="friendHeader">Friends List </h3>
        <div className="mobileFriendIcons">
          {mobileRemoveToggle ? (
            <Fragment>
              <i class="far fa-times-circle" onClick={mobileFriendRemove}></i>
              <p>Choose a friend to delete</p>
            </Fragment>
          ) : (
            <Fragment>
              <i className="fas fa-user-plus"></i>
              <i className="fas fa-user-minus" onClick={mobileFriendRemove}></i>
              <i className="fas fa-user-friends"></i>
            </Fragment>
          )}
        </div>

        {/* These are the different tabs you can click to see different things */}
        {/* This is to see your friends list */}
        <div className="flexContainer hideOnSmallMedia">
          <p
            onClick={() => {
              setFriendTab(true);
              setFriendReqTab(false);
              setAddFriendTab(false);
              getFriends();
            }}
            className={friendTab ? "friendOption underline" : "friendOption"}
          >
            Friends
          </p>

          {/* This is to add friends */}
          <p
            onClick={() => {
              setFriendTab(false);
              setFriendReqTab(false);
              setAddFriendTab(true);
            }}
            className={addFriendTab ? "friendOption underline" : "friendOption"}
          >
            Add Friend
          </p>

          {/* this is to see your current friend requests */}
          <p
            onClick={() => {
              setFriendTab(false);
              setFriendReqTab(true);
              setAddFriendTab(false);
              getFriendRequests();
            }}
            className={friendReqTab ? "friendOption underline" : "friendOption"}
          >
            Friend Requests
          </p>
        </div>

        {/* This is the JSX for adding friends*/}
        {addFriendTab === true ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="userName"
              value={userName}
              className="AddFriendInput"
              onChange={onChange}
              placeholder=" "
              autoFocus
            ></input>
            <button type="submit" className="addFriendBtn">
              Send Friend Request
            </button>
          </form>
        ) : null}

        {sentFriendRequest === true ? (
          <p>A friend request has been sent to {userName}</p>
        ) : null}

        {/* This is the JSX for the friendslist */}
        {friendTab === true ? (
          <div className="flexWrapperRow friendsListScroll">
            {/*Checks if user has friends and displays them*/}

            {friends ? (
              friends.map((friend) => (
                <FriendItem
                  friend={friend}
                  key={friend._id}
                  mobileRemoveToggle={mobileRemoveToggle}
                />
              ))
            ) : (
              <p className="pd-top1">Add some friends to get started</p>
            )}
          </div>
        ) : null}

        {/* This is the JSX for the friend Requests */}
        {friendReqTab === true ? (
          <div className="flexWrapperRow">
            {/*Checks if user has friends and displays them*/}
            {currentFriendReqs
              ? currentFriendReqs.map((friendReqs) => (
                  <FriendRequests
                    friendReqs={friendReqs}
                    key={friendReqs._id}
                  />
                ))
              : "Send some friend requests to start your journey"}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  friend: state.friend,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, {
  getFriends,
  addFriend,
  getFriendRequests,
})(FriendsList);
