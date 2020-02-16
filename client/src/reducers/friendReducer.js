import {
  GET_FRIENDS,
  ADD_FRIEND,
  DELETE_FRIEND,
  ACCEPT_FRIEND_REQ,
  USER_LOADED,
  GET_FRIEND_REQS,
  CLEAR_FRIEND_STATE
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
      console.log(action.payload);
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
        console.log(action.payload);
        return{
          ...state,
          currentFriendReqs: action.payload
        }
        case CLEAR_FRIEND_STATE:
          return{
            ...state, 
            friends: null,
            loading: false,
            current: null,
            filtered: null,
            friendRequested: null,
            acceptedFriend: null,
            user: null,
            currentFriendReqs: null
          }
    default:
      return state;
  }
};
