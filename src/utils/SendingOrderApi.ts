import { TBurgerIngridientsArrayOfId } from "../types/burgerIngridients";
import { API_URL } from "./constants";

const postSendingOrderApi = (
  ingredients: TBurgerIngridientsArrayOfId,
  token?: string
) => {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ingredients,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      return res;
    });
};

export default postSendingOrderApi;
