import React from "react";

import { useHistory, useRouteMatch, useLocation } from "react-router";

// Стили
import ordersStyles from "./Orders.module.css";
// Стили

// Компоненты
import AppHeader from "../AppHeader/AppHeader";
import RouteBox from "../RouteBox/RouteBox";
import OrderCard from "../OrderCard/OrderCard";
// Компоненты

import ordersTestData from "../../constants/orders.json";

function Orders(props) {

  const {path} = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const handleOpenModal = (order) => {
    props.handleOpenOrderModal();
    history.push( {pathname: `${path}/${order.code}`,
    state: { background: location }})
  }

  return (
    <>
      <AppHeader />
      <section className={ordersStyles.orders}>
          <RouteBox />
          <div className={ordersStyles.container}>
            {ordersTestData.map((order) => {
              return (
                <OrderCard handleOpenOrderModal={() => {
                  handleOpenModal(order)
                }} order={order} />
              )
            })}
          </div>
      </section>
    </>
  );
}

export default Orders;
