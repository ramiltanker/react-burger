import getInitialIngridients from "../../utils/IngridientsApi";
import postSendingOrderApi from "../../utils/SendingOrderApi";

// Types
import {
  TBurgerIngridientsArrayOfId,
  TBurgerIngridients,
  TBurgerIngridientsOrder,
  TIngridient,
} from "../../types/burgerIngridients";
import { AppThunk } from "../../types/index";
// Types

export const GET_BURGER_INGRIDIENTS_REQUEST: "GET_BURGER_INGRIDIENTS_REQUEST" =
  "GET_BURGER_INGRIDIENTS_REQUEST";
export const GET_BURGER_INGRIDIENTS_SUCCESS: "GET_BURGER_INGRIDIENTS_SUCCESS" =
  "GET_BURGER_INGRIDIENTS_SUCCESS";
export const GET_BURGER_INGRIDIENTS_FAILED: "GET_BURGER_INGRIDIENTS_FAILED" =
  "GET_BURGER_INGRIDIENTS_FAILED";

export const GET_BURGER_CONSTRUCTOR_REQUEST: "GET_BURGER_CONSTRUCTOR_REQUEST" =
  "GET_BURGER_CONSTRUCTOR_REQUEST";
export const GET_BURGER_CONSTRUCTOR_SUCCESS: "GET_BURGER_CONSTRUCTOR_SUCCESS" =
  "GET_BURGER_CONSTRUCTOR_SUCCESS";
export const GET_BURGER_CONSTRUCTOR_FAILED: "GET_BURGER_CONSTRUCTOR_FAILED" =
  "GET_BURGER_CONSTRUCTOR_FAILED";

export const GET_BURGER_CONSTRUCTOR_ADD_ITEM: "GET_BURGER_CONSTRUCTOR_ADD_ITEM" =
  "GET_BURGER_CONSTRUCTOR_ADD_ITEM";
export const GET_BURGER_CONSTRUCTOR_DELETE_ITEM: "GET_BURGER_CONSTRUCTOR_DELETE_ITEM" =
  "GET_BURGER_CONSTRUCTOR_DELETE_ITEM";

export const INCREASE_ITEM: "INCREASE_ITEM" = "INCREASE_ITEM";

export const MOVE_CONSTRUCTOR_ITEM: "MOVE_CONSTRUCTOR_ITEM" =
  "MOVE_CONSTRUCTOR_ITEM";

export const POST_SEND_ORDER_REQUEST: "POST_SEND_ORDER_REQUEST" =
  "POST_SEND_ORDER_REQUEST";
export const POST_SEND_ORDER_SUCCESS: "POST_SEND_ORDER_SUCCESS" =
  "POST_SEND_ORDER_SUCCESS";
export const POST_SEND_ORDER_FAILED: "POST_SEND_ORDER_FAILED" =
  "POST_SEND_ORDER_FAILED";

export const COST_TOTAL_PRICE: "COST_TOTAL_PRICE" = "COST_TOTAL_PRICE";

export const DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER: "DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER" =
  "DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER";

export interface IGetBurgerIngridientsRequestAction {
  readonly type: typeof GET_BURGER_INGRIDIENTS_REQUEST;
}

export interface IGetBurgerIngridientsSuccessAction {
  readonly type: typeof GET_BURGER_INGRIDIENTS_SUCCESS;
  readonly burgerIngridientsArr: TBurgerIngridients;
}

export interface IGetBurgerIngridientsFailedAction {
  readonly type: typeof GET_BURGER_INGRIDIENTS_FAILED;
}

export interface IGetBurgerConstructorRequestAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_REQUEST;
}

export interface IGetBurgerConstructorSuccessAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_SUCCESS;
  burgerConstructorIngridients: Array<TIngridient>;
}

export interface IGetBurgerConstructorFailedAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_FAILED;
}

export interface IGetBurgerConstructorAddItemAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_ADD_ITEM;
  readonly ingType: string;

  readonly item: TIngridient;
  readonly id: string;
}

export interface IGetBurgerConstructorDeleteItemAction {
  readonly type: typeof GET_BURGER_CONSTRUCTOR_DELETE_ITEM;
  readonly ingType: string;
  readonly id: string;
  readonly ingIndex: number;
}

export interface IIncreaseItemAction {
  readonly type: typeof INCREASE_ITEM;
}

export interface IMoveConstructorItemAction {
  readonly type: typeof MOVE_CONSTRUCTOR_ITEM;
  readonly dragIndex: number;
  readonly replacedIndex: number;
}

export interface IPostSendOrderRequestAction {
  readonly type: typeof POST_SEND_ORDER_REQUEST;
}

export interface IPostSendOrderSuccessAction {
  readonly type: typeof POST_SEND_ORDER_SUCCESS;
  readonly order: TBurgerIngridientsOrder;
}

export interface IPostSendOrderFailedAction {
  readonly type: typeof POST_SEND_ORDER_FAILED;
}

export interface ICostTotalPriceAction {
  readonly type: typeof COST_TOTAL_PRICE;
}

export interface IDeleteBurgerConstructorAfterOrderAction {
  readonly type: typeof DELETE_BURGER_CONSTRUCTOR_AFTER_ORDER;
}

// Union тип
export type TburgerIngridientsActions =
  | IGetBurgerIngridientsRequestAction
  | IGetBurgerIngridientsSuccessAction
  | IGetBurgerIngridientsFailedAction
  | IGetBurgerConstructorRequestAction
  | IGetBurgerConstructorSuccessAction
  | IGetBurgerConstructorFailedAction
  | IGetBurgerConstructorAddItemAction
  | IGetBurgerConstructorDeleteItemAction
  | IIncreaseItemAction
  | IMoveConstructorItemAction
  | IPostSendOrderRequestAction
  | IPostSendOrderSuccessAction
  | IPostSendOrderFailedAction
  | ICostTotalPriceAction
  | IDeleteBurgerConstructorAfterOrderAction;
// Union тип

export const getIngridients: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGRIDIENTS_REQUEST,
    });
    getInitialIngridients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_BURGER_INGRIDIENTS_SUCCESS,
            burgerIngridientsArr: res.data,
          });
        } else {
          dispatch({
            type: GET_BURGER_INGRIDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log({ error: err });
        }
      });
  };
};

export const sendOrder: AppThunk = (
  burgerConstructorIngridients: TBurgerIngridientsArrayOfId,
  token: string | undefined
) => {
  return function (dispatch) {
    dispatch({
      type: POST_SEND_ORDER_REQUEST,
    });
    postSendingOrderApi(burgerConstructorIngridients, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_SEND_ORDER_SUCCESS,
            order: res,
          });
        } else {
          dispatch({
            type: GET_BURGER_INGRIDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: POST_SEND_ORDER_FAILED });
        if (err.status === 400) {
          console.log({ error: err });
        }
      });
  };
};
