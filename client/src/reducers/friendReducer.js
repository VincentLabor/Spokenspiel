import { GET_FRIENDS, ADD_FRIEND, DELETE_FRIEND } from "../actions/types";

const initialState = {
  friends: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
