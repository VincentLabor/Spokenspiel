import { GET_FRIENDS, USER_LOADED, GET_ERRORS, ADD_FRIEND, GET_FRIEND_REQS,ACCEPT_FRIEND_REQ} from "./types";
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
export const getFriendRequests = () => async dispatch =>{
  const config = {
    headers:{
      "Content-Type": "application/json"
    }
  }

  try {
    loadUser();
    const res = await axios.get("/api/friends/friendRequests/", config);
    console.log(res.data)

    dispatch({
      type: GET_FRIEND_REQS, payload: res.data
    })
  } catch (err) {
    console.log(err);
  }
}

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
export const acceptFriendReq = (friendData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    loadUser();
    const res = await axios.put(`api/friends/accept/${friendData}`,config);

    dispatch({type: ACCEPT_FRIEND_REQ, payload: res.data})
  } catch (err) {
    console.log(err)
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
    // console.log(res.data)
    dispatch({ type: GET_FRIENDS, payload: res.data });
  } catch (err) {
    console.log(err.response.data);
  }
};
