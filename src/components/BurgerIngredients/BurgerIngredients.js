import React from "react";

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

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bread-rolls");

  const buns = props.cardsInfo.filter((item) => item.type === "bun");
  const main = props.cardsInfo.filter((item) => item.type === "main");
  const sauces = props.cardsInfo.filter((item) => item.type === "sauce");

  return (
    <section className={burgerIngredientsStyles.burger_ingridients}>
      <h2 className={burgerIngredientsStyles.title}>Соберите бургер</h2>
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
      <div className={burgerIngredientsStyles.parts_shell}>
        <div className={burgerIngredientsStyles.parts_container}>
          <h2 className={`${burgerIngredientsStyles.parts_title} ${burgerIngredientsStyles.parts_title_no_margin}`}>Булки</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {buns.map((item, index) => (
              <Card card={item} key={index} />
            ))}
          </div>
        </div>
        <div className={burgerIngredientsStyles.parts_container}>
          <h2 className={burgerIngredientsStyles.parts_title}>Соусы</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {sauces.map((item, index) => (
              <Card card={item} key={index} />
            ))}
          </div>
        </div>
        <div className={burgerIngredientsStyles.parts_container}>
          <h2 className={burgerIngredientsStyles.parts_title}>Начинки</h2>
          <div className={burgerIngredientsStyles.parts_box}>
            {main.map((item, index) => (
              <Card card={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
