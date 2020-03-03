import { ADD_CHATROOM, GET_CHATROOM } from "../actions/types";

const initialState = {
  chatrooms: [],
  loading: false,
  current: null,
  // filtered: null, Maybe will include
  usersInvolved: null
};

export default (state = initialState, action) => {
  switch (action.type) {
      case ADD_CHATROOM:
        console.log(action.payload)
          return{
              ...state,
              chatrooms: [...state.chatrooms, action.payload]
          };
    default:
      return state;
  }
};
