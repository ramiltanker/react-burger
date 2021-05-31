import React from "react";
import PropTypes from "prop-types";
// Компоненты
import Modal from "../Modal/Modal.js";
// Компоненты

// Стили
import orderDetailsStyles from "./OrderDetails.module.css";
// Стили

// Картинки
import done from "../../images/done.png";
// Картинки

function OrderDetails(props) {
  return (
    <Modal
      title=""
      handleCloseModal={props.handleCloseModal}
      isOpen={props.isOpen}
      children={
        <div className={orderDetailsStyles.order}>
          <h2 className={`${orderDetailsStyles.number} mt-10 mb-8`}>034536</h2>
          <p className={`${orderDetailsStyles.id} mb-15`}>
            идентификатор заказа
          </p>
          <img src={done} alt="Готово" />
          <div className={`${orderDetailsStyles.notification} mt-15 mb-30`}>
            <p className={orderDetailsStyles.message}>
              Ваш заказ начали готовить
            </p>
            <p className={orderDetailsStyles.message_wait}>
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </div>
      }
    />
  );
}

export default OrderDetails;

OrderDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
