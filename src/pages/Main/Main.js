import React from "react";
import PropTypes from "prop-types";

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader.js";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients.js";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor.js";
// Компоненты

// DND
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
// DND

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
      <AppHeader />
      <main className={mainStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            handleOpenIngridientsModal={props.handleOpenIngridientsModal}
          />
          <BurgerConstructor
            handleOpenOrderDetailsModal={props.handleOpenOrderDetailsModal}
            isSauce={props.isSauce}
            isMain={props.isMain}
          />
        </DndProvider>
      </main>
    </>
  );
}

export default Main;

Main.propTypes = {
  isSauce: PropTypes.bool,
  isMain:PropTypes.bool,
  handleOpenIngridientsModal: PropTypes.func.isRequired,
};
