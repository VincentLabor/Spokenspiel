import React,{useEffect} from "react";
import {connect} from "react-redux";
import {deleteFriend, getFriends} from '../../../actions/friendActions';
import {addChatroom, getUsersChatrooms} from '../../../actions/chatroomActions';

const FriendItem = ({ friend, deleteFriend, getFriends, addChatroom, getUsersChatrooms }) => {

  useEffect(()=>{
    
  },[])

  const onClick= () =>{
    deleteFriend(friend._id)
    getFriends();
    window.location.reload();
  }

  const openConvo =()=>{
     addChatroom(friend._id);
     console.log(friend._id);
     getUsersChatrooms();
  }

  const giveCode = () =>{
  //  This may be used to extend csswise and show the options available
  }

  return (
    <div className="cursorChg">
      {friend ? (
        <div className="friendContainer">
          <p className="friendName" onClick={giveCode}>
            {friend.userName}
          </p>
          <i className="fas fa-comment-alt trashIcon" onClick={openConvo}></i>
          <i className="fas fa-trash-alt trashIcon" onClick={onClick}></i>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state=>({
  auth:state.auth,
  chatroom: state.chatroom
})

export default connect(mapStateToProps,{deleteFriend, getFriends, addChatroom, getUsersChatrooms})(FriendItem);
