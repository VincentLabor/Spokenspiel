import {
  ADD_CHATROOM,
  GET_CHATROOM,
  GET_NAME_CHATROOM,
  STORE_MSGS,
  REMOVE_MSGS,
  GET_CHATROOM_ID
} from "../actions/types";

const initialState = {
  chatrooms: [],
  loading: false,
  current: null,
  currentChatroomId: null,
  // filtered: null, Maybe will include
  usersInvolved: null,
  currentChatroomName: null,
  msgs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOM:
      return {
        ...state,
        chatrooms: [...action.payload]
      };
    case GET_CHATROOM_ID:
      return {
        ...state,
        currentChatroomId: action.payload
      };

    case ADD_CHATROOM:
      console.log(action.payload);
      return {
        ...state,
        chatrooms: [...state.chatrooms, action.payload]
      };
    case GET_NAME_CHATROOM:
      console.log(action.payload);
      return {
        ...state,
        currentChatroomName: action.payload
      };
    case STORE_MSGS:
      return {
        ...state,
        msgs: [...state.msgs, action.payload]
      };
    case REMOVE_MSGS:
      return {
        ...state,
        msgs: []
      };
    default:
      return state;
  }
};
