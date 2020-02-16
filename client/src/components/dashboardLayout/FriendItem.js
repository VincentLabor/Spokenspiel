import React from "react";

const FriendItem = ({ friend }) => {

  return <div className="cursorChg">{friend ? <p>{friend.userName}</p> : null}</div>;
};

export default FriendItem;
