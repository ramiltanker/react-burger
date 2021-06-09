import React from "react";
import PropTypes from "prop-types";

// Компоненты
import AppHeader from "../AppHeader/AppHeader.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.js";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
// Компоненты

// Стили
import mainStyles from "./Main.module.css";
// Стили

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

function Main(props) {
  return (
    <>
      <AppHeader useHover={props.useHover} />
      <main className={mainStyles.main}>
        <BurgerIngredients cardsInfo={props.cardsInfo} handleOpenIngridientsModal={props.handleOpenIngridientsModal} />
        <BurgerConstructor cardsInfo={props.cardsInfo}  handleOpenOrderModal={props.handleOpenOrderModal} />
      </main>
    </>
  );
}

export default Main;

Main.propTypes = {
  useHover: PropTypes.func.isRequired,
  cardsInfo: cardsInfoPropTypes.isRequired,
  handleOpenIngridientsModal: PropTypes.func.isRequired,
  handleOpenOrderModal: PropTypes.func.isRequired,
};