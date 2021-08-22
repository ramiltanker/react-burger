import {
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_SEND_MESSAGE,
  } from "../actions/wsActions";
  
  export const initialState = {
    wsConnected: false,
    wsError: null,
    ordersData: {},
  };
  
  export const userOrdersReducer = (state = initialState, action) => {
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
  