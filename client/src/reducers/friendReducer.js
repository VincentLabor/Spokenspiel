import { GET_FRIENDS, ADD_FRIEND, DELETE_FRIEND } from "../actions/types";

const initialState = {
  friends: null,
  loading: false,
  current: null,
  filtered: null,
  friendRequested: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return{
        ...state,
        friends: action.payload
      }
      case ADD_FRIEND: 
      return{
        ...state,
        friendRequested: action.payload
      }
    default:
      return state;
  }
};
