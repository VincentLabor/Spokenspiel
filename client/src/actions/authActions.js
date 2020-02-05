import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  REGISTER_SUCCESS,
  SET_LOADING,
  SET_CURRENT_USER,
  USER_LOADED,
  GET_ERRORS,
  CLEAR_STATE
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alertActions";
// import {browserHistory} from 'react-router-dom';


export const loadUser = () => async dispatch => { //For some reason this doesn't do anything.
  // console.log(localStorage)
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    console.log(res.data)
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
    // browserHistory.push('/dashboard')
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
    // push("/dashboard")
  } catch (err) {
    // console.log(err.response.data);
    dispatch({ type: GET_ERRORS, payload: err.response.data });
    dispatch(setAlert(err.response.data.msg)); // This allows us to reach the other set of actions.
  }
};

export const clearState = () => async dispatch =>{
  dispatch({type: CLEAR_STATE});
}

export const loading = () => {
  return {
    type: SET_LOADING
  };
};
