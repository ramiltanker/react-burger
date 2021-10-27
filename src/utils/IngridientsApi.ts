import { API_URL } from "./constants";

const getInitialIngridients = () => {
  return fetch(`${API_URL}/ingredients`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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

export default getInitialIngridients;
