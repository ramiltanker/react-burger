import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    GET_ORDER_DELETE,
  } from "../actions/order.js";
  
  const initialState = {
    order: {},
   orderFailed: false,
   orderRequest: false,
  };
  
  export const orderReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case GET_ORDER_REQUEST: {
        return {
          ...state,
         orderRequest: true,
        };
      }
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
         orderFailed: false,
         order: action.order,
         orderRequest: false,
        };
      }
      case GET_ORDER_FAILED: {
        return {
          ...state,
         orderFailed: true,
         orderRequest: false,
        };
      }
      default: {
        return state;
      }
    }
  };
  