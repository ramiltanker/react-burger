import { userOrdersReducer, initialState } from "./userOrders";

import {
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_SEND_MESSAGE,
  } from "../actions/wsActions";

describe("userOrders reducer", () => {
  it("should return the initial state", () => {
    expect(userOrdersReducer(undefined, {})).toEqual({
      wsConnected: false,
      wsError: null,
      ordersData: {},
    });
  });

  it("should handle WS_AUTH_CONNECTION_SUCCESS", () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_AUTH_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        wsConnected: true,
      })
    );
  });

  it("should handle WS_AUTH_CONNECTION_ERROR", () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_AUTH_CONNECTION_ERROR,
        payload: "Ошибка",
      })
    ).toEqual(
      expect.objectContaining({
        wsError: "Ошибка",
        wsConnected: false,
      })
    );
  });

  it("should handle WS_AUTH_CONNECTION_CLOSED", () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_AUTH_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        wsConnected: false,
      })
    );
  });

  it("should handle WS_AUTH_GET_MESSAGE", () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_AUTH_GET_MESSAGE,
        payload: [{ order: 1 }, { order: 2 }],
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        ordersData: [{ order: 1 }, { order: 2 }],
      })
    );
  });

  it("should handle WS_AUTH_CONNECTION_START", () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_AUTH_CONNECTION_START,
      })
    ).toEqual({});
  });
});
