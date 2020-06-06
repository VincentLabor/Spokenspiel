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
  UNHIDE_CHATROOM,
  REMOVE_CHATROOM_AFTER_REMOVING_FRIEND,
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
  isTheUserInGeneralChat: true,
  chatRoomExists: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOM:
      return {
        ...state,
        chatrooms: [...action.payload.slice(0)],
        loading: false
      };
      case HIDE_CHAT:
        return{
          ...state,
          chatrooms: state.chatrooms.filter((chatroom) => chatroom._id !== action.payload),
        }
      case REMOVE_CHATROOM_AFTER_REMOVING_FRIEND:
        return{
          ...state,
          chatrooms: state.chatrooms.filter((chatroom) => chatroom._id !== action.payload),
        }
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
         ...state,
        currentChatroomId: action.payload
       };
    case GET_SPECIFIC_CHATROOM:
      return {
        ...state,
        chatRoomExists: action.payload
      }   
    case ADD_CHATROOM:
      return {
        ...state,
        chatrooms: [...state.chatrooms, action.payload],
        loading: false
      };
    case GET_NAME_CHATROOM:
      return {
        ...state,
        currentChatroomName: action.payload,
        loading: false
      };
       case STORE_SENT_MSGS:
         return {
           ...state,
           msgs: [...state.msgs, action.payload]
         }
     case STORE_MSGS:
       return {
         ...state,
         msgs: [...state.msgs, action.payload],
         loading: false
       }; 
     case GET_CHATROOM_MSGS: 
     return{
       ...state,
       msgs: action.payload.slice(0)
     } 
    case REMOVE_MSGS:
      return {
        ...state,
        msgs: null,
        loading: false
      };
      case REMOVE_ALL_CHATROOM: 
      return{
        ...state,
        chatrooms: [],
        loading: false,
        current: null,
        currentChatroomId: null,
        usersInvolved: null,
        currentChatroomName: null,
        msgs: [],
        isTheUserInGeneralChat: true,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
