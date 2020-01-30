import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_LOADING,
  SET_CURRENT_USER,
  USER_LOADED,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  loading: false,
  isAuthenticated: null,
  user: null,
  error: null
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
        localStorage.setItem('token',action.payload.token);
        // console.log(action.payload)
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          ...action.payload
        }
        case USER_LOADED:
          return{
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
          }
    case SET_LOADING:
      return{
        ...state,
        loading: true
      }
      case GET_ERRORS:
        localStorage.removeItem('token');
        console.log(action.payload)
        return {
          ...state,
          loading: false,
          isAuthenticated: null,
          user: null,
          error: [action.payload]
        }
    default:
      return state;
  }
};