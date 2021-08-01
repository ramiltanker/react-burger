import React from "react";

// Стили
import orderCardStyles from "./OrderCard.module.css";
// Стили

import { useLocation } from "react-router";

// UI
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
// UI

function OrderCard(props) {
  const date = new Date();
  const todayDay = date.getDate();

  const location = useLocation();

  const handleOpenModal = () => {
    props.handleOpenOrderModal();
  };
  return (
    <Link
      className={orderCardStyles.link}
      onClick={handleOpenModal}
      to={{
        pathname: `/profile/orders/${props.order._id}`,
        state: { background: location },
      }}
    >
      <div
        className={orderCardStyles.card}
        onClick={props.handleOpenOrderModal}
      >
        <div className={orderCardStyles.box}>
          <p
            className={`${orderCardStyles.code} text text_type_digits-default`}
          >
            #{props.order.number}
          </p>
          <p
            className={`${orderCardStyles.time} text text_type_main-default text_color_inactive`}
          >
            {todayDay === props.day
              ? `Сегодня, `
              : todayDay - props.day === 1
              ? `${todayDay - props.day} день назад, `
              : `${todayDay - props.day} дня назад, `}
            {props.time} i-GMT+3
          </p>
        </div>
        <p className={`${orderCardStyles.name} text text_type_main-medium`}>
          {props.order.name}
        </p>
        <p className={`${orderCardStyles.status} text text_type_main-small`}>
          {props.order.status === "done" ? "Создан" : "Готовится"}
        </p>
        <div className={orderCardStyles.burger_info}>
          <ul className={orderCardStyles.images_list}>
            {props.imagesArr.map((src, index) => {
              let leftMove;

              if (index) {
                leftMove = -10 * index;
              }

              return (
                <li
                  className={orderCardStyles.image_li}
                  style={{ left: leftMove }}
                  key={index}
                >
                  <img src={src} alt="test" className={orderCardStyles.image} />
                </li>
              );
            })}
          </ul>
          <div className={orderCardStyles.price_box}>
            <p className={orderCardStyles.price}>{props.totalPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
