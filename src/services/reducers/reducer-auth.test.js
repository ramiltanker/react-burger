import { authReducer, initialState } from "./auth";

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
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCES,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCES,
  RESET_PASSWORD_FAILED,
} from "../actions/auth.js";

describe("burgerIngridients reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
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

      forgotPasswordRequest: false,
      forgotPasswordFailed: false,
      forgotPasswordSucces: false,

      reserPasswordRequest: false,
      reserPasswordFailed: false,
      reserPasswordSucces: false,
    });
  });

  if (
    ("should handle USER_REGISTRATION_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_REGISTRATION_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          registrationRequest: true,
          registratioFailded: false,
        })
      );
    })
  );

  if (
    ("should handle USER_REGISTRATION_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_REGISTRATION_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          registrationRequest: false,
          registratioFailded: true,
        })
      );
    })
  );

  if (
    ("should handle USER_REGISTRATION_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_REGISTRATION_SUCCES,
          user: { name: "a", id: 0 },
        })
      ).toEqual(
        expect.objectContaining({
          registrationRequest: false,
          registratioFailded: false,
          user: { name: "a", id: 0 },
        })
      );
    })
  );

  if (
    ("should handle GET_USER_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: GET_USER_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          getUserRequest: true,
          getUserFailed: false,
        })
      );
    })
  );

  if (
    ("should handle GET_USER_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: GET_USER_SUCCES,
          user: { name: "a", id: 0 },
        })
      ).toEqual(
        expect.objectContaining({
          getUserRequest: false,
          getUserFailed: false,
          user: { name: "a", id: 0 },
        })
      );
    })
  );

  if (
    ("should handle GET_USER_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: GET_USER_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          getUserRequest: false,
          getUserFailed: true,
        })
      );
    })
  );

  if (
    ("should handle USER_LOGIN_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_LOGIN_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          loginRequest: true,
          loginFailed: false,
          loginSuccess: false,
        })
      );
    })
  );

  if (
    ("should handle USER_LOGIN_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_LOGIN_SUCCES,
          user: { name: "a", id: 0 },
        })
      ).toEqual(
        expect.objectContaining({
          loginRequest: false,
          loginFailed: false,
          loginSuccess: true,
          user: { name: "a", id: 0 },
        })
      );
    })
  );

  if (
    ("should handle USER_LOGIN_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_LOGIN_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          loginRequest: false,
          loginFailed: true,
          loginSuccess: false,
        })
      );
    })
  );

  if (
    ("should handle TOKEN_CHECK_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: TOKEN_CHECK_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          tokenRequest: true,
        })
      );
    })
  );

  if (
    ("should handle TOKEN_CHECK_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: TOKEN_CHECK_SUCCES,
        })
      ).toEqual(
        expect.objectContaining({
          tokenFailed: false,
          tokenRequest: false,
        })
      );
    })
  );

  if (
    ("should handle TOKEN_CHECK_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: TOKEN_CHECK_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          tokenFailed: true,
          tokenRequest: false,
        })
      );
    })
  );

  if (
    ("should handle USER_LOGOUT_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_LOGOUT_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          logoutRequest: true,
          logoutFailed: false,
        })
      );
    })
  );

  if (
    ("should handle USER_LOGOUT_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_LOGOUT_SUCCES,
        })
      ).toEqual(
        expect.objectContaining({
          user: {},
          logoutRequest: false,
          logoutFailed: false,
          loginSuccess: false,
        })
      );
    })
  );

  if (
    ("should handle USER_LOGOUT_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: USER_LOGOUT_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          logoutRequest: false,
          logoutFailed: true,
        })
      );
    })
  );

  if (
    ("should handle UPDATE_USER_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: UPDATE_USER_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          updateUserRequest: true,
          updateUserFailed: false,
        })
      );
    })
  );

  if (
    ("should handle UPDATE_USER_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: UPDATE_USER_SUCCES,
          user: { name: "new name" },
        })
      ).toEqual(
        expect.objectContaining({
          user: { name: "new name" },
          updateUserRequest: false,
          updateUserFailed: false,
        })
      );
    })
  );

  if (
    ("should handle UPDATE_USER_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: UPDATE_USER_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          updateUserRequest: false,
          updateUserFailed: true,
        })
      );
    })
  );

  if (
    ("should handle FORGOT_PASSWORD_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: FORGOT_PASSWORD_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          forgotPasswordRequest: true,
          forgotPasswordFailed: false,
          forgotPasswordSucces: false,
        })
      );
    })
  );

  if (
    ("should handle FORGOT_PASSWORD_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: FORGOT_PASSWORD_SUCCES,
        })
      ).toEqual(
        expect.objectContaining({
          forgotPasswordRequest: false,
          forgotPasswordFailed: false,
          forgotPasswordSucces: true,
        })
      );
    })
  );

  if (
    ("should handle FORGOT_PASSWORD_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: FORGOT_PASSWORD_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          forgotPasswordRequest: false,
          forgotPasswordFailed: true,
          forgotPasswordSucces: false,
        })
      );
    })
  );

  if (
    ("should handle RESET_PASSWORD_REQUEST",
    () => {
      expect(
        authReducer(initialState, {
          type: RESET_PASSWORD_REQUEST,
        })
      ).toEqual(
        expect.objectContaining({
          resetPasswordRequest: true,
          resetPasswordFailed: false,
          resetPasswordSucces: false,
        })
      );
    })
  );

  if (
    ("should handle RESET_PASSWORD_SUCCES",
    () => {
      expect(
        authReducer(initialState, {
          type: RESET_PASSWORD_SUCCES,
        })
      ).toEqual(
        expect.objectContaining({
          resetPasswordRequest: false,
          resetPasswordFailed: false,
          resetPasswordSucces: true,
        })
      );
    })
  );

  if (
    ("should handle RESET_PASSWORD_FAILED",
    () => {
      expect(
        authReducer(initialState, {
          type: RESET_PASSWORD_FAILED,
        })
      ).toEqual(
        expect.objectContaining({
          resetPasswordRequest: false,
          resetPasswordFailed: true,
          resetPasswordSucces: false,
        })
      );
    })
  );
});
