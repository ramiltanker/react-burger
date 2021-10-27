import { API_URL } from "./constants";

const register = (name: string, email: string, password: string) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      if (res.status === 400) {
        return Promise.reject({
          message: "Пользователь с таким email уже существует",
        });
      }
      if (res.status === 500) {
        return Promise.reject({
          message: "При регистрации пользователя произошла ошибка",
        });
      }
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      return res;
    });
};

export default register;
