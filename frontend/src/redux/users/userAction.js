import axios from "axios";
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER
} from "./userType";
import { BASE_URL } from "../config/config";

export const getUser = (obj) => async (distpatch) => {
  distpatch({ type: LOGIN_USER_LOADING });
  try {
    let data = await axios(BASE_URL + "/users/login", {
      method: "post",
      data: obj,
    });
    let { message, token, status } = data.data;
    if (status === 1) {
      distpatch({ type: LOGIN_USER_SUCCESS, payload: token });
      localStorage.setItem("token", token);
    } else {
      alert(message);
      distpatch({ type: LOGIN_USER_ERROR });
    }
  } catch (error) {
    distpatch({ type: LOGIN_USER_ERROR });
  }
};

export const registerUser = (obj) => async (distpatch) => {
  try {
    let data = await axios(BASE_URL + "/users/register", {
      method: "post",
      data: obj,
    });
    let { message, status } = data.data;
    if (status === 1) {
      alert(message);
      distpatch({ type: REGISTER_USER_SUCCESS, payload: message });
      window.location.href = "/login";
    } else {
      alert(message);
      distpatch({ type: REGISTER_USER_ERROR , payload: message});
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Email already exists') {
      alert('Email already exists. Please use a different email.');
    } else {
      alert('Something went wrong. Please try again later.');
    }
    distpatch({ type: REGISTER_USER_ERROR, payload: 'Something went wrong. Please try again later.' });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  if (localStorage.getItem("token") === null) {
    dispatch({ type:LOGOUT_USER });
    window.location.href = "/login";
  }else{
    alert("Something went wrong. Please try again later.");
  }
  
};
