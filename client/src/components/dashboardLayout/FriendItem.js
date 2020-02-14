import React from "react";

const FriendItem = ({ friend }) => {

  return <div>{friend.friendStatus === 3 ? <p>{friend.userName}</p> : null}</div>;
};

export default FriendItem;
