import { combineReducers } from "redux";
import friendReducer from "./friendReducer";
import authReducer from "./authReducer";
import alertReducer from './alertReducer';
import chatroomReducer from './chatroomReducer';

export default combineReducers({
  friend: friendReducer,
  auth: authReducer,
  alert: alertReducer,
  chatroom: chatroomReducer
});
