import React from "react";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_ERROR,
  SET_LOADING,
  SET_CURRENT_USER,
  USER_LOADED,
  GET_ERRORS
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
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const registerUser = formData => async dispatch => {


  console.log(formData)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post("/api/users", formData, config);
    

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    loadUser();
  } catch (err) {
    console.log(err);
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
  } catch (error) {
    console.log(error);
  }
};

export const loading = () => {
  return {
    type: SET_LOADING
  };
};
