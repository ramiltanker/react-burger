import { feedReducer, initialState } from "./feed";

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../actions/wsActions";

describe("feed reducer", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, {})).toEqual({
      wsConnected: false,
      wsError: null,
      feedData: {},
    });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      feedReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        wsConnected: true,
      })
    );
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      feedReducer(initialState, {
        type: WS_CONNECTION_ERROR,
        payload: "Ошибка",
      })
    ).toEqual(
      expect.objectContaining({
        wsError: "Ошибка",
        wsConnected: false,
      })
    );
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      feedReducer(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        wsConnected: false,
      })
    );
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      feedReducer(initialState, {
        type: WS_GET_MESSAGE,
        payload: [{ order: 1 }, { order: 2 }],
      })
    ).toEqual(
      expect.objectContaining({
        wsError: null,
        feedData: [{ order: 1 }, { order: 2 }],
      })
    );
  });

  it("should handle WS_CONNECTION_START", () => {
    expect(
      feedReducer(initialState, {
        type: WS_CONNECTION_START,
      })
    ).toEqual({});
  });
});
