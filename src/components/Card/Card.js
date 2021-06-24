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

// Redux
import { useSelector } from "react-redux";
// Redux

// DND
import { useDrag } from "react-dnd";
// DND

function Card(props) {
  const { burgerConstructorIngridients, bun } = useSelector(
    (store) => store.burgerIngridients
  );

  const counters = React.useMemo(() => {
    const counter = {};
    burgerConstructorIngridients.forEach((ingredient) => {
      if (!counter[ingredient._id]) counter[ingredient._id] = 0;
      counter[ingredient._id]++;
    });
    if (bun) counter[bun._id] = 2;
    return counter;
  }, [burgerConstructorIngridients, bun]);

  function handleOpenIngridientsModal() {
    props.handleOpenIngridientsModal(props.card);
  }

  // DND
  const [{ opacity }, ref] = useDrag({
    type: "ingridients",
    item: { id: props.card._id, type: props.card.type, ing: props.card },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  // DND

  return (
    <div
      className={cardStyles.card}
      onClick={handleOpenIngridientsModal}
      ref={ref}
      style={{ opacity: opacity }}
    >
      <Counter count={counters[props.card._id]} />
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
