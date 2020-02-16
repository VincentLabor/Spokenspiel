import {
  GET_FRIENDS,
  ADD_FRIEND,
  DELETE_FRIEND,
  ACCEPT_FRIEND_REQ,
  USER_LOADED,
  GET_FRIEND_REQS,
  CLEAR_FRIEND_STATE,
  REMOVE_FRIEND_REQ
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
      return {
        ...state,
        user: action.payload
      };
    case ACCEPT_FRIEND_REQ:
      return {
        ...state,
        friends: [...state.friends, action.payload] //This allows you to add to already established friendslist array
      };
    case REMOVE_FRIEND_REQ:
      return {
        ...state,
        currentFriendReqs: state.currentFriendReqs.filter(
          friendRequest => friendRequest._id === action.payload
        )
      };
    case GET_FRIEND_REQS:
      console.log(action.payload);
      return {
        ...state,
        currentFriendReqs: action.payload
      };
    case CLEAR_FRIEND_STATE:
      return {
        ...state,
        friends: null,
        loading: false,
        current: null,
        filtered: null,
        friendRequested: null,
        acceptedFriend: null,
        user: null,
        currentFriendReqs: null
      };
    default:
      return state;
  }
};
