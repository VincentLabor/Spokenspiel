import React from "react";

const FriendItem = ({ friend }) => {

  return <div>{friend ? <p>{friend.userName}</p> : null}</div>;
};

export default FriendItem;
