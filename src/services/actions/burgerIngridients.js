import ingridientsApi from "../../utils/IngridientsApi";
import sendOrderApi from "../../utils/SendingOrderApi";

export const GET_BURGER_INGRIDIENTS_REQUEST = "GET_BURGER_INGRIDIENTS_REQUEST";
export const GET_BURGER_INGRIDIENTS_SUCCESS = "GET_BURGER_INGRIDIENTS_SUCCESS";
export const GET_BURGER_INGRIDIENTS_FAILED = "GET_BURGER_INGRIDIENTS_FAILED";

export const GET_BURGER_CONSTRUCTOR_REQUEST = "GET_BURGER_CONSTRUCTOR_REQUEST";
export const GET_BURGER_CONSTRUCTOR_SUCCESS = "GET_BURGER_CONSTRUCTOR_SUCCESS";
export const GET_BURGER_CONSTRUCTOR_FAILED = "GET_BURGER_CONSTRUCTOR_FAILED";
export const GET_BURGER_CONSTRUCTOR_ADD_ITEM =
  "GET_BURGER_CONSTRUCTOR_ADD_ITEM";
export const GET_BURGER_CONSTRUCTOR_DELETE_ITEM =
  "GET_BURGER_CONSTRUCTOR_DELETE_ITEM";

export const INCREASE_ITEM = "INCREASE_ITEM";

export const MOVE_CONSTRUCTOR_ITEM = "MOVE_CONSTRUCTOR_ITEM";

export const POST_SEND_ORDER_REQUEST = "POST_SEND_ORDER_REQUEST";
export const POST_SEND_ORDER_SUCCESS = "POST_SEND_ORDER_SUCCESS";
export const POST_SEND_ORDER_FAILED = "POST_SEND_ORDER_FAILED";

export function getIngridients() {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGRIDIENTS_REQUEST,
    });
    ingridientsApi.getInitialIngridients().then((res) => {
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
    });
  };
}

export function sendOrder(burgerConstructorIngridients) {
  console.log(burgerConstructorIngridients);
  return function (dispatch) {
    dispatch({
      type: POST_SEND_ORDER_REQUEST,
    });
    sendOrderApi
      .postSendingOrderApi(burgerConstructorIngridients)
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
        if (err.status === 400) {
          console.log({error: err});
        }
      })
  };
}
