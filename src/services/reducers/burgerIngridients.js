import {
  GET_BURGER_INGRIDIENTS_REQUEST,
  GET_BURGER_INGRIDIENTS_SUCCESS,
  GET_BURGER_INGRIDIENTS_FAILED,
  GET_BURGER_CONSTRUCTOR_REQUEST,
  GET_BURGER_CONSTRUCTOR_SUCCESS,
  GET_BURGER_CONSTRUCTOR_FAILED,
  GET_BURGER_CONSTRUCTOR_ADD_ITEM,
  GET_BURGER_CONSTRUCTOR_DELETE_ITEM,
} from "../actions/burgerIngridients.js";

const initialState = {
  burgerIngridientsArr: [],
  burgerIngridientsRequest: false,
  burgerIngridientsFailed: false,

  burgerConstructorIngridients: [],
  burgerConstructorIngridientsFailed: false,
  burgerConstructorIngridientsRequest: false,

  currentIngridient: {},

  order: {},
};

export const burgerIngridientsReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_BURGER_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        burgerIngridientsRequest: true,
      };
    }
    case GET_BURGER_INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        burgerIngridientsFailed: false,
        burgerIngridientsArr: action.burgerIngridientsArr,
        burgerIngridientsRequest: false,
      };
    }
    case GET_BURGER_INGRIDIENTS_FAILED: {
      return {
        ...state,
        burgerIngridientsFailed: true,
        burgerIngridientsRequest: false,
      };
    }
    case GET_BURGER_CONSTRUCTOR_REQUEST: {
      return {
        ...state,
        burgerConstructorIngridientsRequest: true,
      };
    }
    case GET_BURGER_CONSTRUCTOR_SUCCESS: {
      return {
        ...state,
        burgerConstructorIngridientsFailed: false,
        burgerConstructorIngridients: action.burgerConstructorIngridients,
        burgerConstructorIngridientsRequest: false,
      };
    }
    case GET_BURGER_CONSTRUCTOR_FAILED: {
      return {
        ...state,
        burgerConstructorIngridientsFailed: true,
        burgerConstructorIngridientsRequest: false,
      };
    }
    case GET_BURGER_CONSTRUCTOR_ADD_ITEM: {
      return {
        ...state,
        burgerConstructorIngridients: [
          ...state.burgerConstructorIngridients,
          ...state.burgerIngridientsArr.filter((item) => { 
            console.log(item.id);
            console.log(action.id);
            return item.id === action.id 
          }),
        ],
      };
    }
    case GET_BURGER_CONSTRUCTOR_DELETE_ITEM: {
      return {
        ...state,
        burgerConstructorIngridients: [
          ...state.burgerConstructorIngridients,
        ].filter((item) => item.id !== action.id),
      };
    }
    default: {
      return state;
    }
  }
};
