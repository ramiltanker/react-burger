import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
} from "../actions/wsActions";

import { TWsActions } from "../actions/wsActions";
import { TFeedData } from "../../types/feed";

type TFeedInitialState = {
  wsConnected?: boolean;
  wsError?: any;
  feedData?: TFeedData;
};

export const initialState: TFeedInitialState = {
  wsConnected: false,
  wsError: null,
  feedData: undefined,
};

export const feedReducer = (state = initialState, action: TWsActions) => {
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
