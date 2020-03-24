import {
  ADD_CHATROOM,
  GET_CHATROOM,
  GET_NAME_CHATROOM,
  STORE_MSGS,
  REMOVE_MSGS,
  GET_CHATROOM_ID,
  SET_LOADING,
  GENERAL_CHAT,
  ENTERING_GENERAL_CHAT
} from "../actions/types";

const initialState = {
  chatrooms: [],
  loading: false,
  current: null,
  currentChatroomId: null,
  // filtered: null, Maybe will include
  usersInvolved: null,
  currentChatroomName: null,
  msgs: [],
  isTheUserInGeneralChat: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOM:
      return {
        ...state,
        chatrooms: [...action.payload],
        loading: false
      };
    case GET_CHATROOM_ID:
      return {
        ...state,
        currentChatroomId: action.payload,
        loading: false
      };
    case GENERAL_CHAT:
      return {
        ...state,
        isTheUserInGeneralChat: state.isTheUserInGeneralChat
      };
     case ENTERING_GENERAL_CHAT:
       return {
         ...state
    
       };
    case ADD_CHATROOM:
      console.log(action.payload);
      return {
        ...state,
        chatrooms: [...state.chatrooms, action.payload],
        loading: false
      };
    case GET_NAME_CHATROOM:
      console.log(action.payload);
      return {
        ...state,
        currentChatroomName: action.payload,
        loading: false
      };
    case STORE_MSGS:
      return {
        ...state,
        msgs: [...state.msgs, action.payload],
        loading: false
      };
    case REMOVE_MSGS:
      return {
        ...state,
        msgs: [],
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
