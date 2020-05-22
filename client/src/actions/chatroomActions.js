import axios from "axios";
import {
  ADD_CHATROOM,
  GET_CHATROOM_ID,
  GET_CHATROOM,
  GET_NAME_CHATROOM,
  STORE_MSGS,
  REMOVE_MSGS,
  STORE_SENT_MSGS,
  SET_LOADING,
  GENERAL_CHAT,
  ENTERING_GENERAL_CHAT,
  REMOVE_ALL_CHATROOM,
  GET_CHATROOM_MSGS,
  GET_SPECIFIC_CHATROOM,
  HIDE_CHAT,
} from "./types";

export const getUsersChatrooms = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/chatroom/", config);
    dispatch({ type: GET_CHATROOM, payload: res.data });
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

//This will grab the messages from the chatroom
export const getMessagesFromDB = (chatId) => async (dispatch) => {
  //This is how we get the messages and display them to the page.
  try {
    console.log(chatId);
    const res = await axios.get(`/api/chatroom/msgs/${chatId}`);
    console.log(res.data);
    dispatch(clearMsgs()); // This will clear whatever is currently left within the page/chatroom
    dispatch({ type: GET_CHATROOM_MSGS, payload: res.data.messages });
  } catch (err) {
    console.log(err);
  }
};

//This will save messages typed by the user into the database
export const saveSentMsgs = (msgData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  try {
    const res = await axios.put(
      `/api/chatroom/msgs/${msgData.currentChatroomId}`,
      msgData,
      config
    );
    // console.log(res.data);
    dispatch({ type: STORE_SENT_MSGS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const saveMsgs = (chatData) => (dispatch) => {
  try {
    dispatch({ type: STORE_MSGS, payload: chatData });
  } catch (error) {
    console.log(error);
  }
};

export const chatroomCheck = (friendData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    try {
      const res = await axios.get(`api/chatroom/${friendData}`, config);
      dispatch({ type: GET_SPECIFIC_CHATROOM, payload: res.data[0]._id });
    } catch (error) {
      dispatch(addChatroom(friendData));
    }
  } catch (error) {
    console.log(error);
  }
};

export const addChatroom = (friendData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/chatroom/${friendData}`, config);
    dispatch({ type: ADD_CHATROOM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const clearMsgs = () => (dispatch) => {
  try {
    dispatch({ type: REMOVE_MSGS });
  } catch (error) {
    console.log(error);
  }
};

export const clearAllChatroomState = () => (dispatch) => {
  try {
    dispatch({ type: REMOVE_ALL_CHATROOM });
  } catch (error) {
    console.log(error);
  }
};

export const getChatroomName = (friendData) => (dispatch) => {
  console.log(friendData);
  try {
    dispatch({ type: GET_NAME_CHATROOM, payload: friendData });
  } catch (error) {
    console.log(error);
  }
};


export const findChatroom = (friendId) => async (dispatch) => {
  //clicking on the msg icon will open the msgs
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`/api/chatroom/${friendId}`, config);
    dispatch(getMessagesFromDB(res.data._id)) //This needs to call the grab message with the res.data that we just got
   console.log(res.data)
  } catch (error) {
    console.log(error);
  }
};


export const setCurrentChatroomId = (chatroomData) => (dispatch) => { //This is utilized for setting the Chat messagesin the dashboard
  try {
    dispatch({ type: GET_CHATROOM_ID, payload: chatroomData });
  } catch (error) {
    console.log(error);
  }
};


export const enterGeneralChat = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/chatroom/genChat");
    dispatch({ type: ENTERING_GENERAL_CHAT, payload: res.data[0]._id });
  } catch (error) {
    console.log("There is an error within enter General Chat" + error);
  }
};

export const removeChatroomfromSight = (chatroomData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/chatroom/${chatroomData}`, config);
    console.log(res.data)
    dispatch({ type: HIDE_CHAT, payload: res.data._id });
  } catch (error) {
    console.log(error);
  }
};

export const postInGeneralChat = async (dispatch) => {
  try {
    // const res = await axios.
  } catch (error) {
    console.log("There is an error within enter General Chat" + error);
  }
};

export const userIsInGeneralChat = async (dispatch) => {
  return {
    type: GENERAL_CHAT,
  };
};

export const loading = () => {
  return {
    type: SET_LOADING,
  };
};
