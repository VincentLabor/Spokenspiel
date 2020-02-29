import React,{useEffect} from "react";
import {connect} from "react-redux";
import {deleteFriend, getFriends} from '../../actions/friendActions';

const FriendItem = ({ friend, deleteFriend, getFriends }) => {

  useEffect(()=>{
    
  },[])

  const onClick= () =>{
    deleteFriend(friend._id)
    getFriends();
    window.location.reload();
  }

  const giveCode = () =>{
    console.log(friend._id);
  }

  return (
    <div className="cursorChg">
      {friend ? (
        <div className="friendContainer">
          <p className="friendName" onClick={giveCode}>
            {friend.userName}
          </p>
          <i className="fas fa-comment-alt trashIcon"></i>
          <i className="fas fa-trash-alt trashIcon" onClick={onClick}></i>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{deleteFriend, getFriends})(FriendItem);
