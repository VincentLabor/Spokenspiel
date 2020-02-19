import {
  GET_FRIENDS,
  USER_LOADED,
  GET_ERRORS,
  ADD_FRIEND,
  GET_FRIEND_REQS,
  ACCEPT_FRIEND_REQ,
  CLEAR_FRIEND_STATE,
  REMOVE_FRIEND_REQ,
  DECLINE_FRIEND_REQ,
  DELETE_FRIEND
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

//Getting friends of logged in User

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

//Getting the users friend requests
export const getFriendRequests = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    loadUser();
    const res = await axios.get("/api/friends/friendRequests/", config);
    dispatch({
      type: GET_FRIEND_REQS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

//Sending a friend request
export const addFriend = friendData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    loadUser();
    const res = await axios.post("/api/friends", friendData, config);
    dispatch({ type: ADD_FRIEND, payload: res.data });
  } catch (err) {
    console.log(err.response.msg);
  }
};

//Accepting a Friend Request
export const acceptFriendReq = friendData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    loadUser();
    const res = await axios.put(`api/friends/accept/${friendData}`, config);

    //First change the status and add the friends to the friends list
    dispatch({ type: ACCEPT_FRIEND_REQ, payload: res.data });

    //Second, remove the friend request
    dispatch({ type: REMOVE_FRIEND_REQ, dispatch: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const declineFriendReq = friendData => async dispatch => {
  const config = {
    header: { "Content-Type": "application/json" }
  };

  try {
    loadUser();
    const res = await axios.put(`api/friends/decline/${friendData}`, config);
    console.log(res.data);
    //Decline the request and remove the scrub the request entirely
    dispatch({ type: DECLINE_FRIEND_REQ, payload: res.data });
    dispatch({ type: REMOVE_FRIEND_REQ, dispatch: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFriend = friendData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    loadUser();
    const res = await axios.delete(`/api/friends/delete/${friendData}`, config);
    console.log(res.data)
    dispatch({ type: DELETE_FRIEND, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

//Grabbing the users friends
export const getFriends = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    loadUser();
    const res = await axios.get("/api/friends/", config);
    dispatch({ type: GET_FRIENDS, payload: res.data });
    console.log(res.data)
  } catch (err) {
    console.log(err.response.data);
  }
};

export const clearAll = () => async dispatch => {
  dispatch({ type: CLEAR_FRIEND_STATE });
};
