import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./userType";

const initialState = {
  token: null,
  auth: false,
  loading: false,
  error: false,
  isAuthenticated: false,
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        token: payload,
        isAuthenticated: true,
        auth: true,
      };
    }

    case LOGIN_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      }
    }
    case REGISTER_USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
}
