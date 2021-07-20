import React from "react";

// Стили
import orderCardStyles from "./OrderCard.module.css";
// Стили

// UI
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// UI

import testImage from "../../images/img.png";

function OrderCard(props) {

  const imageTestArr = [
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
  ];

  return (
    <div className={orderCardStyles.card} onClick={props.handleOpenOrderModal}>
      <div className={orderCardStyles.box}>
        <p className={`${orderCardStyles.code} text text_type_digits-default`}>
          {props.order.code}
        </p>
        <p
          className={`${orderCardStyles.time} text text_type_main-default text_color_inactive`}
        >
         {props.order.time}
        </p>
      </div>
      <p className={`${orderCardStyles.name} text text_type_main-medium`}>
        {props.order.name}
      </p>
      <p className={`${orderCardStyles.status} text text_type_main-small`}>
        {props.order.status}
      </p>
      <div className={orderCardStyles.burger_info}>
        <ul className={orderCardStyles.images_list}>
          {imageTestArr.map((src, index) => {
            let leftMove;

            if (index) {
              leftMove = -25 * index;
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
          <p className={orderCardStyles.price}>{props.order.price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
