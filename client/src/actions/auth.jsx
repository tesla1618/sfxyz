import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, AUTHENTICATED, NOT_AUTHENTICATED, SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";
import axios from "axios";
import { API_URL } from "../config";

const LOCALHOST = `${API_URL}`;

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(`${LOCALHOST}/auth/jwt/verify/`, body, config);
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED,
        });
      } else {
        dispatch({
          type: NOT_AUTHENTICATED,
        });
      }
    } catch (err) {
      dispatch({
        type: NOT_AUTHENTICATED,
      });
    }
  } else {
    dispatch({
      type: NOT_AUTHENTICATED,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(`${LOCALHOST}/auth/users/me/`, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`${LOCALHOST}/auth/jwt/create/`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signUp = (name, email, password, re_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, re_password });
  try {
    const res = await axios.post(`${LOCALHOST}/auth/users/`, body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    // dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};
