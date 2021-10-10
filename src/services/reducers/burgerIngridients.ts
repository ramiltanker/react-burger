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
  POST_SEND_ORDER_REQUEST,
  POST_SEND_ORDER_SUCCESS,
  POST_SEND_ORDER_FAILED,
  COST_TOTAL_PRICE,
  DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER,
} from "../actions/burgerIngridients";

// Types
import {
  TBurgerIngridients,
  TBurgerConstructorIngridients,
  TBurgerIngridientsOrder,
} from "../../types/burgerIngridients";
// Types

// Union тип
import { TburgerIngridientsActions } from "../actions/burgerIngridients";
// Union тип

type TBurgerIngridientsState = {
  burgerIngridientsArr: TBurgerIngridients;
  burgerIngridientsRequest: Boolean;
  burgerIngridientsFailed: Boolean;

  burgerConstructorIngridients: TBurgerConstructorIngridients;
  bun: any;
  burgerConstructorIngridientsFailed: Boolean;
  burgerConstructorIngridientsRequest: Boolean;

  order?: TBurgerIngridientsOrder;
  orderRequest: boolean;
  orderFailed: boolean;

  totalPrice: number;
};

export const initialState: TBurgerIngridientsState = {
  burgerIngridientsArr: [],
  burgerIngridientsRequest: false,
  burgerIngridientsFailed: false,

  burgerConstructorIngridients: [],
  bun: {},
  burgerConstructorIngridientsFailed: false,
  burgerConstructorIngridientsRequest: false,

  order: undefined,
  orderRequest: false,
  orderFailed: false,

  totalPrice: 0,
};

export const burgerIngridientsReducer = (
  state = initialState,
  action: TburgerIngridientsActions
) => {
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
      const bunPrice = !(Object.keys(state.bun).length === 0)
        ? state.bun.price * 2
        : 0;

      const totalPrice = state.burgerConstructorIngridients.reduce(
        (prev: any, cur: any) => {
          return cur.price + prev;
        },
        0
      );

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
        bun: {},
      };
    }
    default: {
      return state;
    }
  }
};
