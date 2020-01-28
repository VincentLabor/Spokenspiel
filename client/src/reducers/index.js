import { combineReducers } from "redux";
import friendReducer from "./friendReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  friend: friendReducer,
  errors: errorReducer,
  auth: authReducer
});
