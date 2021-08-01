import React from "react";

// Стили
import pageStyles from "./FeedOrderPage.module.css";
// Стили

// Actions
import { wsInit } from "../../services/actions/wsActions";
import { getIngridients } from "../../services/actions/burgerIngridients";
// Actions

// Yandex UI
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// Yandex UI

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
// Компоненты

import { useParams } from "react-router";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Redux

function FeedOrderPage() {
  const [currentOrder, setCurrentOrder] = React.useState();
  const [totalPrice, setTotalPrice] = React.useState();

  const [filteredIngridients, setFilteredIngridients] = React.useState();

  const dispatch = useDispatch();

  const { id } = useParams();

  React.useEffect(() => {
    dispatch(wsInit());
    dispatch(getIngridients());
  }, [dispatch]);

  const { burgerIngridientsArr } = useSelector(
    (state) => state.burgerIngridients
  );

  const feedData = useSelector((store) => store.feed.feedData);

  const orders = feedData && feedData.orders;

  React.useEffect(() => {
    let order;
    orders &&
      orders.forEach((ord) => {
        if (ord._id === id) order = ord;
      });
    setCurrentOrder(order);
  }, [id, orders]);

  const date = new Date();

  const todayDay = date.getDate();

  const createdTime = currentOrder && currentOrder.createdAt;

  const time = createdTime && createdTime.match(/\d\d:\d\d/gm)[0];

  const day =
    createdTime && +createdTime.match(/\d\dT/gm)[0].match(/\d\d/gm)[0];

  React.useEffect(() => {
    let totalPriceArr = [];
    currentOrder &&
      currentOrder.ingredients.map((id) => {
        return burgerIngridientsArr.forEach((item) => {
          if (item._id === id) {
            totalPriceArr.push(item);
          }
        });
      });

    const totalPrice = totalPriceArr.reduce((prev, cur) => {
      return cur.price + prev;
    }, 0);

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
    const counter = {};
    currentOrder &&
      currentOrder.ingredients.forEach((id) => {
        if (!counter[id]) counter[id] = 0;
        counter[id]++;
      });
    return counter;
  }, [currentOrder]);

  return (
    <>
      <AppHeader />
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
              filteredIngridients.map((ingId) => {
                let ingridient;

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
                      <CurrencyIcon />
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
              <CurrencyIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedOrderPage;
