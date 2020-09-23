import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  acceptFriendReq,
  getFriendRequests,
  declineFriendReq,
  getFriends
} from "../../../actions/friendActions";

const FriendRequests = ({
  friendReqs,
  auth,
  acceptFriendReq,
  getFriendRequests,
  declineFriendReq,
  returnToFriendslist,
  getFriends,
  mobileFriendReqs
}) => {
  useEffect(() => {
    getFriendRequests();
  }, []);

  const addFriend = () => {
    acceptFriendReq(friendReqs._id);
    getFriends();
    // window.location.reload();
    // returnToFriendslist();
    mobileFriendReqs();
  };

  const rejectFriend = () => {
    declineFriendReq(friendReqs._id);
  };

  return (
    <div>
      {/* Checks if the friend status == 1 because that person is the sender. 2 is Receiver.  */}
      {friendReqs ? (
        <div>
          <p>
            {`${friendReqs.userName} has sent you a Friend Request`}{" "}
            <i
              className="fas fa-check-circle fa-lg cursorChg"
              onClick={addFriend}
            ></i>
            <i
              className="far fa-times-circle fa-lg cursorChg"
              onClick={rejectFriend}
            ></i>
          </p>
        </div>
      ) : (
        <p>There are no current friend requests</p>
      )}{" "}
      {/*Need to figure out why there is no message appearing when there are no current friend reqs */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  acceptFriendReq,
  getFriendRequests,
  declineFriendReq,
  getFriends
})(FriendRequests);
