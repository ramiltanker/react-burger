import React, { FunctionComponent } from "react";

// Стили
import cardStyles from "./Card.module.css";
// Стили

import { Link, useLocation } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
// redux

// Библиотека UI-компонентов
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI-компонентов

// DND
import { useDrag } from "react-dnd";
// DND

// Types
import { TIngridient } from "../../types/burgerIngridients";

import { TCounter } from "../../types";

import { useSelector } from "../../types/typedHooks";
// Types

interface ICardProps {
  card: TIngridient;
  key: string;
  handleOpenIngridientsModal: (item: TIngridient) => void;
}

type FC<P = ICardProps> = FunctionComponent<P>;

const Card: FC<ICardProps> = (props) => {
  const location = useLocation();

  const { burgerConstructorIngridients, bun } = useSelector(
    (store) => store.burgerIngridients
  );

  const counters = React.useMemo(() => {
    const counter: TCounter = {};

    burgerConstructorIngridients.forEach((ingredient: TIngridient) => {
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
    item: { _id: props.card._id, type: props.card.type, ing: props.card },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  // DND

  return (
    <Link
      className={cardStyles.card}
      onClick={handleOpenIngridientsModal}
      ref={ref}
      style={{ opacity: opacity }}
      to={{
        pathname: `/ingridients/${props.card._id}`,
        state: { background: location },
      }}
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
    </Link>
  );
};

export default Card;
