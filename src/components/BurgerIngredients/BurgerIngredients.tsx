import React, { FunctionComponent } from "react";

import PropTypes from "prop-types";
// Стили
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
// Стили

// Библиотека UI-компонентов
import {
  Tab,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
// Библиотека UI-компонентов

// DND
import { useDrag } from "react-dnd";
// DND

// Компоненты
import Card from "../Card/Card";
// Компоненты

// Types
import { TIngridient } from "../../types/burgerIngridients";

import { useDispatch, useSelector } from "../../types/typedHooks";
// Types

import { useInView } from "react-intersection-observer";

interface IBurgerIngridientsProps {
  handleOpenIngridientsModal: (item: TIngridient) => void;
}

type FC<P = IBurgerIngridientsProps> = FunctionComponent<P>;

const BurgerIngredients: FC<IBurgerIngridientsProps> = (props) => {
  // Массив ингридиентов
  const { burgerIngridientsArr } = useSelector(
    (state) => state.burgerIngridients
  );
  // Массив ингридиентов

  // Функция для проброса экшенов
  const dispatch = useDispatch();
  // Функция для проброса экшенов

  // Состояние Tab
  const [current, setCurrent] = React.useState<string>("buns");
  // Состояние Tab

  const buns = burgerIngridientsArr.filter((item) => item.type === "bun");
  const main = burgerIngridientsArr.filter((item) => item.type === "main");
  const sauces = burgerIngridientsArr.filter((item) => item.type === "sauce");

  const [bunsContainerRef, inViewBuns, entryBuns] = useInView({ threshold: 0 });

  const [saucesContainerRef, inViewSauces, entrySauces] = useInView({
    threshold: 0,
  });

  const [fillingContainerRef, inViewFilling, entryFilling] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inViewBuns) {
      setCurrent("buns");
    } else if (inViewSauces) {
      setCurrent("sauces");
    } else if (inViewFilling) {
      setCurrent("main");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  return (
    <section
      className={burgerIngredientsStyles.burger_ingridients}
      data-testid="burger-ingridients"
    >
      <h2 className={`${burgerIngredientsStyles.title} mt-10 mb-5`}>
        Соберите бургер
      </h2>
      <div className={burgerIngredientsStyles.tabs}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.parts_shell} mt-10 pr-2`}>
        <div
          className={burgerIngredientsStyles.parts_container}
          ref={bunsContainerRef}
          id="buns"
        >
          <h2
            className={` ${burgerIngredientsStyles.parts_title_no_margin} mb-6 mt-10`}
          >
            Булки
          </h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {buns.map((item) => (
              <Card
                card={item}
                key={item._id}
                handleOpenIngridientsModal={props.handleOpenIngridientsModal}
              />
            ))}
          </div>
        </div>
        <div
          className={burgerIngredientsStyles.parts_container}
          ref={saucesContainerRef}
          id="sauces"
        >
          <h2 className={burgerIngredientsStyles.parts_title}>Соусы</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {sauces.map((item) => (
              <Card
                card={item}
                key={item._id}
                handleOpenIngridientsModal={props.handleOpenIngridientsModal}
              />
            ))}
          </div>
        </div>
        <div
          className={burgerIngredientsStyles.parts_container}
          ref={fillingContainerRef}
          id="main"
        >
          <h2 className={burgerIngredientsStyles.parts_title}>Начинки</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {main.map((item) => (
              <Card
                card={item}
                key={item._id}
                handleOpenIngridientsModal={props.handleOpenIngridientsModal}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  handleOpenIngridientsModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
