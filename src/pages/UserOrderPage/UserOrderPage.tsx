import React from "react";

// Стили
import pageStyles from "./UserOrderPage.module.css";
// Стили

// Actions
import { wsAuthInit } from "../../services/actions/wsActions";
// Actions

// Yandex UI
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// Yandex UI

import { useParams } from "react-router-dom";

// Types
import { TUserOrder } from "../../types/userOrders";
import { TIngridient } from "../../types/burgerIngridients";
import { TCounter } from "../../types";

import { useDispatch, useSelector } from "../../types/typedHooks";
// Types

function UserOrderPage() {
  const [currentOrder, setCurrentOrder] = React.useState<TUserOrder>();
  const [totalPrice, setTotalPrice] = React.useState<number>();

  const [filteredIngridients, setFilteredIngridients] =
    React.useState<Array<string>>();

  const dispatch = useDispatch();

  const { id } = useParams<{ id?: string }>();

  React.useEffect(() => {
    dispatch(wsAuthInit());
  }, [dispatch]);

  const { burgerIngridientsArr } = useSelector(
    (state) => state.burgerIngridients
  );

  const ordersData = useSelector((store) => store.userOrders.ordersData);

  const orders = ordersData && ordersData.orders;

  React.useEffect(() => {
    let order;
    orders &&
      orders.forEach((ord: TUserOrder) => {
        if (ord._id === id) order = ord;
      });
    setCurrentOrder(order);
  }, [id, orders]);

  const date = new Date();

  const todayDay = date.getDate();

  const createdTime: any = currentOrder && currentOrder.createdAt;

  const time = createdTime && createdTime.match(/\d\d:\d\d/gm)[0];

  const day =
    createdTime && +createdTime.match(/\d\dT/gm)[0].match(/\d\d/gm)[0];

  React.useEffect(() => {
    let totalPriceArr: Array<TIngridient> = [];
    currentOrder &&
      currentOrder.ingredients.map((id) => {
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

    setTotalPrice(totalPrice);
  }, [burgerIngridientsArr, currentOrder]);

  React.useEffect(() => {
    const uniqueArray =
      currentOrder &&
      currentOrder.ingredients.filter(function (item, pos) {
        return currentOrder.ingredients.indexOf(item) === pos;
      });
    setFilteredIngridients(uniqueArray);
  }, [currentOrder]);

  const counters = React.useMemo(() => {
    const counter: TCounter = {};
    currentOrder &&
      currentOrder.ingredients.forEach((id) => {
        if (!counter[id]) counter[id] = 0;
        counter[id]++;
      });
    return counter;
  }, [currentOrder]);

  return (
    <>
      <div className={pageStyles.container}>
        <div className={pageStyles.info}>
          <p className={`text text_type_digits-default ${pageStyles.number}`}>
            #{currentOrder && currentOrder.number}
          </p>
          <p className={`text text_type_main-medium ${pageStyles.name}`}>
            {currentOrder && currentOrder.name}
          </p>
          <p className={`text text_type_main-small ${pageStyles.status}`}>
            {currentOrder && currentOrder.status ? "Выполнен" : "В процессе"}
          </p>
        </div>
        <div className={pageStyles.structure}>
          <h2 className={pageStyles.title}>Состав:</h2>
          <ul className={pageStyles.list}>
            {filteredIngridients &&
              filteredIngridients.map((ingId: string) => {
                let ingridient: any;

                burgerIngridientsArr.forEach((item) => {
                  if (item._id === ingId) {
                    ingridient = item;
                  }
                });

                return (
                  <li className={pageStyles.li} key={ingId}>
                    <img
                      className={pageStyles.image}
                      src={ingridient && ingridient.image}
                      alt={ingridient && ingridient.name}
                    />
                    <p className={`text ${pageStyles.ing_name}`}>
                      {ingridient && ingridient.name}
                    </p>
                    <div className={pageStyles.price_box}>
                      <p className={pageStyles.price}>
                        {counters[ingId] > 1 ? counters[ingId] + ` x ` : ""}
                        {ingridient.price}
                      </p>
                      <CurrencyIcon type={"secondary"} />
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className={pageStyles.box}>
            <p
              className={`text text_type_main-default text_color_inactive ${pageStyles.time}`}
            >
              {todayDay === day
                ? `Сегодня, `
                : todayDay - day === 1
                ? `${todayDay - day} день назад, `
                : `${todayDay - day} дня назад, `}
              {time} i-GMT+3
            </p>
            <div className={pageStyles.price_box}>
              <p className={pageStyles.price}>{totalPrice}</p>
              <CurrencyIcon type={"secondary"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOrderPage;
