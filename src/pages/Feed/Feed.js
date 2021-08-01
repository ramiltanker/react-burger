import React, { useState } from "react";

// Стили
import feedStyles from "./Feed.module.css";
// Стили

// Redux
import { useSelector, useDispatch } from "react-redux";
// Redux

import { wsInit } from "../../services/actions/wsActions";

import { getIngridients } from "../../services/actions/burgerIngridients";

// Компоненты
import AppHeader from "../../components/AppHeader/AppHeader";
import FeedCard from "../../components/FeedCard/FeedCard";
// Компоненты

function Feed(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(wsInit());
    dispatch(getIngridients());
  }, [dispatch]);

  const feedData = useSelector((store) => store.feed.feedData);

  const burgerIngridientsArr = useSelector(
    (store) => store.burgerIngridients.burgerIngridientsArr
  );

  const orders = feedData && feedData.orders;

  const doneOrders =
    orders &&
    orders
      .filter((order) => {
        return order.status === "done";
      })
      .slice(0, 20);

  const inProcessOrders =
    orders &&
    orders
      .filter((order) => {
        return order.status === "pending";
      })
      .slice(0, 20);

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

  const openFeedModalHandler = (orderData) => {
    props.handleOpenFeedModal(orderData);
  }


  return (
    <>
      <AppHeader />
      <section className={feedStyles.feed}>
        <div className={feedStyles.container}>
          <h2 className={feedStyles.title}>Лента заказов</h2>
          <div className={feedStyles.box}>
            <div className={`${feedStyles.orders} mr-15`}>
              {orders &&
                orders.map((item) => {
                  const createdTime = item.createdAt;

                  const time = createdTime.match(/\d\d:\d\d/gm)[0];

                  const day = +createdTime
                    .match(/\d\dT/gm)[0]
                    .match(/\d\d/gm)[0];

                  const images = handleGetIngImage(item.ingredients);
                  const price = handleGetOrderPrice(item.ingredients);


                  return (
                    <FeedCard
                      order={item}
                      day={day}
                      time={time}
                      key={item._id}
                      images={images}
                      price={price}
                      handleOpenFeedModal={(e) => {openFeedModalHandler(item)}}
                    />
                  );
                })}
            </div>
            <div className={feedStyles.statistic}>
              <div className={`${feedStyles.processes} mb-15`}>
                <div className={`${feedStyles.done} mr-9`}>
                  <p
                    className={`${feedStyles.title} mb-6 text text_type_main-default`}
                  >
                    Готовы:
                  </p>
                  <ul className={feedStyles.done_list}>
                    {doneOrders &&
                      doneOrders.map((order) => {
                        return (
                          <li
                            className={`${feedStyles.done_li} mb-2 text text_type_digits-default`}
                            key={order._id}
                          >
                            {order.number}
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className={feedStyles.in_work}>
                  <p
                    className={`${feedStyles.title} mb-6 text text_type_main-default`}
                  >
                    В работе:
                  </p>
                  <ul className={feedStyles.in_work_list}>
                    {inProcessOrders &&
                      inProcessOrders.map((order) => {
                        return (
                          <li
                            className={`${feedStyles.in_work_li} mb-2 text text_type_digits-default`}
                            key={order._id}
                          >
                            {order.number}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className={`${feedStyles.done_all_time} mb-16`}>
                <p
                  className={`${feedStyles.title} text text_type_main-default`}
                >
                  Выполнено за все время:
                </p>
                <p
                  className={`${feedStyles.number} text text_type_digits-large`}
                >
                  {feedData && feedData.total}
                </p>
              </div>
              <div className={feedStyles.done_today}>
                <p
                  className={`${feedStyles.title} text text_type_main-default`}
                >
                  Выполнено за сегодня:
                </p>
                <p
                  className={`${feedStyles.number} text text_type_digits-large`}
                >
                  {feedData && feedData.totalToday}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Feed;
