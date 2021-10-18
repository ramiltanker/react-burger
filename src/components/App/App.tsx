import React, { FunctionComponent, KeyboardEvent, MouseEvent } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
// Redux

import { handleGetUserData } from "../../services/actions/auth";

// Компоненты
import AppHeader from "../AppHeader/AppHeader";
import Main from "../../pages/Main/Main";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import SignIn from "../../pages/SignIn/SignIn";
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

// Types
import { TLocation } from "../../types";
import { TIngridient } from "../../types/burgerIngridients";
import { TUserOrder } from "../../types/userOrders";
import { TFeedOrder } from "../../types/feed";
import { getIngridients } from "../../services/actions/burgerIngridients";
// Types

type FC<P = {}> = FunctionComponent<P>;

const App: FC<{}> = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation<TLocation>();

  const [isSauce, setIsSauce] = React.useState<boolean>(false);
  const [isMain, setIsMain] = React.useState<boolean>(false);

  // Переменные состояния для Ingridients modal
  const [isIngridientModalOpen, setIsIngridientModalOpen] =
    React.useState<boolean>(false);
  const [ingridientInfo, setIngridientInfo] = React.useState<TIngridient>();
  // Переменные состояния для Ingridients modal

  // Переменные состояния для Order modal
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] =
    React.useState<boolean>(false);
  const [userOrderData, setUserrderData] = React.useState<
    TUserOrder | undefined
  >();
  // Переменные состояния для Order modal

  //  Переменные состояния для OrderModal
  const [isProfileOrderModalOpen, setIsProfileOrderModalOpen] =
    React.useState(false);
  //  Переменные состояния для OrderModal

  // Переменные состояния для FeedOrderModalOpen
  const [isFeedOrderModalOpen, setIsFeedOrderModalOpen] = React.useState(false);
  const [feedOrderData, setFeedOrderData] = React.useState<
    TFeedOrder | undefined
  >();
  // Переменные состояния для FeedOrderModalOpen

  React.useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  React.useEffect(() => {
    const accessToken = getCookie("accessToken");
    accessToken && dispatch(handleGetUserData());
  }, [dispatch]);

  React.useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      handleEscClose(e);
    });

    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        handleEscClose(e);
      });
    };
  }, []);

  // Indgridients Modal
  function handleOpenIngridientsModal(item: TIngridient): void {
    setIsIngridientModalOpen(true);
    setIngridientInfo(item);
  }
  // Indgridients Modal

  function handleCloseModal() {
    history.push("/");
    setIsIngridientModalOpen(false);
    setIsOrderDetailsOpen(false);
  }

  //  OrderDetaulsModal
  function handleOpenOrderDetailsModal(): void {
    setIsOrderDetailsOpen(true);
  }
  //  OrderDetaulsModal

  // OrderModal
  function handleOpenOrderModal(data: TUserOrder) {
    setIsProfileOrderModalOpen(true);
    setUserrderData(data);
  }

  function handleCloseOrderModal() {
    history.push("/profile/orders");
    setIsProfileOrderModalOpen(false);
    setUserrderData(undefined);
  }
  // OrderModal

  // FeedOrderModalOpen
  function handleOpenFeedModal(data: TFeedOrder) {
    setIsFeedOrderModalOpen(true);
    setFeedOrderData(data);
  }

  function handleCloseFeedModal() {
    history.push("/feed");
    setIsFeedOrderModalOpen(false);
    setFeedOrderData(undefined);
  }
  // FeedOrderModalOpen
  const background =
    history.action === "PUSH" && location.state && location.state.background;

  const OrderDetailsModal = <OrderDetails />;

  return (
    <>
      <AppHeader />
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
        <Route path="/feed/:id">
          <Modal
            isOpen={isFeedOrderModalOpen}
            handleCloseModal={handleCloseFeedModal}
          >
            <FeedOrderModal feedOrderData={feedOrderData} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
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
};

export default App;
