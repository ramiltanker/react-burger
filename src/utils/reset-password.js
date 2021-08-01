const resetPassword = (password, token) => {
  return fetch(`https://norma.nomoreparties.space/api/password-reset/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, token: token }),
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

export default resetPassword;
