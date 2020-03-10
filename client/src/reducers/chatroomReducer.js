import { ADD_CHATROOM, GET_CHATROOM,GET_NAME_CHATROOM } from "../actions/types";

const initialState = {
  chatrooms: [],
  loading: false,
  current: null,
  // filtered: null, Maybe will include
  usersInvolved: null,
  currentChatroomName: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOM:
      return{
        ...state,
        chatrooms:[...action.payload]
      }
      case ADD_CHATROOM:
        console.log(action.payload)
          return{
              ...state,
              chatrooms: [...state.chatrooms, action.payload]
          };
          case GET_NAME_CHATROOM:
            console.log(action.payload)
            return{
              ...state,
              currentChatroomName: action.payload
            }
    default:
      return state;
  }
};
