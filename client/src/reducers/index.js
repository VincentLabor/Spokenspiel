import { combineReducers } from "redux";
import friendReducer from "./friendReducer";
import authReducer from "./authReducer";
import alertReducer from './alertReducer';

export default combineReducers({
  friend: friendReducer,
  auth: authReducer,
  alert: alertReducer
});

// import { combineReducers } from "redux";
// import friendReducer from "./friendReducer";
// import authReducer from "./authReducer";
// import alertReducer from './alertReducer';
// import {connectRouter} from 'connected-react-router';

// const createRootReducer = history=> combineReducers({
//   router: connectRouter(history),
//   friend: friendReducer,
//   auth: authReducer,
//   alert: alertReducer
// });

// export default createRootReducer;