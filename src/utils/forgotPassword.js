const forgotPassword = (email) => {
    return fetch(`https://norma.nomoreparties.space/api/password-reset`, {
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
  }

  export default forgotPassword;