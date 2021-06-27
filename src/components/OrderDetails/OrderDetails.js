import React from "react";

// Стили
import orderDetailsStyles from "./OrderDetails.module.css";
// Стили

// Картинки
import done from "../../images/done.png";
// Картинки

// Redux
import { useDispatch, useSelector } from "react-redux";
// Redux

function OrderDetails(props) {

  const order = useSelector(store => store.burgerIngridients.order);

  console.log(order);
  return (
    <div className={orderDetailsStyles.order}>
      <h2 className={`${orderDetailsStyles.number} mt-10 mb-8`}>{order.success && order.order.number}</h2>
      <p className={`${orderDetailsStyles.id} mb-15`}>идентификатор заказа</p>
      <img src={done} alt="Готово" />
      <div className={`${orderDetailsStyles.notification} mt-15 mb-30`}>
        <p className={orderDetailsStyles.message}>Ваш заказ начали готовить</p>
        <p className={orderDetailsStyles.message_wait}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
