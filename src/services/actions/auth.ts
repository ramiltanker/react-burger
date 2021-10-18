import register from "../../utils/register";
import getUserData from "../../utils/getUserData";
import login from "../../utils/login";
import tokenCheck from "../../utils/tokenCheck";
import logout from "../../utils/logout";
import forgotPassword from "../../utils/forgotPassword";
import updateUser from "../../utils/updateUser";
import resetPassword from "../../utils/reset-password";

import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";

// Типизация
import {
  TUserRegistration,
  TUserAuth,
  TGetUserData,
  TLogoutData,
  TUpdateUserData,
} from "../../types/auth";
// Типизация

export const USER_REGISTRATION_REQUEST: "USER_REGISTRATION_REQUEST" =
  "USER_REGISTRATION_REQUEST";
export const USER_REGISTRATION_SUCCES: "USER_REGISTRATION_SUCCES" =
  "USER_REGISTRATION_SUCCES";
export const USER_REGISTRATION_FAILED: "USER_REGISTRATION_FAILED" =
  "USER_REGISTRATION_FAILED";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCES: "GET_USER_SUCCES" = "GET_USER_SUCCES";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST" = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCES: "USER_LOGIN_SUCCES" = "USER_LOGIN_SUCCES";
export const USER_LOGIN_FAILED: "USER_LOGIN_FAILED" = "USER_LOGIN_FAILED";

export const USER_LOGOUT_REQUEST: "USER_LOGOUT_REQUEST" = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCES: "USER_LOGOUT_SUCCES" = "USER_LOGOUT_SUCCES";
export const USER_LOGOUT_FAILED: "USER_LOGOUT_FAILED" = "USER_LOGOUT_FAILED";

export const TOKEN_CHECK_REQUEST: "TOKEN_CHECK_REQUEST" = "TOKEN_CHECK_REQUEST";
export const TOKEN_CHECK_SUCCES: "TOKEN_CHECK_SUCCES" = "TOKEN_CHECK_SUCCES";
export const TOKEN_CHECK_FAILED: "TOKEN_CHECK_FAILED" = "TOKEN_CHECK_FAILED";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCES: "FORGOT_PASSWORD_SUCCES" =
  "FORGOT_PASSWORD_SUCCES";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" =
  "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCES: "RESET_PASSWORD_SUCCES" =
  "RESET_PASSWORD_SUCCES";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCES: "UPDATE_USER_SUCCES" = "UPDATE_USER_SUCCES";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

// Типы для экшена регистрации
export interface IUserRegistrationRequestAction {
  readonly type: typeof USER_REGISTRATION_REQUEST;
}

export interface IUserRegistrationSuccesAction {
  readonly type: typeof USER_REGISTRATION_SUCCES;
  readonly user: TUserRegistration;
  readonly refreshToken: string;
}

export interface IUserRegistrationFailedAction {
  readonly type: typeof USER_REGISTRATION_FAILED;
}

// Типы для экшена получения данных пользователя
export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccesAction {
  readonly type: typeof GET_USER_SUCCES;
  readonly user: TGetUserData;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

// Типы для входа в систему
export interface IUserLoginRequestAction {
  readonly type: typeof USER_LOGIN_REQUEST;
}

export interface IUserLoginSuccesAction {
  readonly type: typeof USER_LOGIN_SUCCES;
  readonly user: TUserAuth;
}

export interface IUserLoginFailedAction {
  readonly type: typeof USER_LOGIN_FAILED;
}

// Типы для экшена выхода из системы
export interface IUserLogoutRequestAction {
  readonly type: typeof USER_LOGOUT_REQUEST;
}

export interface IUserLogoutSuccesAction {
  readonly type: typeof USER_LOGOUT_SUCCES;
  readonly user: TLogoutData;
}

export interface IUserLogoutFailedAction {
  readonly type: typeof USER_LOGOUT_FAILED;
}

// Типы для экшена токена
export interface ITokenCheckRequestAction {
  readonly type: typeof TOKEN_CHECK_REQUEST;
}

export interface ITokenCheckSuccesAction {
  readonly type: typeof TOKEN_CHECK_SUCCES;
}

export interface ITokenCheckFailedAction {
  readonly type: typeof TOKEN_CHECK_FAILED;
}

// Типы для экшена "забыл пароль"
export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccesAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCES;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

// Типы для экшена сбросить пароль
export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccesAction {
  readonly type: typeof RESET_PASSWORD_SUCCES;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

// Типы для экшена обновить данные пользователя
export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccesAction {
  readonly type: typeof UPDATE_USER_SUCCES;
  readonly user: TUpdateUserData;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

// Union тип
export type TAuthActions =
  | IUserRegistrationRequestAction
  | IUserRegistrationSuccesAction
  | IUserRegistrationFailedAction
  | IGetUserRequestAction
  | IGetUserSuccesAction
  | IGetUserFailedAction
  | IUserLoginRequestAction
  | IUserLoginSuccesAction
  | IUserLoginFailedAction
  | IUserLogoutRequestAction
  | IUserLogoutSuccesAction
  | IUserLogoutFailedAction
  | ITokenCheckRequestAction
  | ITokenCheckSuccesAction
  | ITokenCheckFailedAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccesAction
  | IForgotPasswordFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccesAction
  | IResetPasswordFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccesAction
  | IUpdateUserFailedAction;
// Union тип

export function handleRegistrationUser(
  name: string,
  email: string,
  password: string
) {
  return function (dispatch: any) {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    });
    register(name, email, password)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1], {});
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

export function handleLogin(email: string, password: string) {
  return function (dispatch: any) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    login(email, password)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken.split("Bearer ")[1], {});
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

export function handleCheckToken(refreshToken: string, nextFunc: () => void) {
  return function (dispatch: any) {
    dispatch({
      type: TOKEN_CHECK_REQUEST,
    });
    tokenCheck(refreshToken)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1], {});
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
        console.log(error);
      });
  };
}

export function handleGetUserData() {
  const token = getCookie("accessToken");
  return function (dispatch: any) {
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
          if (refreshToken)
            dispatch(handleCheckToken(refreshToken, handleGetUserData));
        }
        console.log(error);
      });
  };
}

export function handleUserLogout(refreshToken: string) {
  return function (dispatch: any) {
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

export function handleUpdateUser(token: string, email: string, name: string) {
  return function (dispatch: any) {
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

export function handleForgotPassword(email: string) {
  return function (dispatch: any) {
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

export function handleResetPassword(password: string, token: string) {
  return function (dispatch: any) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPassword(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCES });
        } else {
          dispatch({ type: RESET_PASSWORD_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: RESET_PASSWORD_FAILED });
        console.log(err);
      });
  };
}
