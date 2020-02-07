import React, { Fragment,useEffect } from "react";
import {connect} from "react-redux";
import FriendItem from './FriendItem';
import {getFriends} from "../../actions/friendActions";

const FriendsList = ({friend:{friends},getFriends}) => {

useEffect(()=>{
    getFriends();
    console.log(friends)
},[getFriends])

  return (
    <Fragment>
      <div className="friendsListWrapper">
        <h3>Friends List</h3>
        <div className="flexWrapperRow">
       {friends ? (friends.map(friend=><FriendItem friend={friend} key={friend._id}/>)) : null }
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state =>({
friend: state.friend
})

export default connect(mapStateToProps,{getFriends})(FriendsList);
