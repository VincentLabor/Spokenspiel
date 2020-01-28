import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_ERROR,
  SET_LOADING,
  SET_CURRENT_USER
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  loading: false,
  isAuthenticated: null,
  error: null,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return{
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
      case REGISTER_SUCCESS:
        return {
          ...state,
          user: action.payload
        }
    case SET_LOADING:
      return{
        ...state,
        loading: true
      }
    default:
      return state;
  }
};
