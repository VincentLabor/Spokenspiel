import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

export const setAlert = msg => async dispatch => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: { msg, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 7000);
};

export const removeAlert = () => async dispatch => {
  dispatch({ type: REMOVE_ALERT });
};
