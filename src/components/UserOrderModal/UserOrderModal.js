import React from "react";

// Стили
import modalStyles from "./UserOrderModal.module.css";
// Стили

// Redux
import { useSelector } from "react-redux";
// Redux

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function UserOrderModal(props) {
  const [totalPrice, setTotalPrice] = React.useState();

  const [filteredIngridients, setFilteredIngridients] = React.useState();

  const burgerIngridientsArr = useSelector(
    (store) => store.burgerIngridients.burgerIngridientsArr
  );

  const date = new Date();
  const todayDay = date.getDate();

  const createdTime = props.userOrderData && props.userOrderData.createdAt;

  const time = createdTime && createdTime.match(/\d\d:\d\d/gm)[0];

  const day =
    createdTime && +createdTime.match(/\d\dT/gm)[0].match(/\d\d/gm)[0];

  React.useEffect(() => {
    let totalPriceArr = [];
    props.userOrderData &&
      props.userOrderData.ingredients.map((id) => {
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
  }, [burgerIngridientsArr, props.userOrderData]);

  React.useEffect(() => {
    const uniqueArray =
      props.userOrderData &&
      props.userOrderData.ingredients.filter(function (item, pos) {
        return props.userOrderData.ingredients.indexOf(item) === pos;
      });

    setFilteredIngridients(uniqueArray);
  }, [props.userOrderData]);

  const counters = React.useMemo(() => {
    const counter = {};
    props.userOrderData &&
      props.userOrderData.ingredients.forEach((id) => {
        if (!counter[id]) counter[id] = 0;
        counter[id]++;
      });
    return counter;
  }, [props.userOrderData]);

  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.info}>
        <p className={`text text_type_digits-default ${modalStyles.number}`}>
          #{props.userOrderData && props.userOrderData.number}
        </p>
        <p className={`text text_type_main-medium ${modalStyles.name}`}>
          {props.userOrderData && props.userOrderData.name}
        </p>
        <p className={`text text_type_main-small ${modalStyles.status}`}>
          {props.userOrderData && props.userOrderData.status
            ? "Выполнен"
            : "В процессе"}
        </p>
      </div>
      <div className={modalStyles.structure}>
        <h2 className={modalStyles.title}>Состав:</h2>
        <ul className={modalStyles.list}>
          {filteredIngridients &&
            filteredIngridients.map((ingId) => {
              let ingridient;

              burgerIngridientsArr.forEach((item) => {
                if (item._id === ingId) {
                  ingridient = item;
                }
              });

              return (
                <li className={modalStyles.li} key={ingId}>
                  <img
                    className={modalStyles.image}
                    src={ingridient && ingridient.image}
                    alt={ingridient && ingridient.name}
                  />
                  <p className={`text ${modalStyles.ing_name}`}>
                    {ingridient && ingridient.name}
                  </p>
                  <div className={modalStyles.price_box}>
                    <p className={modalStyles.price}>
                      {counters[ingId] > 1 ? counters[ingId] + ` x ` : ""}
                      {ingridient && ingridient.price}
                    </p>
                    <CurrencyIcon />
                  </div>
                </li>
              );
            })}
        </ul>
        <div className={modalStyles.box}>
          <p
            className={`text text_type_main-default text_color_inactive ${modalStyles.time}`}
          >
            {todayDay === day
              ? `Сегодня, `
              : todayDay - day === 1
              ? `${todayDay - day} день назад, `
              : `${todayDay - day} дня назад, `}
            {time} i-GMT+3
          </p>
          <div className={modalStyles.price_box}>
            <p className={modalStyles.price}>{totalPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOrderModal;
