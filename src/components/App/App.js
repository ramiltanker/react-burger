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

import { handleGetUserData } from "../../services/actions/auth";

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

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedAuthorized from "../ProtectedAuthorized/ProtectedAuthorized";
import { getCookie } from "../../utils/cookie";
import IngridientsIdPage from "../../pages/IngridientsIdPage/IngridientsIdPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import FeedOrderModal from "../FeedOrderModal/FeedOrderModal";
import UserOrderModal from "../UserOrderModal/UserOrderModal";
import FeedOrderPage from "../../pages/FeedOrderPage/FeedOrderPage";
import UserOrderPage from "../../pages/UserOrderPage/UserOrderPage";
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
  const [userOrderData, setUserrderData] = React.useState();
  // Переменные состояния для Order modal

  //  Переменные состояния для OrderModal
  const [isProfileOrderModalOpen, setIsProfileOrderModalOpen] =
    React.useState(false);
  //  Переменные состояния для OrderModal

  // Переменные состояния для FeedOrderModalOpen
  const [isFeedOrderModalOpen, setIsFeedOrderModalOpen] = React.useState(false);
  const [feedOrderData, setFeedOrderData] = React.useState();
  // Переменные состояния для FeedOrderModalOpen

  React.useEffect(() => {
    const accessToken = getCookie("accessToken");
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
  }

  //  OrderDetaulsModal
  function handleOpenOrderDetailsModal() {
    setIsOrderDetailsOpen(true);
  }
  //  OrderDetaulsModal

  // OrderModal
  function handleOpenOrderModal(data) {
    setIsProfileOrderModalOpen(true);
    setUserrderData(data);
  }

  function handleCloseOrderModal(e) {
    e.stopPropagation();
    history.push("/profile/orders");
    setIsProfileOrderModalOpen(false);
    setUserrderData(null);
  }
  // OrderModal

  // FeedOrderModalOpen
  function handleOpenFeedModal(data) {
    setIsFeedOrderModalOpen(true);
    setFeedOrderData(data);
  }

  function handleCloseFeedModal(e) {
    e.stopPropagation();
    history.push("/feed");
    setIsFeedOrderModalOpen(false);
    setFeedOrderData(null);
  }
  // FeedOrderModalOpen
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
        <ProtectedRoute path="/profile/orders/:id" exact>
          <UserOrderPage />
        </ProtectedRoute>
        <Route path="/feed" exact>
          <Feed handleOpenFeedModal={handleOpenFeedModal} />
        </Route>
        <Route path="/feed/:id" exact>
          <FeedOrderPage />
        </Route>
        <Route>
          <NotFoundPage />
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
      {background && (
        <Route pat="/feed/:id">
          <Modal
            isOpen={isFeedOrderModalOpen}
            handleCloseModal={handleCloseFeedModal}
          >
            <FeedOrderModal feedOrderData={feedOrderData} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route pat="/profile/orders/:id">
          <Modal
            isOpen={isProfileOrderModalOpen}
            handleCloseModal={handleCloseOrderModal}
          >
            <UserOrderModal userOrderData={userOrderData} />
          </Modal>
        </Route>
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
