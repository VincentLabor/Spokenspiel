//Friend Related
export const GET_FRIENDS = "GET_FRIENDS";
export const GET_FRIEND_REQS = "GET_FRIEND_REQS";
export const ADD_FRIEND = "ADD_FRIEND";
export const ACCEPT_FRIEND_REQ = "ACCEPT_FRIEND_REQ";
export const REMOVE_FRIEND_REQ = "REMOVE_FRIEND_REQ";
export const DECLINE_FRIEND_REQ = "DECLINE_FRIEND_REQ";
export const DELETE_FRIEND = "DELETE_FRIEND";

//Login and Auth related
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

//Chatroom Related
export const GET_CHATROOM = "GET_CHATROOM"; //This grabs all of the chatrooms
export const GET_SPECIFIC_CHATROOM = "GET_SPECIFIC_CHATROOM";
export const FIND_SPECIFIC_CHATROOM = "FIND_SPECIFIC_CHATROOM";
export const GET_CHATROOM_MSGS = "GET_CHATROOM_MSGS";
export const GET_CHATROOM_ID = "GET_CHATROOM_ID";
export const GET_NAME_CHATROOM = "GET_NAME_CHATROOM";
export const ADD_CHATROOM = "ADD_CHATROOM";
export const REMOVE_CHATROOM = "REMOVE_CHATROOM";
export const REMOVE_CHATROOM_AFTER_REMOVING_FRIEND = "REMOVE_CHATROOM_AFTER_REMOVING_FRIEND";
export const CLEAR_CHAT_STATE = "CLEAR_CHAT_STATE";

//Chatroom: Messages
export const STORE_MSGS = "STORE_MSGS";
export const STORE_SENT_MSGS = "STORE_SENT_MSGS";
export const REMOVE_MSGS = "REMOVE_MSGS";
export const REMOVE_ALL_CHATROOM = "REMOVE_ALL_CHATROOM";
export const HIDE_CHAT = "HIDE_CHAT";
export const UNHIDE_CHATROOM = "UNHIDE_CHATROOM";
// export const UNREAD_MSG_COUNT = "UNREAD_MSG_COUNT";
// export const LAST_SENDER = "LAST_SENDER";
export const GRAB_UNREAD_COUNT = "GRAB_UNREAD_COUNT";
export const CLEAR_UNREAD_AND_LAST_USER = "CLEAR_UNREAD_AND_LAST_USER";

//Specifically General Chat
export const GENERAL_CHAT = "GENERAL_CHAT";
export const ENTERING_GENERAL_CHAT = "ENTERING_GENERAL_CHAT";
export const LEAVING_GENERAL_CHAT = "LEAVING_GENERAL_CHAT";

//ETC
export const SET_LOADING = "SET_LOADING";
export const GET_ERRORS = "GET_ERRORS";
export const CAUGHT_ERROR = "CAUGHT_ERROR";
export const USER_LOADED = "USER_LOADED";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const CLEAR_STATE = "CLEAR_STATE";
export const CLEAR_FRIEND_STATE = "CLEAR_FRIEND_STATE";
