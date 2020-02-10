import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import FriendItem from "./FriendItem";
import { getFriends, addFriend } from "../../actions/friendActions";

const FriendsList = ({ friend: { friends }, getFriends, addFriend }) => {
  useEffect(() => {
    getFriends();
  }, [getFriends]);

  const [modalState, setModalState] = useState(false);
  const [userName, setUserName] = useState("");

  const onChange = e => {
    setUserName(e.target.value);
  };

  const onSubmit = (e) =>{
    e.preventDefault();

    const friendUserName = {userName}
    console.log(userName);
    console.log(friendUserName)
    addFriend(friendUserName); 
    setModalState(false);
  }

  return (
    <Fragment>
      <div className="friendsListWrapper">
        <h3>Friends List </h3>

        {modalState === true ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="userName"
              value={userName}
              className="AddFriendInput"
              onChange={onChange}
              placeholder=" "
            ></input>
            <button type="submit" className="addFriendBtn">
              Ok
            </button>
          </form>
        ) : null}

        <div className="flexContainer">
          <p
            onClick={() => {
              setModalState(false);
            }}
            className="friendOption"
          >
            Friends
          </p>
          <p
            onClick={() => {
              setModalState(!modalState);
            }}
            className="friendOption"
          >
            Add Friend
          </p>
        </div>

        {/* <i class="fas fa-user-plus" onClick={()=>{setModalState(!modalState)}}></i> Clicking this icon gives access to add friends */}

        <div className="flexWrapperRow">
          {" "}
          {/*Checks if user has friends and displays them*/}
          {friends
            ? friends.map(friend => (
                <FriendItem friend={friend} key={friend._id} />
              ))
            : "Add some friends to get started."}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  friend: state.friend
});

export default connect(mapStateToProps, { getFriends, addFriend })(FriendsList);
