import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  acceptFriendReq,
  getFriendRequests,
  declineFriendReq,
  getFriends,
} from "../../../actions/friendActions";

const FriendRequests = ({
  friendReqs,
  auth,
  acceptFriendReq,
  getFriendRequests,
  declineFriendReq,
  returnToFriendslist,
  getFriends,
  mobileFriendReqs,
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
        <div className="friendRequests">
          {`${friendReqs.userName} has sent you a Friend Request`}{" "}
          <div className="friendReqBtns">
            <button>
              <i
                class="fas fa-check cursorChg confirmationBtn pageColor width30p"
                onClick={addFriend}
              ></i>
            </button>
            <button>
              <i
                class="fas fa-times cursorChg pageColor width30p"
                onClick={addFriend}
              ></i>
            </button>
          </div>
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
  getFriends,
})(FriendRequests);
