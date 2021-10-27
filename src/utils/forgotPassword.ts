import { API_URL } from "./constants";

const forgotPassword = (email: string) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
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

export default forgotPassword;
