import React from "react";

// Стили
import orderDetailsStyles from "./OrderDetails.module.css";
// Стили

// Картинки
import done from "../../images/done.png";
// Картинки

// Types
import { useSelector } from "../../types/typedHooks";
// Types

function OrderDetails() {
  const { order, orderRequest } = useSelector(
    (store) => store.burgerIngridients
  );

  return (
    <div className={orderDetailsStyles.order}>
      {orderRequest ? (
        <h2 className={orderDetailsStyles.loading}>Пожалуйста подождите :)</h2>
      ) : (
        <h2 className={`${orderDetailsStyles.number} mt-10 mb-8`}>
          {order !== undefined ? order!.success && order!.order.number : ""}
        </h2>
      )}
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
