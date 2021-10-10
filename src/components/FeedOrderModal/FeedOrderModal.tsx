import React, { FunctionComponent } from "react";

// Стили
import modalStyles from "./FeedOrderModal.module.css";
// Стили

import { getIngridients } from "../../services/actions/burgerIngridients";

// Redux
import { useSelector } from "react-redux";
// Redux

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Types
import { TFeedOrder } from "../../types/feed";
import { TCounter } from "../../types";

import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { RootState } from "../../types/index";
import { TIngridient } from "../../types/burgerIngridients";
// Types

interface IFeedOrderModalProps {
  feedOrderData?: TFeedOrder;
}

type FC<P = IFeedOrderModalProps> = FunctionComponent<P>;

const FeedOrderModal: FC<IFeedOrderModalProps> = (props) => {
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

  const createdTime: any = props.feedOrderData && props.feedOrderData.createdAt;

  const time = createdTime && createdTime.match(/\d\d:\d\d/gm)[0];

  const day =
    createdTime && +createdTime.match(/\d\dT/gm)[0].match(/\d\d/gm)[0];

  React.useEffect(() => {
    let totalPriceArr: Array<TIngridient> = [];
    props.feedOrderData &&
      props.feedOrderData.ingredients.map((id) => {
        return burgerIngridientsArr.forEach((item) => {
          if (item._id === id) {
            totalPriceArr.push(item);
          }
        });
      });

    const totalPrice: number = totalPriceArr.reduce((prev, cur) => {
      return cur.price + prev;
    }, 0);

    setTotalPrice(totalPrice);
  }, [burgerIngridientsArr, props.feedOrderData]);

  React.useEffect(() => {
    const uniqueArray =
      props.feedOrderData &&
      props.feedOrderData.ingredients.filter(function (item, pos) {
        return props.feedOrderData?.ingredients.indexOf(item) === pos;
      });

    setFilteredIngridients(uniqueArray);
  }, [props.feedOrderData]);

  const counters = React.useMemo(() => {
    const counter: TCounter = {};
    props.feedOrderData &&
      props.feedOrderData.ingredients.forEach((id) => {
        if (!counter[id]) counter[id] = 0;
        counter[id]++;
      });
    return counter;
  }, [props.feedOrderData]);

  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.info}>
        <p className={`text text_type_digits-default ${modalStyles.number}`}>
          #{props.feedOrderData && props.feedOrderData.number}
        </p>
        <p className={`text text_type_main-medium ${modalStyles.name}`}>
          {props.feedOrderData && props.feedOrderData.name}
        </p>
        <p className={`text text_type_main-small ${modalStyles.status}`}>
          {props.feedOrderData && props.feedOrderData.status
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
                    src={ingridient.image}
                    alt={ingridient.name}
                  />
                  <p className={`text ${modalStyles.ing_name}`}>
                    {ingridient.name}
                  </p>
                  <div className={modalStyles.price_box}>
                    <p className={modalStyles.price}>
                      {counters[ingId] > 1 ? counters[ingId] + ` x ` : ""}
                      {ingridient.price}
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

export default FeedOrderModal;
