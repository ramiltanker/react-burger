import React from "react";

// Стили
import feedCardStyles from "./FeedCard.module.css";
// Стили

// UI
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// UI

import testImage from "../../images/img.png";

function FeedCard() {
  const imageTestArr = [
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
  ];

  return (
    <div className={feedCardStyles.card}>
      <div className={feedCardStyles.box}>
        <p className={`${feedCardStyles.code} text text_type_digits-default`}>
          #034535
        </p>
        <p
          className={`${feedCardStyles.time} text text_type_main-default text_color_inactive`}
        >
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <p className={`${feedCardStyles.name} text text_type_main-medium`}>Death Star Starship Main бургер</p>
      <div className={feedCardStyles.burger_info}>
        <ul className={feedCardStyles.images_list}>
          {imageTestArr.map((src, index) => {
            let leftMove;

            if (index) {
              leftMove = -25 * index;
            }

            return (
              <li
                className={feedCardStyles.image_li}
                style={{ left: leftMove }}
                key={index}
              >
                <img src={src} alt="test" className={feedCardStyles.image} />
              </li>
            );
          })}
        </ul>
        <div className={feedCardStyles.price_box}>
          <p
            className={`${feedCardStyles.price} text text_type_digits-default`}
          >
            480
          </p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
