import { API_URL } from "./constants";

const tokenCheck = (refreshToken: string | null) => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then((res) => {
      if (res.status === 401) {
        return Promise.reject({ message: "Token is invalid" });
      }
      return res.json();
    })
    .then((res) => {
      return res;
    });
};

export default tokenCheck;
