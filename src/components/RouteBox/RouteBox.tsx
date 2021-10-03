import { Link, useHistory } from "react-router-dom";

import { handleUserLogout } from "../../services/actions/auth";

// Стили
import routesStyles from "./RouteBox.module.css";
// Стили

// Types
import { useDispatch as dispatchHook } from "react-redux";
import { AppThunk, AppDispatch } from "../../types/index";
// Types

function RouteBox() {
  // Хук не даст отправить экшен, который ему не знаком
  const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

  const history = useHistory();

  const dispatch = useDispatch();

  const isProfileActive =
    history.location.pathname === "/profile" ? true : false;

  const isOrdersActive =
    history.location.pathname === "/profile/orders" ? true : false;

  const handleLogout = (e: any) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) dispatch(handleUserLogout(refreshToken));
    history.push("/login");
  };

  return (
    <div className={routesStyles.route_box}>
      <Link
        to="/profile"
        className={`${routesStyles.link} mb-9 ${
          isProfileActive ? routesStyles.link_active : routesStyles.link
        }`}
      >
        Профиль
      </Link>
      <Link
        to="/profile/orders"
        className={`${routesStyles.link} mb-9 ${
          isOrdersActive ? routesStyles.link_active : routesStyles.link
        }`}
      >
        История заказов
      </Link>
      <Link
        className={`${routesStyles.link} mb-20`}
        to="#"
        onClick={(e) => {
          handleLogout(e);
        }}
      >
        Выход
      </Link>
      <p className={routesStyles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default RouteBox;
