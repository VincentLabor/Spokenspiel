import {
  GET_FRIENDS,
  ADD_FRIEND,
  DELETE_FRIEND,
  ACCEPT_FRIEND_REQ,
  USER_LOADED,
  GET_FRIEND_REQS
} from "../actions/types";

const initialState = {
  friends: null,
  loading: false,
  current: null,
  filtered: null,
  friendRequested: null,
  acceptedFriend: null,
  user: null,
  currentFriendReqs: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };
    case ADD_FRIEND:
      return {
        ...state,
        friendRequested: action.payload
      };
      case USER_LOADED:
         console.log(action.payload);
        return{
          ...state,
          user: action.payload
        }
      case ACCEPT_FRIEND_REQ:
        return{
          ...state,
          friends: action.payload
        }
        case GET_FRIEND_REQS: 
        return{
          ...state,
          currentFriendReqs: action.payload
        }
    default:
      return state;
  }
};
