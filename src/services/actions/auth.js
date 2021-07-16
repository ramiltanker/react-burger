import register from "../../utils/register";
import getUserData from "../../utils/getUserData";
import login from "../../utils/login";
import tokenCheck from "../../utils/tokenCheck";
import logout from "../../utils/logout";
import forgotPassword from "../../utils/forgotPassword";
import updateUser from "../../utils/updateUser";

import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";

export const USER_REGISTRATION_REQUEST = "USER_REGISTRATION_REQUEST";
export const USER_REGISTRATION_SUCCES = "USER_REGISTRATION_SUCCES";
export const USER_REGISTRATION_FAILED = "USER_REGISTRATION_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCES = "GET_USER_SUCCES";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCES = "USER_LOGIN_SUCCES";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCES = "USER_LOGOUT_SUCCES";
export const USER_LOGOUT_FAILED = "USER_LOGOUT_FAILED";

export const TOKEN_CHECK_REQUEST = "TOKEN_CHECK_REQUEST";
export const TOKEN_CHECK_SUCCES = "TOKEN_CHECK_SUCCES";
export const TOKEN_CHECK_FAILED = "TOKEN_CHECK_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCES = "FORGOT_PASSWORD_SUCCES";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCES = "UPDATE_USER_SUCCES";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export function handleRegistrationUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    });
    register(name, email, password)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          console.log(res);
          dispatch({
            type: USER_REGISTRATION_SUCCES,
            user: res.user,
            refreshToken: res.refreshToken,
          });
        } else {
          dispatch({
            type: USER_REGISTRATION_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTRATION_FAILED,
        });
        console.log(error);
      });
  };
}

export function handleLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    login(email, password)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          dispatch({
            type: USER_LOGIN_SUCCES,
            user: res.user,
          });
        } else {
          dispatch({
            type: USER_LOGIN_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAILED,
        });
        console.log(error);
      });
  };
}

export function handleGetUserData(token) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserData(token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCES,
            user: res.user,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
        });
        if (error.message === "jwt expired") {
          const refreshToken = localStorage.getItem("refreshToken");
          dispatch(handleCheckToken(refreshToken));
          const accessToken = getCookie("accessToken");
          dispatch(handleGetUserData(accessToken));
        }
        console.log(error);
      });
  };
}

export function handleCheckToken(refreshToken, nextFunc) {
  return function (dispatch) {
    dispatch({
      type: TOKEN_CHECK_REQUEST,
    });
    tokenCheck(refreshToken)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          nextFunc();
          dispatch({
            type: TOKEN_CHECK_SUCCES,
          });
        } else {
          dispatch({
            type: TOKEN_CHECK_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TOKEN_CHECK_FAILED,
        });
        if (error.message === "Token is invalid") {
          const refreshToken = localStorage.getItem("refreshToken");
          dispatch(handleCheckToken(refreshToken));
        }
        console.log(error);
      });
  };
}

export function handleUserLogout(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    logout(refreshToken)
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          dispatch({ type: USER_LOGOUT_SUCCES });
        } else {
          dispatch({
            type: TOKEN_CHECK_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TOKEN_CHECK_FAILED,
        });
        console.log(error);
      });
  };
}

export function handleForgotPassword(email) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    forgotPassword(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCES });
        } else {
          dispatch({ type: FORGOT_PASSWORD_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
        console.log(err);
      });
  };
}

export function handleUpdateUser(token, email, name) {
  return function (dispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUser(token, email, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: UPDATE_USER_SUCCES, user: res.user });
        } else {
          dispatch({ type: UPDATE_USER_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: UPDATE_USER_FAILED });
        console.log(err);
      });
  };
}
