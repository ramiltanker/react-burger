import { getCookie, setCookie } from "../../utils/cookie";

import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_MESSAGE,
  WS_AUTH_SEND_MESSAGE,
} from "../actions/wsActions";

import tokenCheck from "../../utils/tokenCheck";

export const socketMiddlewareAuth = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const accessToken = getCookie("accessToken");

      if (type === WS_AUTH_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_AUTH_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_AUTH_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;

          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          if (
            parsedData.message &&
            parsedData.message === "Invalid or missing token"
          ) {
            const refreshToken = localStorage.getItem("refreshToken");

            tokenCheck(refreshToken).then((res) => {
              setCookie("accessToken", res.accessToken);
              localStorage.setItem("refreshToken", res.refreshToken);

              dispatch({ type: WS_AUTH_CONNECTION_START });
            });
          }

          dispatch({ type: WS_AUTH_GET_MESSAGE, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_AUTH_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_AUTH_SEND_MESSAGE) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
