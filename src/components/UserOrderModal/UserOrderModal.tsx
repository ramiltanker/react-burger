import React, { FunctionComponent } from "react";

// Стили
import modalStyles from "./UserOrderModal.module.css";
// Стили

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Types
import { TUserOrder } from "../../types/userOrders";
import { TIngridient } from "../../types/burgerIngridients";
import { TCounter } from "../../types";

import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { RootState } from "../../types/index";
// Types

interface IUserOrderModalProps {
  userOrderData?: TUserOrder;
}

type FC<P = IUserOrderModalProps> = FunctionComponent<P>;

const UserOrderModal: FC<IUserOrderModalProps> = (props) => {
  // Теперь этот хук «знает» структуру хранилища
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

  const [totalPrice, setTotalPrice] = React.useState<number>();

  const [filteredIngridients, setFilteredIngridients] =
    React.useState<Array<string>>();

  const burgerIngridientsArr = useSelector(
    (store) => store.burgerIngridients.burgerIngridientsArr
  );

  const date = new Date();
  const todayDay = date.getDate();

  const createdTime: any = props.userOrderData && props.userOrderData.createdAt;

  const time = createdTime && createdTime.match(/\d\d:\d\d/gm)[0];

  const day =
    createdTime && +createdTime.match(/\d\dT/gm)[0].match(/\d\d/gm)[0];

  React.useEffect(() => {
    let totalPriceArr: Array<TIngridient> = [];
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
        return props.userOrderData!.ingredients.indexOf(item) === pos;
      });

    setFilteredIngridients(uniqueArray);
  }, [props.userOrderData]);

  const counters = React.useMemo(() => {
    const counter: TCounter = {};
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
              let ingridient: any;

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
                    <CurrencyIcon type={"secondary"} />
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
            <CurrencyIcon type={"secondary"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderModal;
