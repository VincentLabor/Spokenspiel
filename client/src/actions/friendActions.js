import { GET_FRIENDS } from "./types";
import axios from 'axios';

//Getting friends of logged in User

export const getFriends = () => async dispatch => {
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
