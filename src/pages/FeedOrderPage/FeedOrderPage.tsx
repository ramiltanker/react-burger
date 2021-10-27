import React, { FunctionComponent } from "react";

// Стили
import pageStyles from "./FeedOrderPage.module.css";
// Стили

// Actions
import { wsInit } from "../../services/actions/wsActions";
// Actions

// Utils
import getTimeAndDay from "../../utils/getTimeAndDay";
import { TReturnObj } from "../../utils/getTimeAndDay";
// Utils

// Yandex UI
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// Yandex UI

import { useParams } from "react-router";

// Types
import { TFeedOrder } from "../../types/feed";
import { TIngridient } from "../../types/burgerIngridients";
import { TCounter } from "../../types";

import { useDispatch, useSelector } from "../../types/typedHooks";
// Types

type FC<P = {}> = FunctionComponent<P>;

const FeedOrderPage: FC<{}> = () => {
  const [currentOrder, setCurrentOrder] = React.useState<TFeedOrder>();
  const [totalPrice, setTotalPrice] = React.useState<number>();

  const [filteredIngridients, setFilteredIngridients] =
    React.useState<Array<string>>();

  const dispatch = useDispatch();

  const { id } = useParams<{ id?: string }>();

  React.useEffect(() => {
    dispatch(wsInit());
  }, [dispatch]);

  const { burgerIngridientsArr } = useSelector(
    (state) => state.burgerIngridients
  );

  const { feedData } = useSelector((store) => store.feed);

  const orders = feedData && feedData.orders;

  React.useEffect(() => {
    let order;
    orders &&
      orders.forEach((ord: TFeedOrder) => {
        if (ord._id === id) order = ord;
      });
    setCurrentOrder(order);
  }, [id, orders]);

  const returnObj: TReturnObj | undefined =
    currentOrder && getTimeAndDay(currentOrder);
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
      (prev: number, cur: TIngridient): number => {
        return cur.price! + prev;
      },
      0
    );

    setTotalPrice(totalPrice);
  }, [burgerIngridientsArr, currentOrder]);

  React.useEffect(() => {
    const uniqueArray: Array<string> | undefined =
      currentOrder &&
      currentOrder.ingredients.filter(function (item: string, pos: number) {
        return currentOrder.ingredients.indexOf(item) === pos;
      });

    setFilteredIngridients(uniqueArray);
  }, [currentOrder]);

  const counters = React.useMemo(() => {
    const counter: TCounter = {};
    currentOrder &&
      currentOrder.ingredients.forEach((id: string) => {
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
                let ingridient: TIngridient = {};

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
              {returnObj?.todayDay === returnObj?.day
                ? `Сегодня, `
                : returnObj!.todayDay - returnObj!.day === 1
                ? `${returnObj!.todayDay - returnObj!.day} день назад, `
                : `${returnObj!.todayDay - returnObj!.day} дня назад, `}
              {returnObj?.time} i-GMT+3
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
};

export default FeedOrderPage;
