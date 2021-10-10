import React, { FunctionComponent } from "react";

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

// Types
import { TUserOrder } from "../../types/userOrders";
import { TPriceArr } from "../../types";
import { TIngridient } from "../../types/burgerIngridients";

import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { RootState, AppThunk, AppDispatch } from "../../types/index";
// Types

interface IOrdersProps {
  handleOpenOrderModal: (data: TUserOrder) => void;
}

type FC<P = IOrdersProps> = FunctionComponent<P>;

const Orders: FC<IOrdersProps> = (props) => {
  // Теперь этот хук «знает» структуру хранилища
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  // Хук не даст отправить экшен, который ему не знаком
  const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

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

  const handleGetIngImage = (ingridientsIds: Array<string>) => {
    let imagesArr: Array<string> = [];
    ingridientsIds.map((id: string) => {
      return burgerIngridientsArr.forEach((item) => {
        if (item._id === id) {
          imagesArr.push(item.image);
        }
      });
    });
    return imagesArr;
  };

  const handleGetOrderPrice = (ingridientsIds: Array<string>) => {
    let totalPriceArr: TPriceArr = [];
    ingridientsIds.map((id: string) => {
      return burgerIngridientsArr.forEach((item) => {
        if (item._id === id) {
          totalPriceArr.push(item);
        }
      });
    });

    const totalPrice: number = totalPriceArr.reduce(
      (prev: number, cur: TIngridient) => {
        return cur.price + prev;
      },
      0
    );

    return totalPrice;
  };

  return (
    <>
      <AppHeader />
      <section className={ordersStyles.orders}>
        <RouteBox />
        <div className={ordersStyles.container}>
          {orders &&
            orders.map((order: any) => {
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
};

export default Orders;
