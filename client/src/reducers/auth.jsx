import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, AUTHENTICATED, NOT_AUTHENTICATED, SIGNUP_SUCCESS, SIGNUP_FAIL } from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
      };
    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case NOT_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
