import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_FAILED,
  USER_REGISTRATION_SUCCES,
  GET_USER_REQUEST,
  GET_USER_SUCCES,
  GET_USER_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCES,
  USER_LOGIN_FAILED,
  TOKEN_CHECK_REQUEST,
  TOKEN_CHECK_SUCCES,
  TOKEN_CHECK_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCES,
  USER_LOGOUT_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCES,
  UPDATE_USER_FAILED,
} from "../actions/auth.js";

const initialState = {
  user: {},

  registrationRequest: false,
  registratioFailded: false,

  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  getUserRequest: false,
  getUserFailed: false,

  tokenRequest: false,
  tokenFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registratioFailded: false,
      };
    }
    case USER_REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registratioFailded: true,
      };
    }
    case USER_REGISTRATION_SUCCES: {
      localStorage.setItem("refreshToken", action.refreshToken);
      return {
        ...state,
        registrationRequest: false,
        registratioFailded: false,
        user: action.user,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
      };
    }
    case GET_USER_SUCCES: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: action.user,
      };
    }
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case USER_LOGIN_SUCCES: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
        user: action.user,
      };
    }
    case TOKEN_CHECK_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
      };
    }
    case TOKEN_CHECK_SUCCES: {
      return {
        ...state,
        tokenFailed: false,
        tokenRequest: false,
      };
    }
    case TOKEN_CHECK_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        tokenRequest: false,
      };
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case USER_LOGOUT_SUCCES: {
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        user: {},
        logoutRequest: false,
        logoutFailed: false,
      };
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCES: {
      return {
        ...state,
        user: action.user,
        updateUserRequest: false,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
