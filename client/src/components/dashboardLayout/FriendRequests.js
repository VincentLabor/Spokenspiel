import React from "react";
import {connect} from "react-redux";
import {acceptFriendReq} from "../../actions/friendActions";

const FriendRequests = ({ friendReqs, auth, acceptFriendReq }) => {
  
  const addFriend = ()=>{
    console.log(friendReqs._id)
    acceptFriendReq(friendReqs._id);
  }

  const rejectFriend = ()=>{

  }

  return (
    <div>
        {/* Checks if the friend status == 1 because that person is the sender. 2 is Receiver.  */}
      {friendReqs ? (
        <div>
          <p>
            {`${friendReqs.userName} has sent you a Friend Request`}{" "}
            <i className="fas fa-check-circle fa-lg" onClick={addFriend}></i>
            <i className="far fa-times-circle fa-lg" onClick={rejectFriend}></i>
          </p> 
                   
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{acceptFriendReq})(FriendRequests);
