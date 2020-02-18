import React from "react";
import {connect} from "react-redux";
import {deleteFriend} from '../../actions/friendActions';

const FriendItem = ({ friend, deleteFriend }) => {

  const onClick= () =>{
    deleteFriend(friend._id)
    
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
          <i className="fas fa-trash-alt trashIcon" onClick={onClick}></i>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{deleteFriend})(FriendItem);
