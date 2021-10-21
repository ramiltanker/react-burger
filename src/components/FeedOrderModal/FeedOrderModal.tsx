import React, { FunctionComponent } from "react";

// Стили
import modalStyles from "./FeedOrderModal.module.css";
// Стили

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Utils
import getTimeAndDay from "../../utils/getTimeAndDay";
import { TReturnObj } from "../../utils/getTimeAndDay";
// Utils

// Types
import { TFeedOrder } from "../../types/feed";
import { TCounter } from "../../types";

import { useSelector } from "../../types/typedHooks";
import { TIngridient } from "../../types/burgerIngridients";
// Types

interface IFeedOrderModalProps {
  feedOrderData?: TFeedOrder;
}

type FC<P = IFeedOrderModalProps> = FunctionComponent<P>;

const FeedOrderModal: FC<IFeedOrderModalProps> = (props) => {
  const [totalPrice, setTotalPrice] = React.useState<number>();

  const [ingridient, setIngridient] = React.useState<TIngridient>();

  const [filteredIngridients, setFilteredIngridients] =
    React.useState<Array<string>>();

  const burgerIngridientsArr = useSelector(
    (store) => store.burgerIngridients.burgerIngridientsArr
  );

  const returnObj: TReturnObj | undefined =
    props.feedOrderData && getTimeAndDay(props.feedOrderData);

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

    const totalPrice: number = totalPriceArr.reduce((prev, cur): number => {
      return cur.price! + prev;
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
              let ingredient: TIngridient = {};
              burgerIngridientsArr.forEach((item) => {
                if (item._id === ingId) {
                  ingredient = item;
                }
              });
              return (
                <li className={modalStyles.li} key={ingId}>
                  <img
                    className={modalStyles.image}
                    src={ingredient && ingredient.image}
                    alt={ingredient && ingredient.name}
                  />
                  <p className={`text ${modalStyles.ing_name}`}>
                    {ingredient && ingredient.name}
                  </p>
                  <div className={modalStyles.price_box}>
                    <p className={modalStyles.price}>
                      {counters[ingId] > 1 ? counters[ingId] + ` x ` : ""}
                      {ingredient && ingredient.price}
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
            {returnObj!.todayDay === Number(returnObj!.day)
              ? `Сегодня, `
              : returnObj!.todayDay - Number(returnObj!.day) === 1
              ? `${returnObj!.todayDay - Number(returnObj!.day)} день назад, `
              : `${returnObj!.todayDay - Number(returnObj!.day)} дня назад, `}
            {returnObj!.time} i-GMT+3
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
