import { API_URL } from "./constants";

const login = (email: string, password: string) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      return res;
    });
};

export default login;
