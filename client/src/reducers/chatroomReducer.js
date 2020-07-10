import {
  ADD_CHATROOM,
  GET_CHATROOM,
  GET_NAME_CHATROOM,
  STORE_MSGS,
  REMOVE_MSGS,
  GET_CHATROOM_ID,
  SET_LOADING,
  GENERAL_CHAT,
  ENTERING_GENERAL_CHAT,
  REMOVE_ALL_CHATROOM,
  GET_CHATROOM_MSGS,
  GET_SPECIFIC_CHATROOM,
  STORE_SENT_MSGS,
  HIDE_CHAT,
  FIND_SPECIFIC_CHATROOM,
  GRAB_UNREAD_COUNT,
  // UNREAD_MSG_COUNT,
  // LAST_SENDER,
  //UNHIDE_CHATROOM,
  REMOVE_CHATROOM_AFTER_REMOVING_FRIEND,
  CLEAR_CHAT_STATE,
} from "../actions/types";

const initialState = {
  chatrooms: [],
  loading: false,
  //current: null, //Not sure what this does
  currentChatroomId: null,
  // filtered: null, Maybe will include
  usersInvolved: null,
  currentChatroomName: null,
  msgs: [],
  // isTheUserInGeneralChat: true,
  chatRoomExists: null,
  currentSelectChatroom: null,
  unreadMsgs: 0,
  lastUserToSendMsg: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOM:
      return {
        ...state,
        chatrooms: [...action.payload.slice(0)],
        loading: false,
      };
    case HIDE_CHAT:
      return {
        ...state,
        chatrooms: state.chatrooms.filter(
          (chatroom) => chatroom._id !== action.payload
        ),
      };
    case REMOVE_CHATROOM_AFTER_REMOVING_FRIEND:
      return {
        ...state,
        chatrooms: state.chatrooms.filter(
          (chatroom) => chatroom._id !== action.payload
        ),
      };
    case GET_CHATROOM_ID:
      return {
        ...state,
        currentChatroomId: action.payload,
        loading: false,
      };
    case GENERAL_CHAT:
      return {
        ...state,
        isTheUserInGeneralChat: state.isTheUserInGeneralChat,
      };
    case ENTERING_GENERAL_CHAT:
      return {
        ...state,
        currentChatroomId: action.payload,
      };
    case GET_SPECIFIC_CHATROOM:
      return {
        ...state,
        chatRoomExists: action.payload,
      };
    case FIND_SPECIFIC_CHATROOM:
      console.log(action.payload);
      return {
        ...state,
        currentSelectChatroom: action.payload,
      };
    case ADD_CHATROOM:
      return {
        ...state,
        chatrooms: [...state.chatrooms, action.payload],
        loading: false,
      };
    case GET_NAME_CHATROOM:
      console.log(action.payload);
      return {
        ...state,
        currentChatroomName: action.payload,
        loading: false,
      };
    case STORE_SENT_MSGS:
      return {
        ...state,
        msgs: [...state.msgs, action.payload],
      };
    case GRAB_UNREAD_COUNT:
      return {
        ...state,
        unreadMsgs: action.payload,
      };
    case STORE_MSGS:
      return {
        ...state,
        msgs: [...state.msgs, action.payload],
        loading: false,
      };
    case GET_CHATROOM_MSGS:
      return {
        ...state,
        msgs: action.payload.slice(0),
      };
    //  case LAST_SENDER:
    //  return {
    //    ...state,
    //  }

    case REMOVE_MSGS:
      return {
        ...state,
        msgs: null,
        loading: false,
      };
    case REMOVE_ALL_CHATROOM:
      return {
        ...state,
        chatrooms: [],
        loading: false,
        current: null,
        currentChatroomId: null,
        usersInvolved: null,
        currentChatroomName: null,
        msgs: [],
        isTheUserInGeneralChat: true,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_CHAT_STATE:
      return {
        ...state,
        chatrooms: [],
        loading: false,
        currentChatroomId: null,
        usersInvolved: null,
        currentChatroomName: null,
        msgs: [],
        chatRoomExists: null,
        currentSelectChatroom: null,
        unreadMsgs: 0,
        lastUserToSendMsg: null,
      };
    default:
      return state;
  }
};
