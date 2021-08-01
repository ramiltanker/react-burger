import React from "react";

import { useHistory, useRouteMatch, useLocation } from "react-router";

// Стили
import ordersStyles from "./Orders.module.css";
// Стили

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
import RouteBox from "../../components/RouteBox/RouteBox";
import OrderCard from "../../components/OrderCard/OrderCard";
// Компоненты

// Redux
import { useDispatch, useSelector } from "react-redux";
// Redux

// Actions
import { wsAuthInit } from "../../services/actions/wsActions";
import { getIngridients } from "../../services/actions/burgerIngridients";
// Actions

import ordersTestData from "../../constants/orders.json";

function Orders(props) {
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(wsAuthInit());
    dispatch(getIngridients());
  }, [dispatch]);

  const ordersData = useSelector((store) => store.userOrders.ordersData);
  const burgerIngridientsArr = useSelector(
    (store) => store.burgerIngridients.burgerIngridientsArr
  );

  const orders = ordersData && ordersData.orders;

  const handleGetIngImage = (ingridientsIds) => {
    let imagesArr = [];
    ingridientsIds.map((id) => {
      return burgerIngridientsArr.forEach((item) => {
        if (item._id === id) {
          imagesArr.push(item.image);
        }
      });
    });
    return imagesArr;
  };

  const handleGetOrderPrice = (ingridientsIds) => {
    let totalPriceArr = [];
    ingridientsIds.map((id) => {
      return burgerIngridientsArr.forEach((item) => {
        if (item._id === id) {
          totalPriceArr.push(item);
        }
      });
    });

    const totalPrice = totalPriceArr.reduce((prev, cur) => {
      return cur.price + prev;
    }, 0);

    return totalPrice;
  };

  return (
    <>
      <AppHeader />
      <section className={ordersStyles.orders}>
        <RouteBox />
        <div className={ordersStyles.container}>
          {orders &&
            orders.map((order) => {
              const imagesArr = handleGetIngImage(order.ingredients);
              const totalPrice = handleGetOrderPrice(order.ingredients);

              const createdTime = order.createdAt;

              const time = createdTime.match(/\d\d:\d\d/gm)[0];

              const day = +createdTime.match(/\d\dT/gm)[0].match(/\d\d/gm)[0];

              return (
                <OrderCard
                  handleOpenOrderModal={() => {
                    props.handleOpenOrderModal(order);
                  }}
                  imagesArr={imagesArr}
                  totalPrice={totalPrice}
                  time={time}
                  day={day}
                  order={order}
                  key={order._id}
                />
              );
            })}
        </div>
      </section>
    </>
  );
}

export default Orders;
