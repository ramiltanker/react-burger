const getUserData = (token) => {
  return fetch(`https://norma.nomoreparties.space/api/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 403) {
        return Promise.reject({ message: "jwt expired" });
      }
      return res.json();
    })
    .then((res) => {
      return res;
    })
};

export default getUserData;
