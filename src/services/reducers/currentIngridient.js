import {
  GET_CURRENT_INGRIDIENT_REQUEST,
  GET_CURRENT_INGRIDIENT_SUCCESS,
  GET_CURRENT_INGRIDIENT_FAILED,
  GET_CURRENT_INGRIDIENT_DELETE,
} from "../actions/currentIngridient";

const initialState = {
  currentIngridient: {},
  currentIngridientFailed: false,
  currentIngridientRequest: false,
};

export const currentIngridientReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CURRENT_INGRIDIENT_REQUEST: {
      return {
        ...state,
        currentIngridientRequest: true,
      };
    }
    case GET_CURRENT_INGRIDIENT_SUCCESS: {
      return {
        ...state,
        currentIngridientFailed: false,
        currentIngridient: action.currentIngridient,
        currentIngridientRequest: false,
      };
    }
    case GET_CURRENT_INGRIDIENT_FAILED: {
      return {
        ...state,
        currentIngridientFailed: true,
        currentIngridientRequest: false,
      };
    }
    case GET_CURRENT_INGRIDIENT_DELETE: {
      return {
        ...state,
        currentIngridient: {},
      };
    }
    default: {
      return state;
    }
  }
};
