import { stat } from "fs";
import {
  GET_BURGER_INGRIDIENTS_REQUEST,
  GET_BURGER_INGRIDIENTS_SUCCESS,
  GET_BURGER_INGRIDIENTS_FAILED,
  GET_BURGER_CONSTRUCTOR_REQUEST,
  GET_BURGER_CONSTRUCTOR_SUCCESS,
  GET_BURGER_CONSTRUCTOR_FAILED,
  GET_BURGER_CONSTRUCTOR_ADD_ITEM,
  GET_BURGER_CONSTRUCTOR_DELETE_ITEM,
  MOVE_CONSTRUCTOR_ITEM,
  INCREASE_ITEM,
  POST_SEND_ORDER_REQUEST,
  POST_SEND_ORDER_SUCCESS,
  POST_SEND_ORDER_FAILED,
  COST_TOTAL_PRICE,
  DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER
} from "../actions/burgerIngridients.js";

const initialState = {
  burgerIngridientsArr: [],
  burgerIngridientsRequest: false,
  burgerIngridientsFailed: false,

  burgerConstructorIngridients: [],
  bun: {},
  burgerConstructorIngridientsFailed: false,
  burgerConstructorIngridientsRequest: false,

  currentIngridient: {},

  order: {},
  orderRequest: false,
  orderFailed: false,

  totalPrice: 0,
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
      if (action.ingType === "bun") {
        return {
          ...state,
          bun: action.item,
        };
      } else {
        return {
          ...state,
          burgerConstructorIngridients: [
            ...state.burgerConstructorIngridients,
            ...state.burgerIngridientsArr.filter((item) => {
              return item._id === action.id;
            }),
          ],
        };
      }
    }
    case INCREASE_ITEM: {
      if (action.ingType === "bun") {
        let count = 0;
        return {
          ...state,
          burgerIngridientsArr: [...state.burgerIngridientsArr].map((item) => {
            item.__v = 0;
            if (item._id === action.id) {
              count = count + 1;
              return { ...item, __v: count };
            } else {
              return item;
            }
          }),
        };
      }
      return {
        ...state,
        burgerIngridientsArr: [...state.burgerIngridientsArr].map((item) => {
          if (item._id === action.id) {
            return { ...item, __v: ++item.__v };
          } else {
            return item;
          }
        }),
      };
    }
    case GET_BURGER_CONSTRUCTOR_DELETE_ITEM: {
      if (action.ingType === "bun") {
        return {
          ...state,
          bun: state.bun._id === action.id ? "" : state.bun,
        };
      }
      return {
        ...state,
        burgerConstructorIngridients: [
          ...state.burgerConstructorIngridients,
        ].filter((item, index) => {
          return index !== action.ingIndex;
        }),
      };
    }

    case MOVE_CONSTRUCTOR_ITEM: {
      const arr = [...state.burgerConstructorIngridients];

      const dragItem = arr[action.dragIndex];
      const replacedItem = arr[action.replacedIndex];

      arr[action.replacedIndex] = dragItem;
      arr[action.dragIndex] = replacedItem;

      return {
        ...state,
        burgerConstructorIngridients: arr,
      };
    }
    case POST_SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    }
    case POST_SEND_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case COST_TOTAL_PRICE: {
      const bunPrice = !(Object.keys(state.bun).length === 0) ? state.bun.price * 2 : 0;
      const totalPrice = state.burgerConstructorIngridients.reduce((prev, cur) => {
        return cur.price + prev;
      }, 0);

      return {
        ...state,
        totalPrice: totalPrice + bunPrice,
      };
    }
    case DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER: {
      return {
        ...state,
        totalPrice: 0,
        burgerConstructorIngridients: [],
        bun: {}
      }
    }
    default: {
      return state;
    }
  }
};
