export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export const WS_AUTH_CONNECTION_START: "WS_AUTH_CONNECTION_START" =
  "WS_AUTH_CONNECTION_START";
export const WS_AUTH_CONNECTION_SUCCESS: "WS_AUTH_CONNECTION_SUCCESS" =
  "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR: "WS_AUTH_CONNECTION_ERROR" =
  "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_CLOSED: "WS_AUTH_CONNECTION_CLOSED" =
  "WS_AUTH_CONNECTION_CLOSED";
export const WS_AUTH_GET_MESSAGE: "WS_AUTH_GET_MESSAGE" = "WS_AUTH_GET_MESSAGE";
export const WS_AUTH_SEND_MESSAGE: "WS_AUTH_SEND_MESSAGE" =
  "WS_AUTH_SEND_MESSAGE";

export interface WsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface WsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface WsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}

export interface WsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface WsConnectionGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export interface WsConnectionSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}

export interface WsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

export interface WsAuthConnectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

export interface WsAuthConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
  readonly payload: any;
}

export interface WsAuthConnectionClosedAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

export interface WsAuthConnectionGetMessageAction {
  readonly type: typeof WS_AUTH_GET_MESSAGE;
  readonly payload: any;
}

export interface WsAuthConnectionSendMessageAction {
  readonly type: typeof WS_AUTH_SEND_MESSAGE;
}

// Union тип
export type TWsActions =
  | WsConnectionStartAction
  | WsConnectionSuccessAction
  | WsConnectionErrorAction
  | WsConnectionClosedAction
  | WsConnectionGetMessageAction
  | WsConnectionSendMessageAction
  | WsAuthConnectionStartAction
  | WsAuthConnectionSuccessAction
  | WsAuthConnectionErrorAction
  | WsAuthConnectionClosedAction
  | WsAuthConnectionGetMessageAction
  | WsAuthConnectionSendMessageAction;

export function wsInit() {
  return function (dispatch: any) {
    dispatch({
      type: WS_CONNECTION_START,
    });
  };
}

export function wsAuthInit() {
  return function (dispatch: any) {
    dispatch({
      type: WS_AUTH_CONNECTION_START,
    });
  };
}
