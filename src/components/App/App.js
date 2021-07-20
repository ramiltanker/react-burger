import React from "react";
import {
  Route,
  Switch,
  Router,
  useHistory,
  withRouter,
  useParams,
  useLocation,
} from "react-router-dom";

import appStyles from "./App.module.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Redux

import {
  handleGetUserData,
} from "../../services/actions/auth";

// Компоненты
import Main from "../../pages/Main/Main.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";
import OrderDetails from "../OrderDetails/OrderDetails.js";
import Modal from "../Modal/Modal.js";
import SignIn from "../../pages/SignIn/SignIn.js";
import SignUp from "../../pages/SignUp/SignUp";
import RecoverPassword from "../../pages/RecoverPassword/RecoverPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import Orders from "../../pages/Orders/Orders";
import Feed from "../../pages/Feed/Feed";
import OrderModal from "../OrderModal/OrderModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedAuthorized from "../ProtectedAuthorized/ProtectedAuthorized";
import { getCookie } from "../../utils/cookie";
import IngridientsIdPage from "../../pages/IngridientsIdPage/IngridientsIdPage";
// Компоненты

function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const { id } = useParams();

  const { burgerIngridientsArr } = useSelector(
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
    const accessToken = getCookie('accessToken');
    accessToken && dispatch(handleGetUserData());
  }, [dispatch]);

  React.useEffect(() => {
    const handleEscClose = (e) => {
      if (e.keyCode === 27) {
        handleCloseModal(e);
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  // Indgridients Modal
  function handleOpenIngridientsModal(item) {
    setIsIngridientModalOpen(true);
    setIngridientInfo(item);
  }
  // Indgridients Modal

  function handleCloseModal(e) {
    e.stopPropagation();
    history.push("/");
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
  let background =
    history.action === "PUSH" && location.state && location.state.background;

  const OrderDetailsModal = <OrderDetails />;

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact>
          <Main
            handleOpenIngridientsModal={handleOpenIngridientsModal}
            handleOpenOrderDetailsModal={handleOpenOrderDetailsModal}
            isSauce={isSauce}
            isMain={isMain}
          />
        </Route>
        <Route path="/ingridients/:id" exact>
          <IngridientsIdPage />
        </Route>
        <ProtectedAuthorized path="/login">
          <SignIn />
        </ProtectedAuthorized>
        <ProtectedAuthorized path="/register">
          <SignUp />
        </ProtectedAuthorized>
        <ProtectedAuthorized path="/forgot-password">
          <RecoverPassword />
        </ProtectedAuthorized>
        <ProtectedAuthorized path="/reset-password">
          <ResetPassword />
        </ProtectedAuthorized>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <Orders handleOpenOrderModal={handleOpenOrderModal} />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderModal />
        </ProtectedRoute>
        <Route path="/feed" exact>
          <Feed />
        </Route>
      </Switch>
      {background && (
        <Route
          path="/ingridients/:id"
          children={
            <Modal
              isOpen={isIngridientModalOpen}
              handleCloseModal={handleCloseModal}
            >
              <IngredientDetails ingridientInfo={ingridientInfo} />
            </Modal>
          }
        />
      )}
      <Modal
        children={OrderDetailsModal}
        isOpen={isOrderDetailsOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default App;
