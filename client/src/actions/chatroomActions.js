import axios from "axios";
import { ADD_CHATROOM, GET_CHATROOM,GET_NAME_CHATROOM, STORE_MSGS, REMOVE_MSGS} from "./types";

export const getUsersChatrooms = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get("/api/chatroom/", config);
    dispatch({ type: GET_CHATROOM, payload: res.data });
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const addChatroom = friendData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log("This is the friendData" + friendData);
  try {
    const res = await axios.post(`/api/chatroom/${friendData}`, config);
    dispatch({ type: ADD_CHATROOM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const saveMsgs = chatData => async dispatch =>{
  try {
    dispatch({type: STORE_MSGS, payload: chatData})
  } catch (error) {
    console.log(error)
  }
}

export const clearMsgs = () => async dispatch =>{
  try {
    dispatch({type: REMOVE_MSGS})
  } catch (error) {
    console.log(error)
  }
}

export const getChatroomName = friendData => async dispatch => {
    const nameOfRoom = friendData;
    console.log(friendData)
    try {
        dispatch({type: GET_NAME_CHATROOM, payload: friendData})
    } catch (error) {
        console.log(error)
    }
};
