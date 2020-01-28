import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_ERROR,
  SET_LOADING,
  SET_CURRENT_USER,
  USER_LOADED
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
        localStorage.setItem('token',action.payload.token);
        console.log(action.payload)
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          ...action.payload
        }
        case REGISTER_FAILURE:
          localStorage.removeItem('token')
          return{
            ...state, 
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload
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
    default:
      return state;
  }
};
