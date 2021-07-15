const tokenCheck = (refreshToken) => {
    return fetch(`https://norma.nomoreparties.space/api/auth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        return res;
      })
  }

  export default tokenCheck;