import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import FriendItem from "./FriendItem";
import {
  getFriends,
  addFriend,
  getFriendRequests
} from "../../actions/friendActions";
import FriendRequests from "./FriendRequests";

const FriendsList = ({
  friend: { friends, currentFriendReqs },
  getFriendRequests,
  getFriends,
  addFriend
}) => {
  useEffect(() => {
    getFriends();
  }, [getFriends]);

  const [friendTab, setFriendTab] = useState(true);
  const [friendReqTab, setFriendReqTab] = useState(false);
  const [addFriendTab, setAddFriendTab] = useState(false);

  const [userName, setUserName] = useState("");

  const onChange = e => {
    setUserName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const friendUserName = { userName };
    addFriend(friendUserName);
    setFriendTab(true);
    setFriendReqTab(false);
    setAddFriendTab(false);
  };

  return (
    <Fragment>
      <div className="friendsListWrapper">
        <h3>Friends List </h3>

        {/* These are the different tabs you can click to see different things */}
        {/* This is to see your friends list */}
        <div className="flexContainer">
          <p
            onClick={() => {
              setFriendTab(true);
              setFriendReqTab(false);
              setAddFriendTab(false);
              getFriends();
            }}
            className="friendOption"
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
            className="friendOption"
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
            className="friendOption"
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
              Ok
            </button>
          </form>
        ) : null}

        {/* This is the JSX for the friendslist */}
        {friendTab === true ? (
          <div className="flexWrapperRow">
            {/*Checks if user has friends and displays them*/}
            {friends
              ? friends.map(friend => (
                  <FriendItem friend={friend} key={friend._id} />
                ))
              : "Add some friends to get started."}
          </div>
        ) : null}

        {/* This is the JSX for the friend Requests */}
        {friendReqTab === true ? (
          <div className="flexWrapperRow">
            {/*Checks if user has friends and displays them*/}
            {currentFriendReqs
              ? currentFriendReqs.map(friendReqs => (
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

const mapStateToProps = state => ({
  friend: state.friend
});

export default connect(mapStateToProps, {
  getFriends,
  addFriend,
  getFriendRequests
})(FriendsList);
