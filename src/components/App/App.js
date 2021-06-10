import React from "react";
import {
  Route,
  Switch,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";

import "./App.css";

// Api
import ingridientsApi from "../../utils/IngridientsApi.js";
// Api

// Компоненты
import Main from "../Main/Main.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";
import OrderDetails from "../OrderDetails/OrderDetails.js";
import Modal from "../Modal/Modal.js";
// Компоненты

// Context
import { IngridientsCostContext } from "../../services/ingridientsContext.js";
// Context

function App() {
  const [ingridients, setIngridients] = React.useState([]);
  const [renderIngridients, setRenderIngridients] = React.useState({});

  // Переменные состояния для Ingridients modal
  const [isIngridientModalOpen, setIsIngridientModalOpen] =
    React.useState(false);
  const [ingridientInfo, setIngridientInfo] = React.useState({});
  // Переменные состояния для Ingridients modal

  // Переменные состояния для Order modal
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);
  const [orderData, setOrderData] = React.useState();
  // Переменные состояния для Order modal
  React.useEffect(() => {
    const handleEscClose = (e) => {
      if (e.keyCode === 27) {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    ingridientsApi
      .getInitialIngridients()
      .then((res) => {
        setIngridients(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  React.useEffect(() => {
    const generateIngridients = () => {
      const generatedObject = ingridients.reduce(
        (previousValue, currentItem, index, arr) => {
          const buns = arr.filter((ingridient) => ingridient.type === "bun");
          const main = arr.filter((ingridient) => ingridient.type === "main");
          const sauce = arr.filter((ingridient) => ingridient.type === "sauce");
          return {
            buns: buns,
            main: main,
            sauce: sauce,
          };
        },
        0
      );
      setRenderIngridients(generatedObject);
    };
    generateIngridients();
  }, [ingridients]);

  function useHover() {
    const [isHovered, setIsHovered] = React.useState(false);
    const on = () => setIsHovered(true);
    const off = () => setIsHovered(false);
    return { isHovered, on, off };
  }

  // Indgridients Modal
  function handleOpenIngridientsModal(item) {
    setIsIngridientModalOpen(true);
    setIngridientInfo(item);
  }
  // Indgridients Modal

  function handleCloseModal() {
    setIsIngridientModalOpen(false);
    setIsOrderModalOpen(false);
  }

  //  Order Modal
  function handleOpenOrderModal() {
    setIsOrderModalOpen(true);
  }
  //  Order Modal

  const IngredientDetailsModal = (
    <IngredientDetails ingridientInfo={ingridientInfo} />
  );

  const OrderDetailsModal = <OrderDetails />;

  return (
    <>
      <IngridientsCostContext.Provider value={{ingridients, setIngridients}}>
        <Main
          useHover={useHover}
          handleOpenIngridientsModal={handleOpenIngridientsModal}
          handleOpenOrderModal={handleOpenOrderModal}
          renderIngridients={renderIngridients}
        />

        <Modal
          children={IngredientDetailsModal}
          isOpen={isIngridientModalOpen}
          handleCloseModal={handleCloseModal}
        />
        <Modal
          children={OrderDetailsModal}
          isOpen={isOrderModalOpen}
          handleCloseModal={handleCloseModal}
        />
      </IngridientsCostContext.Provider>
    </>
  );
}

export default App;
