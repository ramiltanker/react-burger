import React from "react";
import {
  Route,
  Switch,
  Router,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";

import appStyles from "./App.module.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Redux

import {
  handleCheckToken,
  handleGetUserData,
} from "../../services/actions/auth";

// Компоненты
import Main from "../Main/Main.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";
import OrderDetails from "../OrderDetails/OrderDetails.js";
import Modal from "../Modal/Modal.js";
import SignIn from "../SignIn/SignIn.js";
import SignUp from "../SignUp/SignUp";
import RecoverPassword from "../RecoverPassword/RecoverPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import Profile from "../Profile/Profile";
import Orders from "../Orders/Orders";
import Feed from "../Feed/Feed";
import OrderModal from "../OrderModal/OrderModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);
  // Переменные состояния для Order modal

  //  Переменные состояния для OrderModal
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);
  //  Переменные состояния для OrderModal

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


  React.useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) dispatch(handleCheckToken(refreshToken));
  }, [dispatch]);

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
    setIsOrderDetailsOpen(false);
    setIsOrderModalOpen(false);
  }

  //  OrderDetaulsModal
  function handleOpenOrderDetailsModal() {
    setIsOrderDetailsOpen(true);
  }
  //  OrderDetaulsModal

  // OrderModal
  function handleOpenOrderModal() {
    setIsOrderModalOpen(true);
  }
  // OrderModal

  const IngredientDetailsModal = (
    <IngredientDetails ingridientInfo={ingridientInfo} />
  );

  const OrderDetailsModal = <OrderDetails />;

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Main
            handleOpenIngridientsModal={handleOpenIngridientsModal}
            handleOpenOrderDetailsModal={handleOpenOrderDetailsModal}
            isSauce={isSauce}
            isMain={isMain}
          />
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/register" exact>
          <SignUp />
        </Route>
        <Route path="/forgot-password" exact>
          <RecoverPassword />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <Orders handleOpenOrderModal={handleOpenOrderModal} />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderModal />
        </ProtectedRoute>
        <Route path="/feed" exact>
          <Feed />
        </Route>
      </Switch>
      <Modal
        children={IngredientDetailsModal}
        isOpen={isIngridientModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <Modal
        children={OrderDetailsModal}
        isOpen={isOrderDetailsOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default App;
