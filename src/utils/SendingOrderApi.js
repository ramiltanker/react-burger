export class SendingOrderApi {
    constructor({ address }) {
      this._address = address;
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    postSendingOrderApi(ingridients) {
      return fetch(`${this._address}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingridients
        }),
      }).then((res) => this._getResponseData(res));
    }
  }
  
  const sendOrderApi = new SendingOrderApi({
    address: "https://norma.nomoreparties.space/api/orders",
  });
  
  export default sendOrderApi;
  