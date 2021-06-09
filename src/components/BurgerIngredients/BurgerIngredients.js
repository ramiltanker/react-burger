import React from "react";

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


// Компоненты
import Card from "../Card/Card.js";
// Компоненты

// Context
import { IngridientsCostContext } from "../../services/ingridientsContext.js";
// Context

const cardsInfoPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    _id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.any,
    image_mobile: PropTypes.any,
    image_large: PropTypes.any,
    __v: PropTypes.number.isRequired,
  })
);

function BurgerIngredients(props) {
  const {ingridients, setIngridients} = React.useContext(IngridientsCostContext);
  
  const [current, setCurrent] = React.useState("bread-rolls");

  const buns = ingridients.filter((item) => item.type === "bun");
  const main = ingridients.filter((item) => item.type === "main");
  const sauces = ingridients.filter((item) => item.type === "sauce");

  return (
    <section className={burgerIngredientsStyles.burger_ingridients}>
      <h2 className={`${burgerIngredientsStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
      <div className={burgerIngredientsStyles.tabs}>
        <Tab
          value="bread-rolls"
          active={current === "bread-rolls"}
          onClick={setCurrent}
        >
          Булки
        </Tab>
        <Tab value="souces" active={current === "souces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={current === "filling"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.parts_shell} mt-10 pr-2`}>
        <div className={burgerIngredientsStyles.parts_container}>
          <h2 className={` ${burgerIngredientsStyles.parts_title_no_margin} mb-6 mt-10`}>Булки</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {buns.map((item) => (
              <Card card={item} key={item._id} handleOpenIngridientsModal={props.handleOpenIngridientsModal} />
            ))}
          </div>
        </div>
        <div className={burgerIngredientsStyles.parts_container}>
          <h2 className={burgerIngredientsStyles.parts_title}>Соусы</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {sauces.map((item) => (
              <Card card={item} key={item._id} handleOpenIngridientsModal={props.handleOpenIngridientsModal} />
            ))}
          </div>
        </div>
        <div className={burgerIngredientsStyles.parts_container}>
          <h2 className={burgerIngredientsStyles.parts_title}>Начинки</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {main.map((item) => (
              <Card card={item} key={item._id} handleOpenIngridientsModal={props.handleOpenIngridientsModal} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  handleOpenIngridientsModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
