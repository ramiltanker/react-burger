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
// Компоненты

function App() {
  const [ingridients, setIngridients] = React.useState([]);

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
    ingridientsApi
      .getInitialIngridients()
      .then((res) => {
        setIngridients(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  return (
    <>
      <Main
        cardsInfo={ingridients}
        useHover={useHover}
        handleOpenIngridientsModal={handleOpenIngridientsModal}
        handleOpenOrderModal={handleOpenOrderModal}
      />

      <IngredientDetails
        isOpen={isIngridientModalOpen}
        ingridientInfo={ingridientInfo}
        handleCloseModal={handleCloseModal}
      />
      <OrderDetails isOpen={isOrderModalOpen} handleCloseModal={handleCloseModal} />
    </>
  );
}

export default App;
