import React from "react";

import { Link, useHistory, useLocation } from "react-router-dom";

import { handleUserLogout } from "../../services/actions/auth";

// redux
import { useDispatch, useSelector } from "react-redux";
// redux
// Стили
import routesStyles from "./RouteBox.module.css";
// Стили

function RouteBox() {
  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  const isProfileActive =
    history.location.pathname === "/profile" ? true : false;

  const isOrdersActive =
    history.location.pathname === "/profile/orders" ? true : false;

  const handleLogout = (e) => {
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
