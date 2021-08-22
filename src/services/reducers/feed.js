import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
} from "../actions/wsActions";

export const initialState = {
  wsConnected: false,
  wsError: null,
  feedData: {},
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {};
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        wsError: null,
        feedData: action.payload,
      };
    default:
      return state;
  }
};
