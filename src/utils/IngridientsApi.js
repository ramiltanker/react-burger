export class IngridientsApi {
  constructor({ address }) {
    this._address = address;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialIngridients() {
    return fetch(`${this._address}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }
}

const api = new IngridientsApi({
  address: "https://norma.nomoreparties.space/api/ingredients",
});

export default api;
