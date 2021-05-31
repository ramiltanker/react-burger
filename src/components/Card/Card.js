import React from "react";

// Стили
import cardStyles from "./Card.module.css";
// Стили

// Библиотека UI-компонентов
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI-компонентов

function Card(props) {

  function handleOpenIngridientsModal() {
    props.handleOpenIngridientsModal(props.card);
  }

  return (
    <div className={cardStyles.card} onClick={handleOpenIngridientsModal} >
      <Counter />
      <img
        className={cardStyles.image}
        src={props.card.image}
        alt={props.card.name}
      />
      <div className={cardStyles.price_box}>
        <p className={cardStyles.price}>{props.card.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={cardStyles.name}>{props.card.name}</p>
    </div>
  );
}

export default Card;
