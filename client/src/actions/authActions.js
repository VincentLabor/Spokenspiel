
import axios from "axios";
import {
  REGISTER_SUCCESS,
  SET_LOADING,
  SET_CURRENT_USER,
  USER_LOADED,
  GET_ERRORS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = formData => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const registerUser = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    loading();
    const res = await axios.post("/api/users", formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    loadUser();
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });

  }
};

export const loginUser = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    loading();
    const res = await axios.post("/api/auth", formData, config);
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data
    });

    loadUser();
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const loading = () => {
  return {
    type: SET_LOADING
  };
};
