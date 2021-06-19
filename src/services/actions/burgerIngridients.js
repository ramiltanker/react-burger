import ingridientsApi from "../../utils/IngridientsApi";

export const GET_BURGER_INGRIDIENTS_REQUEST = "GET_BURGER_INGRIDIENTS_REQUEST";
export const GET_BURGER_INGRIDIENTS_SUCCESS = "GET_BURGER_INGRIDIENTS_SUCCESS";
export const GET_BURGER_INGRIDIENTS_FAILED = "GET_BURGER_INGRIDIENTS_FAILED";

export const GET_BURGER_CONSTRUCTOR_REQUEST = "GET_BURGER_CONSTRUCTOR_REQUEST";
export const GET_BURGER_CONSTRUCTOR_SUCCESS = "GET_BURGER_CONSTRUCTOR_SUCCESS";
export const GET_BURGER_CONSTRUCTOR_FAILED = "GET_BURGER_CONSTRUCTOR_FAILED";
export const GET_BURGER_CONSTRUCTOR_ADD_ITEM = "GET_BURGER_CONSTRUCTOR_ADD_ITEM";
export const GET_BURGER_CONSTRUCTOR_DELETE_ITEM = "GET_BURGER_CONSTRUCTOR_DELETE_ITEM";

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
