export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";

export const WS_AUTH_CONNECTION_START = "WS_AUTH_CONNECTION_START";
export const WS_AUTH_CONNECTION_SUCCESS = "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR = "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_CLOSED = "WS_AUTH_CONNECTION_CLOSED";
export const WS_AUTH_GET_MESSAGE = "WS_AUTH_GET_MESSAGE";
export const WS_AUTH_SEND_MESSAGE = "WS_AUTH_SEND_MESSAGE";

export function wsInit() {
  return function (dispatch) {
    dispatch({
      type: WS_CONNECTION_START,
    });
  };
}

export function wsAuthInit() {
  return function (dispatch) {
    dispatch({
      type: WS_AUTH_CONNECTION_START,
    });
  };
}
