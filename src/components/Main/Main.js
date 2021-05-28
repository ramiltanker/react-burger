import React from "react";

// Компоненты
import AppHeader from "../AppHeader/AppHeader.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.js";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
// Компоненты

// Стили
import mainStyles from "./Main.module.css";
// Стили



function Main(props) {
  return (
    <>
      <AppHeader useHover={props.useHover} />
      <main className={mainStyles.main}>
        <BurgerIngredients cardsInfo={props.cardsInfo} />
        <BurgerConstructor cardsInfo={props.cardsInfo} />
      </main>
    </>
  );
}

export default Main;
