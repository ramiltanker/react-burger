const getOrders = () => {
  return fetch(`https://norma.nomoreparties.space/orders/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({ message: `Ошибка ${res.status}` });
      }
      return res.json();
    })
    .then((res) => {
      return res;
    });
};

export default getOrders;
