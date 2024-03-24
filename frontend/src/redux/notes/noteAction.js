import axios from "axios";
import { BASE_URL } from "../config/config";
import { LOGOUT_USER } from "../users/userType";
import {
  CREATE_NOTES_ERROR,
  CREATE_NOTES_LOADING,
  CREATE_NOTES_SUCCESS,
  DELETE_NOTES_ERROR,
  DELETE_NOTES_LOADING,
  DELETE_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  GET_NOTES_LOADING,
  GET_NOTES_SUCCESS,
  UPDATE_NOTES_ERROR,
  UPDATE_NOTES_LOADING,
  UPDATE_NOTES_SUCCESS,
} from "./noteType";

export const getNotes = () => async (dispatch) => {
  //const { token } = store.getState().userReducer;
  const token = localStorage.getItem("token");

  dispatch({ type: GET_NOTES_LOADING });
  try {
    const res = await axios(BASE_URL + "/notes", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const { status, message, data } = res.data;
    console.log("Res data   -" + data);
    if (status === 1) {
      dispatch({ type: GET_NOTES_SUCCESS, payload: data });
    } else if (status === 2) {
      dispatch({ type: LOGOUT_USER });
    } else {
      dispatch({ type: GET_NOTES_ERROR });
      console.log(message.error);
    }
  } catch (error) {
    dispatch({ type: GET_NOTES_ERROR });
  }
};

export const createNotes = (obj) => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch({ type: CREATE_NOTES_LOADING });
  try {
    const res = await axios(BASE_URL + "/notes/create", {
      method: "POST",
      data: obj,
      headers: {
        Authorization: token,
      },
    });

    const { status, message } = res.data;
    console.log(message);
    if (status === 1) {
      dispatch({ type: CREATE_NOTES_SUCCESS });
      dispatch(getNotes());
    } else if (status === 2) {
      dispatch({ type: LOGOUT_USER });
    } else {
      dispatch({ type: CREATE_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: CREATE_NOTES_ERROR });
  }
};

export const deleteNotes = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch({ type: DELETE_NOTES_LOADING });
  try {
    const res = await axios(BASE_URL + "/notes/", {
      method: "DELETE",
      headers: {
        Authorization: token,
        id: id,
      },
    });

    const { status, message } = res.data;
    console.log(message);
    if (status === 1) {
      dispatch({ type: DELETE_NOTES_SUCCESS });
      dispatch(getNotes());
    } else if (status === 2) {
      dispatch({ type: LOGOUT_USER });
    } else {
      dispatch({ type: DELETE_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: DELETE_NOTES_ERROR });
  }
};

export const updateNotes = (id, obj) => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch({ type: UPDATE_NOTES_LOADING });
  try {
    const res = await axios(BASE_URL + "/notes/", {
      method: "PATCH",
      data: obj,
      headers: {
        Authorization: token,
        id: id,
      },
    });

    const { status, message } = res.data;
    console.log(message);
    if (status === 1) {
      dispatch({ type: UPDATE_NOTES_SUCCESS });
      dispatch(getNotes());
    } else if (status === 2) {
      dispatch({ type: LOGOUT_USER });
    } else {
      dispatch({ type: UPDATE_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: UPDATE_NOTES_ERROR });
  }
};
