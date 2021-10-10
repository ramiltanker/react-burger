import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_SEND_MESSAGE,
} from "../actions/wsActions";

import { TWsActions } from "../actions/wsActions";
import { TUserOrders } from "../../types/userOrders";

type TUserOrdersInitialState = {
  wsConnected?: boolean;
  wsError?: null | any;
  ordersData?: TUserOrders;
};

export const initialState: TUserOrdersInitialState = {
  wsConnected: false,
  wsError: null,
  ordersData: undefined,
};

export const userOrdersReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_START:
      return {};
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false,
      };

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case WS_AUTH_GET_MESSAGE:
      return {
        ...state,
        wsError: null,
        ordersData: action.payload,
      };
    default:
      return state;
  }
};
