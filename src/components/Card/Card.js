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

class Card extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cardStyles.card}>
        <Counter />
        <img
          className={cardStyles.image}
          src={this.props.card.image}
          alt={this.props.card.name}
        />
        <div className={cardStyles.price_box}>
          <p className={cardStyles.price}>{this.props.card.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={cardStyles.name}>{this.props.card.name}</p>
      </div>
    );
  }
}

export default Card;
