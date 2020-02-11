import React from "react";

const FriendRequests = ({ friend }) => {
  return (
    <div>
        {/* Checks if the friend status == 1 because that person is the sender. 2 is Receiver.  */}
      {friend.friendStatus === 1 ? (
        <div>
          <p>
            {`${friend.userName} has sent you a Friend Request`}{" "}
            <i class="fas fa-check-circle fa-lg"></i>
            <i class="far fa-times-circle fa-lg"></i>
          </p> 
                   
        </div>
      ) : null}
    </div>
  );
};

export default FriendRequests;
