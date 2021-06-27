import React from "react";
import {
  Route,
  Switch,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";

import "./App.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Redux

// Компоненты
import Main from "../Main/Main.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";
import OrderDetails from "../OrderDetails/OrderDetails.js";
import Modal from "../Modal/Modal.js";
import { Z_BUF_ERROR } from "zlib";
// Компоненты

function App() {
  const dispatch = useDispatch();

  const { burgerConstructorIngridients, bun } = useSelector(
    (state) => state.burgerIngridients
  );

  const [isSauce, setIsSauce] = React.useState(false);
  const [isMain, setIsMain] = React.useState(false);

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

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
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

  const IngredientDetailsModal = (
    <IngredientDetails ingridientInfo={ingridientInfo} />
  );

  const OrderDetailsModal = <OrderDetails />;

  return (
    <>
      <Main
        useHover={useHover}
        handleOpenIngridientsModal={handleOpenIngridientsModal}
        handleOpenOrderModal={handleOpenOrderModal}
        isSauce={isSauce}
        isMain={isMain}
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
    </>
  );
}

export default App;
