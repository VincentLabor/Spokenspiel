import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducers";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import {routerMiddleware} from 'connected-react-router';
// import {createBrowserHistory} from 'history';
// import createRootReducer from './reducers';

// export const initialState = {};

// export const history = createBrowserHistory();

// const middleware = [thunk, routerMiddleware(history)];

// export default function configureStore(preloadedState){
//   const store = createStore(
//     createRootReducer(history),
//     preloadedState,
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
//   );
//   return store;
// }

// // export default store;
// //Will temporarily rename store to configureStore