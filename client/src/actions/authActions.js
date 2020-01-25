import React from "react";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_ERROR,
  SET_LOADING
} from "../actions/types";

export const loginUser = formData => async dispatch => {
  const configure = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    loading();
  } catch (error) {
    console.log(error);
  }
};

export const getUser = () => async dispatch => {
  try {

    
  } catch (error) {}
};

export const loading = () => {
  return {
    type: SET_LOADING
  };
};
