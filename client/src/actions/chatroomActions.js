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
  FIND_SPECIFIC_CHATROOM,
  // UNHIDE_CHATROOM,
  REMOVE_CHATROOM_AFTER_REMOVING_FRIEND,
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
  } catch (err) {
    console.log(err);
  }
};

//This will grab the messages from the chatroom
export const getMessagesFromDB = (chatId) => async (dispatch) => {
  //This is how we get the messages and display them to the page.
  try {
    const res = await axios.get(`/api/chatroom/msgs/${chatId}`);
    dispatch(clearMsgs()); // This will clear the page/chatroom
    dispatch({ type: GET_CHATROOM_MSGS, payload: res.data.messages });
  } catch (err) {
    console.log(err);
  }
};

//New action that is supposed to grab the chatroomId and proceed to send it to getmessages from chtroom
export const findChatroom = (chatroomIdd) => async (dispatch) => {
  //parameter is good
  try {
    const res = await axios.get(`/api/chatroom/find/${chatroomIdd}`);
    dispatch({ type: FIND_SPECIFIC_CHATROOM, payload: res.data });
  } catch (error) {
    console.log(error);
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

    dispatch({ type: STORE_SENT_MSGS, payload: res.data.messages.pop }); //This never fires?
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

//This is to determine if we need to open a new chatroom or reopen an old one
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
      dispatch({ type: GET_CHATROOM_ID, payload: res.data[0]._id });
      dispatch(getMessagesFromDB(res.data[0]._id));
      dispatch(bringChatroomIntoSight(res.data[0]._id));
    } catch (error) {
      console.log("Could not find any relevant chatrooms");
      dispatch(addChatroom(friendData));
    }
  } catch (error) {
    console.log(error);
  }
};

//This is to add a new chatroom entire which starts from the previous action
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

export const setCurrentChatroomId = (chatroomData) => (dispatch) => {
  //This is utilized for setting the Chat messages in the dashboard
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // console.log(chatroomData);
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

export const bringChatroomIntoSight = (chatroomID) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/chatroom/show/${chatroomID}`, config); // This is breaking the prog
    dispatch(getUsersChatrooms());
  } catch (error) {
    console.log(error);
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
    console.log(res.data);
    dispatch({ type: HIDE_CHAT, payload: res.data._id });
    dispatch(clearMsgs());
  } catch (error) {
    console.log(error);
  }
};

export const removeChatroomAfterDeletingFriend = (friendId) => async (
  dispatch
) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(`/api/chatroom/removal/${friendId}`, config);
    dispatch({
      type: REMOVE_CHATROOM_AFTER_REMOVING_FRIEND,
      payload: res.data._id,
    });
    dispatch();
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
