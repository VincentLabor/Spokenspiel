import React, {useEffect} from "react";
import {connect} from "react-redux";
import {acceptFriendReq, getFriendRequests, declineFriendReq} from "../../actions/friendActions";


const FriendRequests = ({ friendReqs, auth, acceptFriendReq, getFriendRequests,declineFriendReq }) => {
  
useEffect(()=>{getFriendRequests()},[getFriendRequests]);


  const addFriend = ()=>{
    acceptFriendReq(friendReqs._id);
  }

  const rejectFriend = ()=>{
    declineFriendReq(friendReqs._id)
  }

  return (
    <div>
        {/* Checks if the friend status == 1 because that person is the sender. 2 is Receiver.  */}
      {friendReqs ? (
        <div>
          <p>
            {`${friendReqs.userName} has sent you a Friend Request`}{" "}
            <i className="fas fa-check-circle fa-lg cursorChg" onClick={addFriend}></i>
            <i className="far fa-times-circle fa-lg cursorChg" onClick={rejectFriend}></i>
          </p> 
                   
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{acceptFriendReq, getFriendRequests, declineFriendReq})(FriendRequests);
