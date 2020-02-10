import { GET_FRIENDS, USER_LOADED, GET_ERRORS, ADD_FRIEND } from "./types";
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

export const getFriends = friendData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get("/api/friends/", config);
    dispatch({ type: GET_FRIENDS, payload: res.data });
  } catch (err) {
    console.log(err.response.data);
  }
};
